import { injectable, postConstruct } from 'inversify'
import Dexie from 'dexie'
import type { IIndexedDBHandler } from '../interfaces/handlers/indexed-db-handler.interface'
import type { LogRecord } from '../types/types'
import { HandlerType } from '../enums/handler-type.enum'

/**
 * IndexedDBHandler is an implementation of the IIndexedDBHandler interface.
 * It handles log records by storing them in the browser's IndexedDB.
 */
@injectable()
export class IndexedDBHandler implements IIndexedDBHandler {
  private name = HandlerType.INDEXED_DB
  private next: IIndexedDBHandler | null = null
  private databaseName = 'ts-log'
  private tableName = 'logs'
  private maxEntries = 1000
  private db: Dexie | null = null

  /**
   * Create a new IndexedDBHandler instance
   * @param options Options for the handler
   */
  constructor(options: { databaseName?: string; tableName?: string; maxEntries?: number } = {}) {
    if (options.databaseName) {
      this.databaseName = options.databaseName
    }
    if (options.tableName) {
      this.tableName = options.tableName
    }
    if (options.maxEntries) {
      this.maxEntries = options.maxEntries
    }
  }

  /**
   * Initialize the database
   * This method is called automatically after the constructor
   */
  @postConstruct()
  private initDatabase(): void {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return
    }

    try {
      this.db = new Dexie(this.databaseName)
      this.db.version(1).stores({
        [this.tableName]: '++id,level,datetime',
      })
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error)
    }
  }

  /**
   * Handle a log record
   * @param record The log record to handle
   */
  public async handle(record: LogRecord): Promise<void> {
    if (!this.db) {
      console.error('IndexedDB not initialized')
      return
    }

    try {
      // Add the log record to the database
      await this.db.table(this.tableName).add({
        level: record.level,
        levelName: record.levelName,
        message: record.message,
        context: JSON.stringify(record.context),
        datetime: record.datetime.toISOString(),
        stack: record.stack,
      })

      // Trim old entries if necessary
      const count = await this.db.table(this.tableName).count()
      if (count > this.maxEntries) {
        const entriesToDelete = count - this.maxEntries
        const oldestEntries = await this.db
          .table(this.tableName)
          .orderBy('datetime')
          .limit(entriesToDelete)
          .toArray()
        const oldestIds = oldestEntries.map((entry) => entry.id)
        await this.db.table(this.tableName).bulkDelete(oldestIds)
      }
    } catch (error) {
      console.error('Failed to store log in IndexedDB:', error)
    }

    // Pass the record to the next handler in the chain
    if (this.next) {
      this.next.handle(record)
    }
  }

  /**
   * Check if the handler can handle the log record
   * @param record The log record to check
   */
  public isHandling(record: LogRecord): boolean {
    return typeof window !== 'undefined' && !!window.indexedDB && !!this.db
  }

  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  public setNext(handler: IIndexedDBHandler): IIndexedDBHandler {
    this.next = handler
    return handler
  }

  /**
   * Get the next handler in the chain
   */
  public getNext(): IIndexedDBHandler | null {
    return this.next
  }

  /**
   * Get the handler name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Get the database name
   */
  public getDatabaseName(): string {
    return this.databaseName
  }

  /**
   * Set the database name
   * @param name The database name
   */
  public setDatabaseName(name: string): void {
    this.databaseName = name
    this.initDatabase()
  }

  /**
   * Get the table name
   */
  public getTableName(): string {
    return this.tableName
  }

  /**
   * Set the table name
   * @param name The table name
   */
  public setTableName(name: string): void {
    this.tableName = name
    this.initDatabase()
  }

  /**
   * Get the maximum number of log entries to store
   */
  public getMaxEntries(): number {
    return this.maxEntries
  }

  /**
   * Set the maximum number of log entries to store
   * @param maxEntries The maximum number of log entries
   */
  public setMaxEntries(maxEntries: number): void {
    this.maxEntries = maxEntries
  }

  /**
   * Get all stored log entries
   */
  public async getEntries(): Promise<any[]> {
    if (!this.db) {
      return []
    }

    try {
      const entries = await this.db.table(this.tableName).toArray()
      return entries.map((entry) => ({
        ...entry,
        context: JSON.parse(entry.context),
      }))
    } catch (error) {
      console.error('Failed to retrieve logs from IndexedDB:', error)
      return []
    }
  }

  /**
   * Clear all stored log entries
   */
  public async clearEntries(): Promise<void> {
    if (!this.db) {
      return
    }

    try {
      await this.db.table(this.tableName).clear()
    } catch (error) {
      console.error('Failed to clear logs from IndexedDB:', error)
    }
  }
}

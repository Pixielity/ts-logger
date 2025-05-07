import { injectable } from 'inversify'
import type { ILocalStorageHandler } from '../interfaces/handlers/local-storage-handler.interface'
import type { LogRecord } from '../types/types'

/**
 * LocalStorageHandler is an implementation of the ILocalStorageHandler interface.
 * It handles log records by storing them in the browser's localStorage.
 */
@injectable()
export class LocalStorageHandler implements ILocalStorageHandler {
  private name = 'localStorage'
  private next: ILocalStorageHandler | null = null
  private key = 'ts-log'
  private maxEntries = 100

  /**
   * Create a new LocalStorageHandler instance
   * @param options Options for the handler
   */
  constructor(options: { key?: string; maxEntries?: number } = {}) {
    if (options.key) {
      this.key = options.key
    }
    if (options.maxEntries) {
      this.maxEntries = options.maxEntries
    }
  }

  /**
   * Handle a log record
   * @param record The log record to handle
   */
  public handle(record: LogRecord): void {
    try {
      // Get existing entries
      const entries = this.getEntries()

      // Add the new entry
      entries.push({
        level: record.level,
        levelName: record.levelName,
        message: record.message,
        context: record.context,
        datetime: record.datetime.toISOString(),
        stack: record.stack,
      })

      // Trim entries if necessary
      if (entries.length > this.maxEntries) {
        entries.splice(0, entries.length - this.maxEntries)
      }

      // Save entries
      localStorage.setItem(this.key, JSON.stringify(entries))
    } catch (error) {
      console.error('Failed to store log in localStorage:', error)
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
    return typeof localStorage !== 'undefined'
  }

  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  public setNext(handler: ILocalStorageHandler): ILocalStorageHandler {
    this.next = handler
    return handler
  }

  /**
   * Get the next handler in the chain
   */
  public getNext(): ILocalStorageHandler | null {
    return this.next
  }

  /**
   * Get the handler name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Get the localStorage key used to store logs
   */
  public getKey(): string {
    return this.key
  }

  /**
   * Set the localStorage key used to store logs
   * @param key The localStorage key
   */
  public setKey(key: string): void {
    this.key = key
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
  public getEntries(): any[] {
    try {
      const entriesJson = localStorage.getItem(this.key)
      return entriesJson ? JSON.parse(entriesJson) : []
    } catch (error) {
      console.error('Failed to retrieve logs from localStorage:', error)
      return []
    }
  }

  /**
   * Clear all stored log entries
   */
  public clearEntries(): void {
    try {
      localStorage.removeItem(this.key)
    } catch (error) {
      console.error('Failed to clear logs from localStorage:', error)
    }
  }
}

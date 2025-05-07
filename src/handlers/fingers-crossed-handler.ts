import { injectable } from 'inversify'

import { LogLevelValue } from '../constants'
import type { LogLevel } from '../enums/log-level.enum'
import type { LogRecord } from '../types/log-record.type'
import type { ILogHandler } from '../interfaces/handlers/log-handler.interface'
import type { IFingersCrossedHandler } from '../interfaces/handlers/fingers-crossed-handler.interface'

/**
 * FingersCrossedHandler is an implementation of the IFingersCrossedHandler interface.
 * It buffers log records until a certain action level is reached, then passes all buffered records to the next handler.
 */
@injectable()
export class FingersCrossedHandler implements IFingersCrossedHandler {
  private name = 'fingersCrossed'
  private next: ILogHandler | null = null
  private actionLevel: LogLevel
  private bufferSize: number
  private buffer: LogRecord[] = []
  private activated = false
  private handler: ILogHandler

  /**
   * Create a new FingersCrossedHandler instance
   * @param handler The handler to use when activated
   * @param options Options for the handler
   */
  constructor(handler: ILogHandler, options: { actionLevel?: LogLevel; bufferSize?: number } = {}) {
    this.handler = handler
    this.actionLevel = options.actionLevel || ('warning' as LogLevel)
    this.bufferSize = options.bufferSize || 0 // 0 means unlimited
  }

  /**
   * Handle a log record
   * @param record The log record to handle
   */
  public handle(record: LogRecord): void {
    // Check if the handler is already activated
    if (this.activated) {
      // Pass the record directly to the handler
      this.handler.handle(record)
    } else {
      // Check if the record's level is at or above the action level
      if (this.isActionLevel(record.level as LogLevel)) {
        // Activate the handler
        this.activated = true

        // Pass all buffered records to the handler
        for (const bufferedRecord of this.buffer) {
          this.handler.handle(bufferedRecord)
        }

        // Clear the buffer
        this.buffer = []

        // Pass the current record to the handler
        this.handler.handle(record)
      } else {
        // Buffer the record
        this.buffer.push(record)

        // Trim the buffer if necessary
        if (this.bufferSize > 0 && this.buffer.length > this.bufferSize) {
          this.buffer.shift()
        }
      }
    }

    // Pass the record to the next handler in the chain
    if (this.next) {
      this.next.handle(record)
    }
  }

  /**
   * Check if a log level is at or above the action level
   * @param level The log level to check
   */
  private isActionLevel(level: LogLevel): boolean {
    return LogLevelValue[level] >= LogLevelValue[this.actionLevel]
  }

  /**
   * Check if the handler can handle the log record
   * @param record The log record to check
   */
  public isHandling(record: LogRecord): boolean {
    return true
  }

  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  public setNext(handler: ILogHandler): ILogHandler {
    this.next = handler
    return handler
  }

  /**
   * Get the next handler in the chain
   */
  public getNext(): ILogHandler | null {
    return this.next
  }

  /**
   * Get the handler name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Get the action level
   */
  public getActionLevel(): LogLevel {
    return this.actionLevel
  }

  /**
   * Set the action level
   * @param level The action level
   */
  public setActionLevel(level: LogLevel): void {
    this.actionLevel = level
  }

  /**
   * Get the buffer size
   */
  public getBufferSize(): number {
    return this.bufferSize
  }

  /**
   * Set the buffer size
   * @param size The buffer size
   */
  public setBufferSize(size: number): void {
    this.bufferSize = size
  }

  /**
   * Get whether the handler is activated
   */
  public isActivated(): boolean {
    return this.activated
  }

  /**
   * Reset the handler
   */
  public reset(): void {
    this.activated = false
    this.buffer = []
  }
}

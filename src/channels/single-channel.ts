import { injectable } from 'inversify'
import type { LogLevel } from '../enums/log-level.enum'
import type { ISingleChannel } from '../interfaces/channels/single-channel.interface'
import type { ILogHandler } from '../interfaces/handlers/log-handler.interface'
import type { ILogFormatter } from '../interfaces/formatters/log-formatter.interface'
import type { ILogProcessor } from '../interfaces/processors/log-processor.interface'
import type { LogContext, LogRecord } from '../types/types'

/**
 * SingleChannel is an implementation of the ISingleChannel interface.
 * It uses a single handler to process log messages.
 */
@injectable()
export class SingleChannel implements ISingleChannel {
  private name: string
  private handler: ILogHandler
  private formatter: ILogFormatter
  private processors: ILogProcessor[] = []
  private context: LogContext = {}

  /**
   * Create a new SingleChannel instance
   * @param name The channel name
   * @param handler The handler to use
   * @param formatter The formatter to use
   */
  constructor(name: string, handler: ILogHandler, formatter: ILogFormatter) {
    this.name = name
    this.handler = handler
    this.formatter = formatter
  }

  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  public log(level: LogLevel, message: string, context: LogContext = {}): void {
    // Create a log record
    let record: LogRecord = {
      level: level,
      levelName: level.toUpperCase(),
      message: message,
      context: { ...this.context, ...context },
      datetime: new Date(),
    }

    // Process the record with all processors
    record = this.processRecord(record)

    // Handle the record
    if (this.handler.isHandling(record)) {
      this.handler.handle(record)
    }
  }

  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  public withContext(context: LogContext): ISingleChannel {
    this.context = { ...this.context, ...context }
    return this
  }

  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  public withoutContext(keys: string[]): ISingleChannel {
    const newContext: LogContext = { ...this.context }
    for (const key of keys) {
      delete newContext[key]
    }
    this.context = newContext
    return this
  }

  /**
   * Get the channel name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Process a log record
   * @param record The log record to process
   */
  public processRecord(record: LogRecord): LogRecord {
    let processedRecord = record

    // Process the record with all processors
    for (const processor of this.processors) {
      processedRecord = processor.process(processedRecord)
    }

    return processedRecord
  }

  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  public shareContext(context: LogContext): void {
    this.context = { ...this.context, ...context }
  }

  /**
   * Flush shared context
   */
  public flushSharedContext(): void {
    this.context = {}
  }

  /**
   * Get the handler used by the channel
   */
  public getHandler(): ILogHandler {
    return this.handler
  }

  /**
   * Set the handler used by the channel
   * @param handler The handler to use
   */
  public setHandler(handler: ILogHandler): void {
    this.handler = handler
  }

  /**
   * Get the formatter used by the channel
   */
  public getFormatter(): ILogFormatter {
    return this.formatter
  }

  /**
   * Set the formatter used by the channel
   * @param formatter The formatter to use
   */
  public setFormatter(formatter: ILogFormatter): void {
    this.formatter = formatter
  }

  /**
   * Get the processors used by the channel
   */
  public getProcessors(): ILogProcessor[] {
    return this.processors
  }

  /**
   * Add a processor to the channel
   * @param processor The processor to add
   */
  public addProcessor(processor: ILogProcessor): void {
    this.processors.push(processor)
  }

  /**
   * Remove a processor from the channel
   * @param name The name of the processor to remove
   */
  public removeProcessor(name: string): void {
    this.processors = this.processors.filter((processor) => processor.getName() !== name)
  }
}

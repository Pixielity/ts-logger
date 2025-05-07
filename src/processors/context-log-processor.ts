import { injectable } from 'inversify'

import type { LogContext, LogRecord } from '../types'
import { ProcessorType } from '../enums/processor-type.enum'
import type { IContextLogProcessor } from '../interfaces/processors/context-log-processor.interface'

/**
 * ContextLogProcessor is an implementation of the IContextLogProcessor interface.
 * It adds contextual data to log records.
 */
@injectable()
export class ContextLogProcessor implements IContextLogProcessor {
  private name = ProcessorType.CONTEXT
  private context: LogContext = {}

  /**
   * Create a new ContextLogProcessor instance
   * @param context Initial context
   */
  constructor(context: LogContext = {}) {
    this.context = context
  }

  /**
   * Process a log record
   * @param record The log record to process
   */
  public process(record: LogRecord): LogRecord {
    // Merge the processor's context with the record's context
    const mergedContext = { ...this.context, ...record.context }

    // Return the updated record
    return {
      ...record,
      context: mergedContext,
    }
  }

  /**
   * Add contextual data to all subsequent log records
   * @param context The contextual data to add
   */
  public addContext(context: LogContext): void {
    this.context = { ...this.context, ...context }
  }

  /**
   * Remove contextual data from all subsequent log records
   * @param keys The keys to remove from the context
   */
  public removeContext(keys: string[]): void {
    const newContext: LogContext = { ...this.context }
    for (const key of keys) {
      delete newContext[key]
    }
    this.context = newContext
  }

  /**
   * Get the current context
   */
  public getContext(): LogContext {
    return this.context
  }

  /**
   * Clear the current context
   */
  public clearContext(): void {
    this.context = {}
  }

  /**
   * Get the processor name
   */
  public getName(): string {
    return this.name
  }
}

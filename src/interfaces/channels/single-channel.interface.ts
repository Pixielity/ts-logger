import type { ILoggingChannel } from './logging-channel.interface'
import type { ILogHandler } from '../handlers/log-handler.interface'
import type { ILogFormatter } from '../formatters/log-formatter.interface'
import type { ILogProcessor } from '../processors/log-processor.interface'

/**
 * ISingleChannel defines the contract for single channels.
 * A single channel uses a single handler to process log messages.
 */
export interface ISingleChannel extends ILoggingChannel {
  /**
   * Get the handler used by the channel
   */
  getHandler(): ILogHandler

  /**
   * Set the handler used by the channel
   * @param handler The handler to use
   */
  setHandler(handler: ILogHandler): void

  /**
   * Get the formatter used by the channel
   */
  getFormatter(): ILogFormatter

  /**
   * Set the formatter used by the channel
   * @param formatter The formatter to use
   */
  setFormatter(formatter: ILogFormatter): void

  /**
   * Get the processors used by the channel
   */
  getProcessors(): ILogProcessor[]

  /**
   * Add a processor to the channel
   * @param processor The processor to add
   */
  addProcessor(processor: ILogProcessor): void

  /**
   * Remove a processor from the channel
   * @param name The name of the processor to remove
   */
  removeProcessor(name: string): void
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace ISingleChannel {
  /**
   * Symbol for injecting the single channel
   */
  export const $ = Symbol.for('ISingleChannel')
}

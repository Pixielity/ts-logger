import type { ILogHandler } from './log-handler.interface'

/**
 * IErrorLogHandler defines the contract for error log handlers.
 * It provides methods for handling log records in the browser's error log.
 */
export interface IErrorLogHandler extends ILogHandler {
  /**
   * Enable or disable emoji support
   * @param enabled Whether emoji support is enabled
   */
  setEmojiSupport(enabled: boolean): void

  /**
   * Get whether emoji support is enabled
   */
  isEmojiSupportEnabled(): boolean
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IErrorLogHandler {
  /**
   * Symbol for injecting the error log handler
   */
  export const $ = Symbol.for('IErrorLogHandler')
}

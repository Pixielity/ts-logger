import type { ILogHandler } from './log-handler.interface'

/**
 * IConsoleHandler defines the contract for console handlers.
 * It provides methods for handling log records in the browser console.
 */
export interface IConsoleHandler extends ILogHandler {
  /**
   * Enable or disable emoji support
   * @param enabled Whether emoji support is enabled
   */
  setEmojiSupport(enabled: boolean): void

  /**
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  setColorSupport(enabled: boolean): void

  /**
   * Get whether emoji support is enabled
   */
  isEmojiSupportEnabled(): boolean

  /**
   * Get whether color support is enabled
   */
  isColorSupportEnabled(): boolean
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IConsoleHandler {
  /**
   * Symbol for injecting the console handler
   */
  export const $ = Symbol.for('IConsoleHandler')
}

import type { ILogFormatter } from './log-formatter.interface'

/**
 * ISimpleFormatter defines the contract for simple formatters.
 * It provides methods for formatting log records in a simple format.
 */
export interface ISimpleFormatter extends ILogFormatter {
  /**
   * Enable or disable emoji support
   * @param enabled Whether emoji support is enabled
   */
  setEmojiSupport(enabled: boolean): void

  /**
   * Get whether emoji support is enabled
   */
  isEmojiSupportEnabled(): boolean

  /**
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  setColorSupport(enabled: boolean): void

  /**
   * Get whether color support is enabled
   */
  isColorSupportEnabled(): boolean
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace ISimpleFormatter {
  /**
   * Symbol for injecting the simple formatter
   */
  export const $ = Symbol.for('ISimpleFormatter')
}

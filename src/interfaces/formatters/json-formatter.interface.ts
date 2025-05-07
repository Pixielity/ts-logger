import type { ILogFormatter } from './log-formatter.interface'

/**
 * IJsonFormatter defines the contract for JSON formatters.
 * It provides methods for formatting log records as JSON.
 */
export interface IJsonFormatter extends ILogFormatter {
  /**
   * Enable or disable pretty printing
   * @param enabled Whether pretty printing is enabled
   */
  setPrettyPrint(enabled: boolean): void

  /**
   * Get whether pretty printing is enabled
   */
  isPrettyPrintEnabled(): boolean

  /**
   * Enable or disable stack trace formatting
   * @param enabled Whether stack trace formatting is enabled
   */
  setStackTraceFormatting(enabled: boolean): void

  /**
   * Get whether stack trace formatting is enabled
   */
  isStackTraceFormattingEnabled(): boolean
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IJsonFormatter {
  /**
   * Symbol for injecting the JSON formatter
   */
  export const $ = Symbol.for('IJsonFormatter')
}

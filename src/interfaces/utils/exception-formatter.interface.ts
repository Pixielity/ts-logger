/**
 * IExceptionFormatter defines the contract for exception formatters.
 * It provides methods for formatting exceptions.
 */
export interface IExceptionFormatter {
  /**
   * Format an exception
   * @param exception The exception to format
   */
  format(exception: Error): Promise<string>

  /**
   * Get the stack trace from an exception
   * @param exception The exception to get the stack trace from
   */
  getStackTrace(exception: Error): Promise<string>

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
export namespace IExceptionFormatter {
  /**
   * Symbol for injecting the exception formatter
   */
  export const $ = Symbol.for('IExceptionFormatter')
}

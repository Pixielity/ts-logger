import { injectable } from 'inversify'
import type { IExceptionFormatter } from '../interfaces/utils/exception-formatter.interface'
import StackTrace from 'stacktrace-js'

/**
 * ExceptionFormatter is an implementation of the IExceptionFormatter interface.
 * It provides methods for formatting exceptions.
 */
@injectable()
export class ExceptionFormatter implements IExceptionFormatter {
  private colorSupport = true

  /**
   * Create a new ExceptionFormatter instance
   * @param options Options for the formatter
   */
  constructor(options: { colorSupport?: boolean } = {}) {
    if (options.colorSupport !== undefined) {
      this.colorSupport = options.colorSupport
    }
  }

  /**
   * Format an exception
   * @param exception The exception to format
   */
  public async format(exception: Error): Promise<string> {
    const message = exception.message
    const name = exception.name
    const stack = await this.getStackTrace(exception)

    // Format the exception
    let formatted = `${name}: ${message}\n${stack}`

    // Add color if enabled
    if (this.colorSupport) {
      formatted = `%c${formatted}`
      // Note: In a browser environment, this would be used with console.log
      // console.log(formatted, "color: #FF0000")
    }

    return formatted
  }

  /**
   * Get the stack trace from an exception
   * @param exception The exception to get the stack trace from
   */
  public async getStackTrace(exception: Error): Promise<string> {
    // Use stacktrace-js to get a formatted stack trace
    try {
      const stackFrames = await StackTrace.fromError(exception)
      return this.formatStackFrames(stackFrames)
    } catch (error) {
      // Fall back to the native stack trace
      return exception.stack || ''
    }
  }

  /**
   * Format stack frames
   * @param stackFrames The stack frames to format
   */
  private formatStackFrames(stackFrames: any[]): string {
    return stackFrames
      .map((frame) => {
        const fileName = frame.fileName || '<anonymous>'
        const lineNumber = frame.lineNumber || '?'
        const columnNumber = frame.columnNumber || '?'
        const functionName = frame.functionName || '<anonymous>'
        return `    at ${functionName} (${fileName}:${lineNumber}:${columnNumber})`
      })
      .join('\n')
  }

  /**
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  public setColorSupport(enabled: boolean): void {
    this.colorSupport = enabled
  }

  /**
   * Get whether color support is enabled
   */
  public isColorSupportEnabled(): boolean {
    return this.colorSupport
  }
}

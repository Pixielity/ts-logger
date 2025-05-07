import { IExceptionFormatter } from '../interfaces/utils/exception-formatter.interface.js';

/**
 * ExceptionFormatter is an implementation of the IExceptionFormatter interface.
 * It provides methods for formatting exceptions.
 */
declare class ExceptionFormatter implements IExceptionFormatter {
    private colorSupport;
    /**
     * Create a new ExceptionFormatter instance
     * @param options Options for the formatter
     */
    constructor(options?: {
        colorSupport?: boolean;
    });
    /**
     * Format an exception
     * @param exception The exception to format
     */
    format(exception: Error): Promise<string>;
    /**
     * Get the stack trace from an exception
     * @param exception The exception to get the stack trace from
     */
    getStackTrace(exception: Error): Promise<string>;
    /**
     * Format stack frames
     * @param stackFrames The stack frames to format
     */
    private formatStackFrames;
    /**
     * Enable or disable color support
     * @param enabled Whether color support is enabled
     */
    setColorSupport(enabled: boolean): void;
    /**
     * Get whether color support is enabled
     */
    isColorSupportEnabled(): boolean;
}

export { ExceptionFormatter };

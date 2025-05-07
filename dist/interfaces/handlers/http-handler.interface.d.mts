import { ILogHandler } from './log-handler.interface.mjs';
import '../../types/log-record.type.mjs';
import '../../types/log-context.type.mjs';

/**
 * IHttpHandler defines the contract for HTTP handlers.
 * It provides methods for handling log records via HTTP requests.
 */
interface IHttpHandler extends ILogHandler {
    /**
     * Get the URL to send log records to
     */
    getUrl(): string;
    /**
     * Set the URL to send log records to
     * @param url The URL
     */
    setUrl(url: string): void;
    /**
     * Get the HTTP method to use
     */
    getMethod(): string;
    /**
     * Set the HTTP method to use
     * @param method The HTTP method
     */
    setMethod(method: string): void;
    /**
     * Get the HTTP headers to include in requests
     */
    getHeaders(): Record<string, string>;
    /**
     * Set the HTTP headers to include in requests
     * @param headers The HTTP headers
     */
    setHeaders(headers: Record<string, string>): void;
    /**
     * Get the maximum number of retry attempts
     */
    getMaxRetries(): number;
    /**
     * Set the maximum number of retry attempts
     * @param maxRetries The maximum number of retry attempts
     */
    setMaxRetries(maxRetries: number): void;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IHttpHandler {
    /**
     * Symbol for injecting the HTTP handler
     */
    const $: unique symbol;
}

export { IHttpHandler };

import { IHttpHandler } from '../interfaces/handlers/http-handler.interface.mjs';
import { LogRecord } from '../types/types.mjs';
import '../interfaces/handlers/log-handler.interface.mjs';

/**
 * HttpHandler is an implementation of the IHttpHandler interface.
 * It handles log records by sending them to a remote server via HTTP.
 */
declare class HttpHandler implements IHttpHandler {
    private name;
    private next;
    private url;
    private method;
    private headers;
    private maxRetries;
    /**
     * Create a new HttpHandler instance
     * @param options Options for the handler
     */
    constructor(options?: {
        url?: string;
        method?: string;
        headers?: Record<string, string>;
        maxRetries?: number;
    });
    /**
     * Handle a log record
     * @param record The log record to handle
     */
    handle(record: LogRecord): Promise<void>;
    /**
     * Check if the handler can handle the log record
     * @param record The log record to check
     */
    isHandling(record: LogRecord): boolean;
    /**
     * Set the next handler in the chain
     * @param handler The next handler
     */
    setNext(handler: IHttpHandler): IHttpHandler;
    /**
     * Get the next handler in the chain
     */
    getNext(): IHttpHandler | null;
    /**
     * Get the handler name
     */
    getName(): string;
    /**
     * Set the name of the handler
     * @param name The name to set
     */
    setName(name: string): void;
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

export { HttpHandler };

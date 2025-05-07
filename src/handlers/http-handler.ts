import { injectable } from 'inversify'

import type { LogRecord } from '../types/log-record.type'
import type { IHttpHandler } from '../interfaces/handlers/http-handler.interface'

/**
 * HttpHandler is an implementation of the IHttpHandler interface.
 * It handles log records by sending them to a remote server via HTTP.
 */
@injectable()
export class HttpHandler implements IHttpHandler {
  private name = 'http'
  private next: IHttpHandler | null = null
  private url = ''
  private method = 'POST'
  private headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  private maxRetries = 3

  /**
   * Create a new HttpHandler instance
   * @param options Options for the handler
   */
  constructor(
    options: {
      url?: string
      method?: string
      headers?: Record<string, string>
      maxRetries?: number
    } = {},
  ) {
    if (options.url) {
      this.url = options.url
    }
    if (options.method) {
      this.method = options.method
    }
    if (options.headers) {
      this.headers = { ...this.headers, ...options.headers }
    }
    if (options.maxRetries !== undefined) {
      this.maxRetries = options.maxRetries
    }
  }

  /**
   * Handle a log record
   * @param record The log record to handle
   */
  public async handle(record: LogRecord): Promise<void> {
    if (!this.url) {
      console.error('HTTP handler URL not configured')
      return
    }

    const payload = {
      level: record.level,
      levelName: record.levelName,
      message: record.message,
      context: record.context,
      datetime: record.datetime.toISOString(),
      stack: record.stack,
    }

    let retries = 0
    let success = false

    while (!success && retries <= this.maxRetries) {
      try {
        const response = await fetch(this.url, {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          success = true
        } else {
          retries++
          if (retries <= this.maxRetries) {
            // Wait before retrying (exponential backoff)
            await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retries - 1)))
          }
        }
      } catch (error) {
        retries++
        if (retries <= this.maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retries - 1)))
        } else {
          console.error('Failed to send log to HTTP endpoint:', error)
        }
      }
    }

    // Pass the record to the next handler in the chain
    if (this.next) {
      this.next.handle(record)
    }
  }

  /**
   * Check if the handler can handle the log record
   * @param record The log record to check
   */
  public isHandling(record: LogRecord): boolean {
    return !!this.url && typeof fetch !== 'undefined'
  }

  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  public setNext(handler: IHttpHandler): IHttpHandler {
    this.next = handler
    return handler
  }

  /**
   * Get the next handler in the chain
   */
  public getNext(): IHttpHandler | null {
    return this.next
  }

  /**
   * Get the handler name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Set the name of the handler
   * @param name The name to set
   */
  public setName(name: string): void {
    this.name = name
  }

  /**
   * Get the URL to send log records to
   */
  public getUrl(): string {
    return this.url
  }

  /**
   * Set the URL to send log records to
   * @param url The URL
   */
  public setUrl(url: string): void {
    this.url = url
  }

  /**
   * Get the HTTP method to use
   */
  public getMethod(): string {
    return this.method
  }

  /**
   * Set the HTTP method to use
   * @param method The HTTP method
   */
  public setMethod(method: string): void {
    this.method = method
  }

  /**
   * Get the HTTP headers to include in requests
   */
  public getHeaders(): Record<string, string> {
    return this.headers
  }

  /**
   * Set the HTTP headers to include in requests
   * @param headers The HTTP headers
   */
  public setHeaders(headers: Record<string, string>): void {
    this.headers = headers
  }

  /**
   * Get the maximum number of retry attempts
   */
  public getMaxRetries(): number {
    return this.maxRetries
  }

  /**
   * Set the maximum number of retry attempts
   * @param maxRetries The maximum number of retry attempts
   */
  public setMaxRetries(maxRetries: number): void {
    this.maxRetries = maxRetries
  }
}

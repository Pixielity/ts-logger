import { injectable } from 'inversify'

import { LogLevel } from '../enums/log-level.enum'
import type { LogRecord } from '../types/log-record.type'
import type { ISyslogHandler } from '../interfaces/handlers/syslog-handler.interface'

/**
 * SyslogHandler is an implementation of the ISyslogHandler interface.
 * It handles log records in syslog format (browser-compatible).
 */
@injectable()
export class SyslogHandler implements ISyslogHandler {
  private name = 'syslog'
  private next: ISyslogHandler | null = null
  private facility = 16 // local0
  private appName = 'ts-log'
  private procId = 'browser'

  /**
   * Create a new SyslogHandler instance
   * @param options Options for the handler
   */
  constructor(options: { facility?: number; appName?: string; procId?: string } = {}) {
    if (options.facility !== undefined) {
      this.facility = options.facility
    }
    if (options.appName) {
      this.appName = options.appName
    }
    if (options.procId) {
      this.procId = options.procId
    }
  }

  /**
   * Handle a log record
   * @param record The log record to handle
   */
  public handle(record: LogRecord): void {
    // Create a syslog message
    const syslogMessage = this.formatSyslogMessage(record)

    // In a browser environment, we can't send to a syslog server directly
    // So we'll log to the console instead
    console.log(syslogMessage)

    // Pass the record to the next handler in the chain
    if (this.next) {
      this.next.handle(record)
    }
  }

  /**
   * Format a log record as a syslog message
   * @param record The log record to format
   */
  private formatSyslogMessage(record: LogRecord): string {
    // Get the syslog priority
    const priority = this.calculatePriority(record.level as LogLevel)

    // Format the timestamp (RFC3339 format)
    const timestamp = record.datetime.toISOString()

    // Format the message
    const message = record.message

    // Format the structured data
    const structuredData = this.formatStructuredData(record)

    // Format the syslog message
    // <priority>version timestamp hostname app-name procid msgid structured-data message
    return `<${priority}>1 ${timestamp} ${window.location.hostname} ${this.appName} ${this.procId} - ${structuredData} ${message}`
  }

  /**
   * Calculate the syslog priority
   * @param level The log level
   */
  private calculatePriority(level: LogLevel): number {
    // Map log levels to syslog severity levels
    let severity: number
    switch (level) {
      case LogLevel.EMERGENCY:
        severity = 0 // Emergency: system is unusable
        break
      case LogLevel.ALERT:
        severity = 1 // Alert: action must be taken immediately
        break
      case LogLevel.CRITICAL:
        severity = 2 // Critical: critical conditions
        break
      case LogLevel.ERROR:
        severity = 3 // Error: error conditions
        break
      case LogLevel.WARNING:
        severity = 4 // Warning: warning conditions
        break
      case LogLevel.NOTICE:
        severity = 5 // Notice: normal but significant condition
        break
      case LogLevel.INFO:
        severity = 6 // Informational: informational messages
        break
      case LogLevel.DEBUG:
        severity = 7 // Debug: debug-level messages
        break
      default:
        severity = 7 // Default to debug
    }

    // Calculate the priority (facility * 8 + severity)
    return this.facility * 8 + severity
  }

  /**
   * Format the structured data
   * @param record The log record
   */
  private formatStructuredData(record: LogRecord): string {
    if (!record.context || Object.keys(record.context).length === 0) {
      return '-'
    }

    // Format the context as structured data
    let structuredData = `[ts-log@0 `
    for (const [key, value] of Object.entries(record.context)) {
      const escapedValue = String(value).replace(/[\\"]/g, '\\$&')
      structuredData += `${key}="${escapedValue}" `
    }
    structuredData = structuredData.trim() + ']'

    return structuredData
  }

  /**
   * Check if the handler can handle the log record
   * @param record The log record to check
   */
  public isHandling(record: LogRecord): boolean {
    return true
  }

  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  public setNext(handler: ISyslogHandler): ISyslogHandler {
    this.next = handler
    return handler
  }

  /**
   * Get the next handler in the chain
   */
  public getNext(): ISyslogHandler | null {
    return this.next
  }

  /**
   * Get the handler name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Get the facility code
   */
  public getFacility(): number {
    return this.facility
  }

  /**
   * Set the facility code
   * @param facility The facility code
   */
  public setFacility(facility: number): void {
    this.facility = facility
  }

  /**
   * Get the application name
   */
  public getAppName(): string {
    return this.appName
  }

  /**
   * Set the application name
   * @param appName The application name
   */
  public setAppName(appName: string): void {
    this.appName = appName
  }

  /**
   * Get the process ID
   */
  public getProcId(): string {
    return this.procId
  }

  /**
   * Set the process ID
   * @param procId The process ID
   */
  public setProcId(procId: string): void {
    this.procId = procId
  }
}

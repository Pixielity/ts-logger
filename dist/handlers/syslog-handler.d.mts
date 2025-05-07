import { LogRecord } from '../types/log-record.type.mjs';
import { ISyslogHandler } from '../interfaces/handlers/syslog-handler.interface.mjs';
import '../types/log-context.type.mjs';
import '../interfaces/handlers/log-handler.interface.mjs';

/**
 * SyslogHandler is an implementation of the ISyslogHandler interface.
 * It handles log records in syslog format (browser-compatible).
 */
declare class SyslogHandler implements ISyslogHandler {
    private name;
    private next;
    private facility;
    private appName;
    private procId;
    /**
     * Create a new SyslogHandler instance
     * @param options Options for the handler
     */
    constructor(options?: {
        facility?: number;
        appName?: string;
        procId?: string;
    });
    /**
     * Handle a log record
     * @param record The log record to handle
     */
    handle(record: LogRecord): void;
    /**
     * Format a log record as a syslog message
     * @param record The log record to format
     */
    private formatSyslogMessage;
    /**
     * Calculate the syslog priority
     * @param level The log level
     */
    private calculatePriority;
    /**
     * Format the structured data
     * @param record The log record
     */
    private formatStructuredData;
    /**
     * Check if the handler can handle the log record
     * @param record The log record to check
     */
    isHandling(record: LogRecord): boolean;
    /**
     * Set the next handler in the chain
     * @param handler The next handler
     */
    setNext(handler: ISyslogHandler): ISyslogHandler;
    /**
     * Get the next handler in the chain
     */
    getNext(): ISyslogHandler | null;
    /**
     * Get the handler name
     */
    getName(): string;
    /**
     * Get the facility code
     */
    getFacility(): number;
    /**
     * Set the facility code
     * @param facility The facility code
     */
    setFacility(facility: number): void;
    /**
     * Get the application name
     */
    getAppName(): string;
    /**
     * Set the application name
     * @param appName The application name
     */
    setAppName(appName: string): void;
    /**
     * Get the process ID
     */
    getProcId(): string;
    /**
     * Set the process ID
     * @param procId The process ID
     */
    setProcId(procId: string): void;
}

export { SyslogHandler };

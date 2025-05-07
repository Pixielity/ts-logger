import { ILogHandler } from './log-handler.interface.js';
import '../../types/log-record.type.js';
import '../../types/log-context.type.js';

/**
 * ISyslogHandler defines the contract for syslog handlers.
 * It provides methods for handling log records in syslog format (browser-compatible).
 */
interface ISyslogHandler extends ILogHandler {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ISyslogHandler {
    /**
     * Symbol for injecting the syslog handler
     */
    const $: unique symbol;
}

export { ISyslogHandler };

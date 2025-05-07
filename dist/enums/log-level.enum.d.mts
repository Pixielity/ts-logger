/**
 * LogLevel enum defines the available log levels in the ts-log package.
 * These levels are inspired by RFC 5424 and provide a standardized way to categorize log messages.
 */
declare enum LogLevel {
    /**
     * System is unusable
     */
    EMERGENCY = "emergency",
    /**
     * Action must be taken immediately
     */
    ALERT = "alert",
    /**
     * Critical conditions
     */
    CRITICAL = "critical",
    /**
     * Error conditions
     */
    ERROR = "error",
    /**
     * Warning conditions
     */
    WARNING = "warning",
    /**
     * Normal but significant condition
     */
    NOTICE = "notice",
    /**
     * Informational messages
     */
    INFO = "info",
    /**
     * Debug-level messages
     */
    DEBUG = "debug"
}

export { LogLevel };

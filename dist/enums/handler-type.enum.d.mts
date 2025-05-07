/**
 * HandlerType enum defines the available handler types in the ts-log package.
 * These types determine how log records are processed.
 */
declare enum HandlerType {
    /**
     * Console handler outputs logs to the browser console
     */
    CONSOLE = "console",
    /**
     * LocalStorage handler stores logs in the browser's localStorage
     */
    LOCAL_STORAGE = "localStorage",
    /**
     * IndexedDB handler stores logs in the browser's IndexedDB
     */
    INDEXED_DB = "indexedDB",
    /**
     * HTTP handler sends logs to a remote server via HTTP
     */
    HTTP = "http",
    /**
     * Slack handler sends logs to a Slack webhook
     */
    SLACK = "slack",
    /**
     * ErrorLog handler outputs logs to the browser's error log
     */
    ERROR_LOG = "errorLog",
    /**
     * Syslog handler outputs logs in syslog format (browser-compatible)
     */
    SYSLOG = "syslog",
    /**
     * FingersCrossed handler buffers logs until a certain level is reached
     */
    FINGERS_CROSSED = "fingersCrossed",
    /**
     * Custom handler type for user-defined handlers
     */
    CUSTOM = "custom"
}

export { HandlerType };

/**
 * ProcessorType enum defines the available processor types in the ts-log package.
 * These types determine how log records are processed before being handled.
 */
declare enum ProcessorType {
    /**
     * MessagePlaceholder processor replaces placeholders in log messages with context values
     */
    MESSAGE_PLACEHOLDER = "messagePlaceholder",
    /**
     * Context processor adds contextual data to log records
     */
    CONTEXT = "context",
    /**
     * Custom processor type for user-defined processors
     */
    CUSTOM = "custom"
}

export { ProcessorType };

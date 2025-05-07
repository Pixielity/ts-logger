/**
 * FormatterType enum defines the available formatter types in the ts-log package.
 * These types determine how log records are formatted.
 */
declare enum FormatterType {
    /**
     * Line formatter formats logs as lines of text
     */
    LINE = "line",
    /**
     * JSON formatter formats logs as JSON
     */
    JSON = "json",
    /**
     * Simple formatter formats logs in a simple format
     */
    SIMPLE = "simple",
    /**
     * Custom formatter type for user-defined formatters
     */
    CUSTOM = "custom"
}

export { FormatterType };

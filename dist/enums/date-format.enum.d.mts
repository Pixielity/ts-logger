/**
 * DateFormat enum defines the available date formats in the ts-log package.
 * These formats determine how dates are formatted in log records.
 */
declare enum DateFormat {
    /**
     * ISO 8601 format (e.g., 2023-01-01T12:00:00.000Z)
     */
    ISO8601 = "ISO8601",
    /**
     * RFC 3339 format (e.g., 2023-01-01T12:00:00+00:00)
     */
    RFC3339 = "RFC3339",
    /**
     * RFC 2822 format (e.g., Mon, 01 Jan 2023 12:00:00 +0000)
     */
    RFC2822 = "RFC2822",
    /**
     * UNIX timestamp format (e.g., 1672574400)
     */
    UNIX = "UNIX",
    /**
     * Year-month-day format (e.g., 2023-01-01)
     */
    YYYY_MM_DD = "YYYY-MM-DD",
    /**
     * Year-month-day hour:minute:second format (e.g., 2023-01-01 12:00:00)
     */
    YYYY_MM_DD_HH_MM_SS = "YYYY-MM-DD HH:mm:ss",
    /**
     * Day/month/year format (e.g., 01/01/2023)
     */
    DD_MM_YYYY = "DD/MM/YYYY",
    /**
     * Month/day/year format (e.g., 01/01/2023)
     */
    MM_DD_YYYY = "MM/DD/YYYY",
    /**
     * Hour:minute:second format (e.g., 12:00:00)
     */
    HH_MM_SS = "HH:mm:ss",
    /**
     * Custom date format
     */
    CUSTOM = "custom"
}

export { DateFormat };

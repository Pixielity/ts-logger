import { DateFormat } from '../enums/date-format.enum.js';

/**
 * Get the date format string for a DateFormat enum value
 * @param format The DateFormat enum value
 * @param customFormat The custom format string (if format is DateFormat.CUSTOM)
 */
declare function getDateFormatString(format: DateFormat, customFormat?: string): string;
/**
 * Format a date according to a DateFormat enum value
 * @param date The date to format
 * @param format The DateFormat enum value
 * @param customFormat The custom format string (if format is DateFormat.CUSTOM)
 */
declare function formatDate(date: Date, format: DateFormat, customFormat?: string): string;

export { formatDate, getDateFormatString };

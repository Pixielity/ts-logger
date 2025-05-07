import { DateFormat } from '../enums/date-format.enum.mjs';

/**
 * Get the date format string for a DateFormat enum value
 * @param format The DateFormat enum value
 * @param customFormat The custom format string (if format is DateFormat.CUSTOM)
 */
declare function getDateFormatString(format: DateFormat, customFormat?: string): string;
/**
 * Formats a given date into a string based on the provided format.
 *
 * @param {Date} date - The date to be formatted.
 * @param {DateFormat} format - The format to use for the date. It can be a predefined format from the DateFormat enum.
 * @param {string} [customFormat] - Optional custom format string. If not provided, the predefined format is used.
 * @returns {string} - A formatted string representing the date.
 *
 * @example
 * const formattedDate = formatDate(new Date(), DateFormat.FULL);
 * console.log(formattedDate); // Outputs the formatted date string in the specified format
 */
declare function formatDate(date: Date, format: DateFormat, customFormat?: string): string;

export { formatDate, getDateFormatString };

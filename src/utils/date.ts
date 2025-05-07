import { DateFormat } from '../enums'

/**
 * Get the date format string for a DateFormat enum value
 * @param format The DateFormat enum value
 * @param customFormat The custom format string (if format is DateFormat.CUSTOM)
 */
export function getDateFormatString(format: DateFormat, customFormat?: string): string {
  switch (format) {
    case DateFormat.ISO8601:
      return 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    case DateFormat.RFC3339:
      return 'YYYY-MM-DDTHH:mm:ssZ'
    case DateFormat.RFC2822:
      return 'ddd, DD MMM YYYY HH:mm:ss ZZ'
    case DateFormat.UNIX:
      return 'X'
    case DateFormat.YYYY_MM_DD:
      return 'YYYY-MM-DD'
    case DateFormat.YYYY_MM_DD_HH_MM_SS:
      return 'YYYY-MM-DD HH:mm:ss'
    case DateFormat.DD_MM_YYYY:
      return 'DD/MM/YYYY'
    case DateFormat.MM_DD_YYYY:
      return 'MM/DD/YYYY'
    case DateFormat.HH_MM_SS:
      return 'HH:mm:ss'
    case DateFormat.YYYY_MM_DD_HH_MM_SS_MILLI:
      return 'YYYY-MM-DD HH:mm:ss.SSS' // Handle milliseconds format here
    case DateFormat.CUSTOM:
      return customFormat || 'YYYY-MM-DD HH:mm:ss'
    default:
      return 'YYYY-MM-DD HH:mm:ss'
  }
}

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
export function formatDate(date: Date, format: DateFormat, customFormat?: string): string {
  // Determine the format string to be used based on the input format and optional custom format.
  const formatString = getDateFormatString(format, customFormat)

  // Extract individual date components (UTC-based) from the input date.
  const year = date.getUTCFullYear()
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')

  // If the specified format is UNIX, return the timestamp in seconds.
  if (format === DateFormat.UNIX) {
    // Return the timestamp in seconds
    return Math.floor(date.getTime() / 1000).toString()
  }

  // Replace placeholders in the format string with actual date components (e.g., 'YYYY', 'MM', etc.).
  return formatString
    .replace('YYYY', String(year)) // Replace 'YYYY' with the year
    .replace('MM', month) // Replace 'MM' with the month (2 digits)
    .replace('DD', day) // Replace 'DD' with the day (2 digits)
    .replace('HH', hours) // Replace 'HH' with hours (2 digits)
    .replace('mm', minutes) // Replace 'mm' with minutes (2 digits)
    .replace('ss', seconds) // Replace 'ss' with seconds (2 digits)
    .replace('SSS', milliseconds) // Replace 'SSS' with milliseconds (3 digits)
}

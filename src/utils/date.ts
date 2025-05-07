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
    case DateFormat.CUSTOM:
      return customFormat || 'YYYY-MM-DD HH:mm:ss'
    default:
      return 'YYYY-MM-DD HH:mm:ss'
  }
}

/**
 * Format a date according to a DateFormat enum value
 * @param date The date to format
 * @param format The DateFormat enum value
 * @param customFormat The custom format string (if format is DateFormat.CUSTOM)
 */
export function formatDate(date: Date, format: DateFormat, customFormat?: string): string {
  const formatString = getDateFormatString(format, customFormat)

  // Simple date formatting based on the format string
  // In a real implementation, you might use a library like date-fns
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0')

  // Handle special cases
  if (format === DateFormat.UNIX) {
    return Math.floor(date.getTime() / 1000).toString()
  }

  // Replace tokens in the format string
  return formatString
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('SSS', milliseconds)
}

import { LogLevel } from '../enums'

/**
 * LogLevelValue maps LogLevel enum values to numeric values for comparison.
 * Higher values indicate more severe log levels.
 */
export const LogLevelValue: Record<LogLevel, number> = {
  [LogLevel.EMERGENCY]: 800,
  [LogLevel.ALERT]: 700,
  [LogLevel.CRITICAL]: 600,
  [LogLevel.ERROR]: 500,
  [LogLevel.WARNING]: 400,
  [LogLevel.NOTICE]: 300,
  [LogLevel.INFO]: 200,
  [LogLevel.DEBUG]: 100,
}

/**
 * LogLevelEmoji maps LogLevel enum values to emojis for visual representation.
 */
export const LogLevelEmoji: Record<LogLevel, string> = {
  [LogLevel.EMERGENCY]: '🚨',
  [LogLevel.ALERT]: '🔔',
  [LogLevel.CRITICAL]: '❗',
  [LogLevel.ERROR]: '🔴',
  [LogLevel.WARNING]: '⚠️',
  [LogLevel.NOTICE]: '📝',
  [LogLevel.INFO]: '✅',
  [LogLevel.DEBUG]: '🛠️',
}

/**
 * LogLevelColor maps LogLevel enum values to CSS color values for visual representation.
 */
export const LogLevelColor: Record<LogLevel, string> = {
  [LogLevel.EMERGENCY]: '#FF0000', // Red
  [LogLevel.ALERT]: '#FF4500', // OrangeRed
  [LogLevel.CRITICAL]: '#FF8C00', // DarkOrange
  [LogLevel.ERROR]: '#FFA500', // Orange
  [LogLevel.WARNING]: '#FFD700', // Gold
  [LogLevel.NOTICE]: '#1E90FF', // DodgerBlue
  [LogLevel.INFO]: '#32CD32', // LimeGreen
  [LogLevel.DEBUG]: '#808080', // Gray
}

import { LogLevel } from '../enums'

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

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

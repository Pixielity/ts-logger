import { LogLevel } from '../enums'

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

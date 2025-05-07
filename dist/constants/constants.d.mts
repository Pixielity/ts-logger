import { LogLevel } from '../enums/log-level.enum.mjs';

/**
 * LogLevelValue maps LogLevel enum values to numeric values for comparison.
 * Higher values indicate more severe log levels.
 */
declare const LogLevelValue: Record<LogLevel, number>;
/**
 * LogLevelEmoji maps LogLevel enum values to emojis for visual representation.
 */
declare const LogLevelEmoji: Record<LogLevel, string>;
/**
 * LogLevelColor maps LogLevel enum values to CSS color values for visual representation.
 */
declare const LogLevelColor: Record<LogLevel, string>;

export { LogLevelColor, LogLevelEmoji, LogLevelValue };

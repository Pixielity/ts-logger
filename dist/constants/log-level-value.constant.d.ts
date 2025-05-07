import { LogLevel } from '../enums/log-level.enum.js';

/**
 * LogLevelValue maps LogLevel enum values to numeric values for comparison.
 * Higher values indicate more severe log levels.
 */
declare const LogLevelValue: Record<LogLevel, number>;

export { LogLevelValue };

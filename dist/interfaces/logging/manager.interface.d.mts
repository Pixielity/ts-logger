import { ILoggingService } from './logging-service.interface.mjs';
import { LogLevel } from '../../enums/log-level.enum.mjs';
import { LogChannelType } from '../../enums/log-channel-type.enum.mjs';
import { LogContext, ChannelOptions, HandlerOptions, FormatterOptions, ProcessorOptions } from '../../types/types.mjs';

/**
 * ILogManager defines the contract for log managers.
 * It provides methods for managing channels, drivers, and extending the logging system.
 */
interface ILogManager extends ILoggingService {
    /**
     * Get the channel with the specified name
     * @param name The channel name
     */
    channel(name?: string): ILoggingService;
    /**
     * Get the stack channel with the specified name
     * @param name The stack name
     */
    stack(name: string): ILoggingService;
    /**
     * Get the driver with the specified name
     * @param name The driver name
     */
    driver(name?: string): ILoggingService;
    /**
     * Extend the logging system with a custom driver creator
     * @param driver The driver name
     * @param callback The callback function that creates the driver
     */
    extend(driver: string, callback: (config: any) => ILoggingService): void;
    /**
     * Log an emergency message
     * @param message The message to log
     * @param context Optional contextual data
     */
    emergency(message: string, context: LogContext): void;
    /**
     * Get all registered channels
     */
    getChannels(): Record<string, ILoggingService>;
    /**
     * Get the default channel name
     */
    getDefaultChannel(): string;
    /**
     * Set the default channel name
     * @param name The default channel name
     */
    setDefaultChannel(name: string): void;
    /**
     * Create a channel with the specified configuration
     * @param name The channel name
     * @param type The channel type
     * @param options The channel options
     */
    createChannel(name: string, type: LogChannelType, options?: ChannelOptions): ILoggingService;
    /**
     * Create a handler with the specified configuration
     * @param type The handler type
     * @param options The handler options
     */
    createHandler(type: string, options?: HandlerOptions): any;
    /**
     * Create a formatter with the specified configuration
     * @param type The formatter type
     * @param options The formatter options
     */
    createFormatter(type: string, options?: FormatterOptions): any;
    /**
     * Create a processor with the specified configuration
     * @param type The processor type
     * @param options The processor options
     */
    createProcessor(type: string, options?: ProcessorOptions): any;
    /**
     * Get the minimum log level
     */
    getMinimumLevel(): LogLevel;
    /**
     * Set the minimum log level
     * @param level The minimum log level
     */
    setMinimumLevel(level: LogLevel): void;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ILogManager {
    /**
     * Symbol for injecting the log manager
     */
    const $: unique symbol;
}

export { ILogManager };

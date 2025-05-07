import { IMessageLogged } from '../interfaces/events/message-logged.interface.mjs';
import { LogLevel } from '../enums/log-level.enum.mjs';
import { LogContext } from '../types/types.mjs';
import '../interfaces/events/log-event.interface.mjs';

/**
 * MessageLoggedEvent is an implementation of the IMessageLogged interface.
 * It represents an event that is dispatched when a message is logged.
 */
declare class MessageLoggedEvent implements IMessageLogged {
    private name;
    private timestamp;
    private level;
    private message;
    private context;
    private stack?;
    private channel;
    /**
     * Create a new MessageLoggedEvent instance
     * @param level The log level
     * @param message The log message
     * @param context The log context
     * @param stack The stack trace
     * @param channel The channel name
     */
    constructor(level: LogLevel, message: string, context: LogContext, stack?: string, channel?: string);
    /**
     * Get the event name
     */
    getName(): string;
    /**
     * Get the event data
     */
    getData(): Record<string, any>;
    /**
     * Get the event timestamp
     */
    getTimestamp(): Date;
    /**
     * Get the log level
     */
    getLevel(): LogLevel;
    /**
     * Get the log message
     */
    getMessage(): string;
    /**
     * Get the log context
     */
    getContext(): LogContext;
    /**
     * Get the stack trace
     */
    getStack(): string | undefined;
    /**
     * Get the channel name
     */
    getChannel(): string;
}

export { MessageLoggedEvent };

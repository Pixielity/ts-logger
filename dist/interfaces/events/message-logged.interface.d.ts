import { ILogEvent } from './log-event.interface.js';
import { LogLevel } from '../../enums/log-level.enum.js';
import { LogContext } from '../../types/types.js';

/**
 * IMessageLogged defines the contract for message logged events.
 * It provides methods for accessing information about logged messages.
 */
interface IMessageLogged extends ILogEvent {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IMessageLogged {
    /**
     * Symbol for injecting the message logged event
     */
    const $: unique symbol;
}

export { IMessageLogged };

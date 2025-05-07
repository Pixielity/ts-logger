/**
 * ILogEvent defines the contract for log events.
 * It provides methods for identifying and handling log events.
 */
interface ILogEvent {
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
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ILogEvent {
    /**
     * Symbol for injecting the log event
     */
    const $: unique symbol;
}

export { ILogEvent };

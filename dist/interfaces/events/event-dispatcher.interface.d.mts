import { ILogEvent } from './log-event.interface.mjs';
import { LogListener } from '../../types/log-listener.type.mjs';

/**
 * IEventDispatcher defines the contract for event dispatchers.
 * It provides methods for dispatching events and managing event listeners.
 */
interface IEventDispatcher {
    /**
     * Dispatch an event
     * @param event The event to dispatch
     */
    dispatch(event: ILogEvent): void;
    /**
     * Add a listener for an event
     * @param eventName The event name
     * @param listener The event listener
     */
    addListener(eventName: string, listener: LogListener): void;
    /**
     * Remove a listener for an event
     * @param eventName The event name
     * @param listener The event listener
     */
    removeListener(eventName: string, listener: LogListener): void;
    /**
     * Get all listeners for an event
     * @param eventName The event name
     */
    getListeners(eventName: string): LogListener[];
    /**
     * Check if an event has listeners
     * @param eventName The event name
     */
    hasListeners(eventName: string): boolean;
    /**
     * Remove all listeners for an event
     * @param eventName The event name
     */
    clearListeners(eventName: string): void;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IEventDispatcher {
    /**
     * Symbol for injecting the event dispatcher
     */
    const $: unique symbol;
}

export { IEventDispatcher };

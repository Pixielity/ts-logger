import { IEventDispatcher } from '../interfaces/events/event-dispatcher.interface.mjs';
import { ILogEvent } from '../interfaces/events/log-event.interface.mjs';
import { LogListener } from '../types/types.mjs';

/**
 * EventDispatcher is an implementation of the IEventDispatcher interface.
 * It provides methods for dispatching events and managing event listeners.
 */
declare class EventDispatcher implements IEventDispatcher {
    private listeners;
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

export { EventDispatcher };

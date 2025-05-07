import { injectable } from 'inversify'

import type { LogListener } from '../types/log-listener.type'
import type { ILogEvent } from '../interfaces/events/log-event.interface'
import type { IEventDispatcher } from '../interfaces/events/event-dispatcher.interface'

/**
 * EventDispatcher is an implementation of the IEventDispatcher interface.
 * It provides methods for dispatching events and managing event listeners.
 */
@injectable()
export class EventDispatcher implements IEventDispatcher {
  private listeners: Record<string, LogListener[]> = {}

  /**
   * Dispatch an event
   * @param event The event to dispatch
   */
  public dispatch(event: ILogEvent): void {
    const eventName = event.getName()

    // Get listeners for the event
    const eventListeners = this.listeners[eventName] || []

    // Call each listener with the event
    for (const listener of eventListeners) {
      try {
        listener(event)
      } catch (error) {
        console.error(`Error in event listener for ${eventName}:`, error)
      }
    }
  }

  /**
   * Add a listener for an event
   * @param eventName The event name
   * @param listener The event listener
   */
  public addListener(eventName: string, listener: LogListener): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push(listener)
  }

  /**
   * Remove a listener for an event
   * @param eventName The event name
   * @param listener The event listener
   */
  public removeListener(eventName: string, listener: LogListener): void {
    if (!this.listeners[eventName]) {
      return
    }
    this.listeners[eventName] = this.listeners[eventName].filter((l) => l !== listener)
  }

  /**
   * Get all listeners for an event
   * @param eventName The event name
   */
  public getListeners(eventName: string): LogListener[] {
    return this.listeners[eventName] || []
  }

  /**
   * Check if an event has listeners
   * @param eventName The event name
   */
  public hasListeners(eventName: string): boolean {
    return !!this.listeners[eventName] && this.listeners[eventName].length > 0
  }

  /**
   * Remove all listeners for an event
   * @param eventName The event name
   */
  public clearListeners(eventName: string): void {
    this.listeners[eventName] = []
  }
}

import type { IContextDehydrating } from '../../interfaces/events/dehydrating.interface'
import type { LogContext } from '../../types/log-context.type'

/**
 * ContextDehydratingEvent is an implementation of the IContextDehydrating interface.
 * It represents an event that is dispatched when the context is being dehydrated.
 */
export class ContextDehydratingEvent implements IContextDehydrating {
  private name = 'context.dehydrating'
  private timestamp: Date = new Date()
  private context: LogContext

  /**
   * Create a new ContextDehydratingEvent instance
   * @param context The context data being dehydrated
   */
  constructor(context: LogContext) {
    this.context = context
  }

  /**
   * Get the event name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Get the event data
   */
  public getData(): Record<string, any> {
    return {
      context: this.context,
    }
  }

  /**
   * Get the event timestamp
   */
  public getTimestamp(): Date {
    return this.timestamp
  }

  /**
   * Get the context data being dehydrated
   */
  public getContext(): LogContext {
    return this.context
  }

  /**
   * Set the context data being dehydrated
   * @param context The context data
   */
  public setContext(context: LogContext): void {
    this.context = context
  }
}

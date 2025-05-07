import type { IContextHydrated } from '../../interfaces/events/hydrated.interface'
import type { LogContext } from '../../types/log-context.type'

/**
 * ContextHydratedEvent is an implementation of the IContextHydrated interface.
 * It represents an event that is dispatched when the context has been hydrated.
 */
export class ContextHydratedEvent implements IContextHydrated {
  private name = 'context.hydrated'
  private timestamp: Date = new Date()
  private context: LogContext
  private source: string

  /**
   * Create a new ContextHydratedEvent instance
   * @param context The context data that was hydrated
   * @param source The source of the hydrated data
   */
  constructor(context: LogContext, source: string) {
    this.context = context
    this.source = source
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
      source: this.source,
    }
  }

  /**
   * Get the event timestamp
   */
  public getTimestamp(): Date {
    return this.timestamp
  }

  /**
   * Get the context data that was hydrated
   */
  public getContext(): LogContext {
    return this.context
  }

  /**
   * Get the source of the hydrated data
   */
  public getSource(): string {
    return this.source
  }
}

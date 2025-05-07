import { injectable } from 'inversify'
import { ServiceProvider } from '@pixielity/ts-application'

// Import all interfaces with their namespaces
import { IContextManager } from '../interfaces/context/manager.interface'
import { IContextManagement } from '../interfaces/context/management.interface'
import { IEventDispatcher } from '../interfaces/events/event-dispatcher.interface'
import { IExceptionFormatter } from '../interfaces/utils/exception-formatter.interface'
import { IContextLogProcessor } from '../interfaces/processors/context-log-processor.interface'

// Import all implementations
import { ContextManager } from '../context/manager'
import { ContextRepository } from '../context/repository'
import { ExceptionFormatter } from '../utils/exception-formatter'
import { ContextLogProcessor } from '../processors/context-log-processor'

/**
 * ContextServiceProvider is an implementation of the IContextServiceProvider interface.
 * It provides methods for registering context management services in a dependency injection container.
 */
@injectable()
export class ContextServiceProvider extends ServiceProvider {
  /**
   * Register the context management services in the container
   */
  public register(): void {
    // Register context management services
    this.app.bind<IContextManagement>(IContextManagement.$).to(ContextRepository).inSingletonScope()

    // Register context log processor
    this.app
      .bind<IContextLogProcessor>(IContextLogProcessor.$)
      .to(ContextLogProcessor)
      .inSingletonScope()

    // Register utility services
    this.app.bind<IContextManager>(IContextManager.$).to(ContextManager).inSingletonScope()
    this.app
      .bind<IExceptionFormatter>(IExceptionFormatter.$)
      .to(ExceptionFormatter)
      .inSingletonScope()
  }

  /**
   * Boot the context management services
   */
  public boot(): void {
    // Get the context repository
    const contextRepository = this.app.make<IContextManagement>(IContextManagement.$)

    // Get the context log processor
    const contextLogProcessor = this.app.make<IContextLogProcessor>(IContextLogProcessor.$)

    // Set up event listeners for context events
    const eventDispatcher = this.app.make<IEventDispatcher>(IEventDispatcher.$)

    // Add default context values if needed
    contextRepository.add('app', 'ts-logger')
    contextRepository.add('startTime', new Date().toISOString())
  }
}

import { ServiceProvider } from '@pixielity/ts-application';

/**
 * ContextServiceProvider is an implementation of the IContextServiceProvider interface.
 * It provides methods for registering context management services in a dependency injection container.
 */
declare class ContextServiceProvider extends ServiceProvider {
    /**
     * Register the context management services in the container
     */
    register(): void;
    /**
     * Boot the context management services
     */
    boot(): void;
}

export { ContextServiceProvider };

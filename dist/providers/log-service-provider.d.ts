import { ServiceProvider } from '@pixielity/ts-application';

/**
 * LogServiceProvider is an implementation of the ILogServiceProvider interface.
 * It provides methods for registering logging services in a dependency injection container.
 */
declare class LogServiceProvider extends ServiceProvider {
    /**
     * Register all logging services, channels, handlers, formatters, and processors
     */
    register(): void;
}

export { LogServiceProvider };

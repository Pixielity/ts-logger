import { injectable } from 'inversify'
import { ServiceProvider } from '@pixielity/ts-application'

// Import all interfaces
import * as interfaces from '../interfaces'

// Import all handlers
import * as handlers from '../handlers'

// Import all formatterrs
import * as formatters from '../formatters'

// Import all channels
import * as channels from '../channels'

import { Logger } from '../logger'
import { LogManager } from '../manager'
import { EventDispatcher } from '../events/event-dispatcher'
import { MessagePlaceholderProcessor } from '../processors/message-placeholder-processor'

/**
 * LogServiceProvider is an implementation of the ILogServiceProvider interface.
 * It provides methods for registering logging services in a dependency injection container.
 */
@injectable()
export class LogServiceProvider extends ServiceProvider {
  /**
   * Register all logging services, channels, handlers, formatters, and processors
   */
  public register(): void {
    // Register the event dispatcher service as a singleton
    this.app
      .bind<interfaces.IEventDispatcher>(interfaces.IEventDispatcher.$)
      .to(EventDispatcher)
      .inSingletonScope()

    // Register the log manager as a singleton
    this.app
      .bind<interfaces.ILogManager>(interfaces.ILogManager.$)
      .to(LogManager)
      .inSingletonScope()

    // Register the main logging service
    this.app.bind<interfaces.ILoggingService>(interfaces.ILoggingService.$).to(Logger)

    // Register logging channels
    this.app.bind<interfaces.IStackChannel>(interfaces.IStackChannel.$).to(channels.StackChannel) // StackChannel for handling multiple handlers

    this.app.bind<interfaces.ISingleChannel>(interfaces.ISingleChannel.$).to(channels.SingleChannel) // SingleChannel for one-handler logs

    // Register log handlers

    this.app.bind<interfaces.ILogHandler>(interfaces.ILogHandler.$).to(handlers.ConsoleHandler) // Default log handler for all logs

    this.app
      .bind<interfaces.IConsoleHandler>(interfaces.IConsoleHandler.$)
      .to(handlers.ConsoleHandler) // Console-specific handler

    this.app
      .bind<interfaces.ILocalStorageHandler>(interfaces.ILocalStorageHandler.$)
      .to(handlers.LocalStorageHandler) // Handler to write logs to localStorage

    this.app
      .bind<interfaces.IIndexedDBHandler>(interfaces.IIndexedDBHandler.$)
      .to(handlers.IndexedDBHandler) // Handler to persist logs in IndexedDB

    this.app.bind<interfaces.IHttpHandler>(interfaces.IHttpHandler.$).to(handlers.HttpHandler) // Handler to send logs over HTTP

    this.app
      .bind<interfaces.ISlackWebhookHandler>(interfaces.ISlackWebhookHandler.$)
      .to(handlers.SlackWebhookHandler) // Handler to post logs to Slack via webhook

    this.app.bind<interfaces.ISyslogHandler>(interfaces.ISyslogHandler.$).to(handlers.SyslogHandler) // Handler for syslog-style logging (remote server)

    this.app
      .bind<interfaces.IErrorLogHandler>(interfaces.IErrorLogHandler.$)
      .to(handlers.ErrorLogHandler) // Specialized handler for error logs

    this.app
      .bind<interfaces.IFingersCrossedHandler>(interfaces.IFingersCrossedHandler.$)
      .to(handlers.FingersCrossedHandler) // Conditional handler that triggers on log threshold

    // Register formatters

    this.app.bind<interfaces.ILogFormatter>(interfaces.ILogFormatter.$).to(formatters.LineFormatter) // Default formatter (line-based format)

    this.app
      .bind<interfaces.ILineFormatter>(interfaces.ILineFormatter.$)
      .to(formatters.LineFormatter) // LineFormatter implementation

    this.app
      .bind<interfaces.IJsonFormatter>(interfaces.IJsonFormatter.$)
      .to(formatters.JsonFormatter) // Formatter to serialize logs as JSON

    this.app
      .bind<interfaces.ISimpleFormatter>(interfaces.ISimpleFormatter.$)
      .to(formatters.SimpleFormatter) // Simple human-readable format

    // Register processors

    this.app
      .bind<interfaces.ILogProcessor>(interfaces.ILogProcessor.$)
      .to(MessagePlaceholderProcessor) // Default processor for placeholders

    this.app
      .bind<interfaces.IMessagePlaceholderProcessor>(interfaces.IMessagePlaceholderProcessor.$)
      .to(MessagePlaceholderProcessor) // Specific binding for message formatting
  }
}

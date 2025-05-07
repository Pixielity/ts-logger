/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/interfaces/channels/logging-channel.interface.ts
var ILoggingChannel;
((ILoggingChannel2) => {
  ILoggingChannel2.$ = Symbol.for("ILoggingChannel");
})(ILoggingChannel || (ILoggingChannel = {}));

// src/interfaces/channels/single-channel.interface.ts
var ISingleChannel;
((ISingleChannel2) => {
  ISingleChannel2.$ = Symbol.for("ISingleChannel");
})(ISingleChannel || (ISingleChannel = {}));

// src/interfaces/channels/stack-channel.interface.ts
var IStackChannel;
((IStackChannel2) => {
  IStackChannel2.$ = Symbol.for("IStackChannel");
})(IStackChannel || (IStackChannel = {}));

// src/interfaces/context/manager.interface.ts
var IContextManager;
((IContextManager2) => {
  IContextManager2.$ = Symbol.for("IContextManager");
})(IContextManager || (IContextManager = {}));

// src/interfaces/context/management.interface.ts
var IContextManagement;
((IContextManagement2) => {
  IContextManagement2.$ = Symbol.for("IContextManagement");
})(IContextManagement || (IContextManagement = {}));

// src/interfaces/events/dehydrating.interface.ts
var IContextDehydrating;
((IContextDehydrating2) => {
  IContextDehydrating2.$ = Symbol.for("IContextDehydrating");
})(IContextDehydrating || (IContextDehydrating = {}));

// src/interfaces/events/hydrated.interface.ts
var IContextHydrated;
((IContextHydrated2) => {
  IContextHydrated2.$ = Symbol.for("IContextHydrated");
})(IContextHydrated || (IContextHydrated = {}));

// src/interfaces/events/event-dispatcher.interface.ts
var IEventDispatcher;
((IEventDispatcher2) => {
  IEventDispatcher2.$ = Symbol.for("IEventDispatcher");
})(IEventDispatcher || (IEventDispatcher = {}));

// src/interfaces/events/log-event.interface.ts
var ILogEvent;
((ILogEvent2) => {
  ILogEvent2.$ = Symbol.for("ILogEvent");
})(ILogEvent || (ILogEvent = {}));

// src/interfaces/events/message-logged.interface.ts
var IMessageLogged;
((IMessageLogged2) => {
  IMessageLogged2.$ = Symbol.for("IMessageLogged");
})(IMessageLogged || (IMessageLogged = {}));

// src/interfaces/formatters/json-formatter.interface.ts
var IJsonFormatter;
((IJsonFormatter2) => {
  IJsonFormatter2.$ = Symbol.for("IJsonFormatter");
})(IJsonFormatter || (IJsonFormatter = {}));

// src/interfaces/formatters/line-formatter.interface.ts
var ILineFormatter;
((ILineFormatter2) => {
  ILineFormatter2.$ = Symbol.for("ILineFormatter");
})(ILineFormatter || (ILineFormatter = {}));

// src/interfaces/formatters/log-formatter.interface.ts
var ILogFormatter;
((ILogFormatter2) => {
  ILogFormatter2.$ = Symbol.for("ILogFormatter");
})(ILogFormatter || (ILogFormatter = {}));

// src/interfaces/formatters/simple-formatter.interface.ts
var ISimpleFormatter;
((ISimpleFormatter2) => {
  ISimpleFormatter2.$ = Symbol.for("ISimpleFormatter");
})(ISimpleFormatter || (ISimpleFormatter = {}));

// src/interfaces/handlers/console-handler.interface.ts
var IConsoleHandler;
((IConsoleHandler2) => {
  IConsoleHandler2.$ = Symbol.for("IConsoleHandler");
})(IConsoleHandler || (IConsoleHandler = {}));

// src/interfaces/handlers/error-log-handler.interface.ts
var IErrorLogHandler;
((IErrorLogHandler2) => {
  IErrorLogHandler2.$ = Symbol.for("IErrorLogHandler");
})(IErrorLogHandler || (IErrorLogHandler = {}));

// src/interfaces/handlers/fingers-crossed-handler.interface.ts
var IFingersCrossedHandler;
((IFingersCrossedHandler2) => {
  IFingersCrossedHandler2.$ = Symbol.for("IFingersCrossedHandler");
})(IFingersCrossedHandler || (IFingersCrossedHandler = {}));

// src/interfaces/handlers/http-handler.interface.ts
var IHttpHandler;
((IHttpHandler2) => {
  IHttpHandler2.$ = Symbol.for("IHttpHandler");
})(IHttpHandler || (IHttpHandler = {}));

// src/interfaces/handlers/indexed-db-handler.interface.ts
var IIndexedDBHandler;
((IIndexedDBHandler2) => {
  IIndexedDBHandler2.$ = Symbol.for("IIndexedDBHandler");
})(IIndexedDBHandler || (IIndexedDBHandler = {}));

// src/interfaces/handlers/local-storage-handler.interface.ts
var ILocalStorageHandler;
((ILocalStorageHandler2) => {
  ILocalStorageHandler2.$ = Symbol.for("ILocalStorageHandler");
})(ILocalStorageHandler || (ILocalStorageHandler = {}));

// src/interfaces/handlers/log-handler.interface.ts
var ILogHandler;
((ILogHandler2) => {
  ILogHandler2.$ = Symbol.for("ILogHandler");
})(ILogHandler || (ILogHandler = {}));

// src/interfaces/handlers/slack-webhook-handler.interface.ts
var ISlackWebhookHandler;
((ISlackWebhookHandler2) => {
  ISlackWebhookHandler2.$ = Symbol.for("ISlackWebhookHandler");
})(ISlackWebhookHandler || (ISlackWebhookHandler = {}));

// src/interfaces/handlers/syslog-handler.interface.ts
var ISyslogHandler;
((ISyslogHandler2) => {
  ISyslogHandler2.$ = Symbol.for("ISyslogHandler");
})(ISyslogHandler || (ISyslogHandler = {}));

// src/interfaces/logging/manager.interface.ts
var ILogManager;
((ILogManager2) => {
  ILogManager2.$ = Symbol.for("ILogManager");
})(ILogManager || (ILogManager = {}));

// src/interfaces/logging/logging-service.interface.ts
var ILoggingService;
((ILoggingService2) => {
  ILoggingService2.$ = Symbol.for("ILoggingService");
})(ILoggingService || (ILoggingService = {}));

// src/interfaces/processors/context-log-processor.interface.ts
var IContextLogProcessor;
((IContextLogProcessor2) => {
  IContextLogProcessor2.$ = Symbol.for("IContextLogProcessor");
})(IContextLogProcessor || (IContextLogProcessor = {}));

// src/interfaces/processors/log-processor.interface.ts
var ILogProcessor;
((ILogProcessor2) => {
  ILogProcessor2.$ = Symbol.for("ILogProcessor");
})(ILogProcessor || (ILogProcessor = {}));

// src/interfaces/processors/message-placeholder-processor.interface.ts
var IMessagePlaceholderProcessor;
((IMessagePlaceholderProcessor2) => {
  IMessagePlaceholderProcessor2.$ = Symbol.for("IMessagePlaceholderProcessor");
})(IMessagePlaceholderProcessor || (IMessagePlaceholderProcessor = {}));

// src/interfaces/utils/exception-formatter.interface.ts
var IExceptionFormatter;
((IExceptionFormatter2) => {
  IExceptionFormatter2.$ = Symbol.for("IExceptionFormatter");
})(IExceptionFormatter || (IExceptionFormatter = {}));

export { IConsoleHandler, IContextDehydrating, IContextHydrated, IContextLogProcessor, IContextManagement, IContextManager, IErrorLogHandler, IEventDispatcher, IExceptionFormatter, IFingersCrossedHandler, IHttpHandler, IIndexedDBHandler, IJsonFormatter, ILineFormatter, ILocalStorageHandler, ILogEvent, ILogFormatter, ILogHandler, ILogManager, ILogProcessor, ILoggingChannel, ILoggingService, IMessageLogged, IMessagePlaceholderProcessor, ISimpleFormatter, ISingleChannel, ISlackWebhookHandler, IStackChannel, ISyslogHandler };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map
'use strict';

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/interfaces/context/manager.interface.ts
exports.IContextManager = void 0;
((IContextManager2) => {
  IContextManager2.$ = Symbol.for("IContextManager");
})(exports.IContextManager || (exports.IContextManager = {}));

// src/interfaces/utils/exception-formatter.interface.ts
exports.IExceptionFormatter = void 0;
((IExceptionFormatter2) => {
  IExceptionFormatter2.$ = Symbol.for("IExceptionFormatter");
})(exports.IExceptionFormatter || (exports.IExceptionFormatter = {}));

// src/interfaces/events/dehydrating.interface.ts
exports.IContextDehydrating = void 0;
((IContextDehydrating2) => {
  IContextDehydrating2.$ = Symbol.for("IContextDehydrating");
})(exports.IContextDehydrating || (exports.IContextDehydrating = {}));

// src/interfaces/events/hydrated.interface.ts
exports.IContextHydrated = void 0;
((IContextHydrated2) => {
  IContextHydrated2.$ = Symbol.for("IContextHydrated");
})(exports.IContextHydrated || (exports.IContextHydrated = {}));

// src/interfaces/events/event-dispatcher.interface.ts
exports.IEventDispatcher = void 0;
((IEventDispatcher2) => {
  IEventDispatcher2.$ = Symbol.for("IEventDispatcher");
})(exports.IEventDispatcher || (exports.IEventDispatcher = {}));

// src/interfaces/events/log-event.interface.ts
exports.ILogEvent = void 0;
((ILogEvent2) => {
  ILogEvent2.$ = Symbol.for("ILogEvent");
})(exports.ILogEvent || (exports.ILogEvent = {}));

// src/interfaces/events/message-logged.interface.ts
exports.IMessageLogged = void 0;
((IMessageLogged2) => {
  IMessageLogged2.$ = Symbol.for("IMessageLogged");
})(exports.IMessageLogged || (exports.IMessageLogged = {}));

// src/interfaces/logging/manager.interface.ts
exports.ILogManager = void 0;
((ILogManager2) => {
  ILogManager2.$ = Symbol.for("ILogManager");
})(exports.ILogManager || (exports.ILogManager = {}));

// src/interfaces/logging/logging-service.interface.ts
exports.ILoggingService = void 0;
((ILoggingService2) => {
  ILoggingService2.$ = Symbol.for("ILoggingService");
})(exports.ILoggingService || (exports.ILoggingService = {}));

// src/interfaces/context/management.interface.ts
exports.IContextManagement = void 0;
((IContextManagement2) => {
  IContextManagement2.$ = Symbol.for("IContextManagement");
})(exports.IContextManagement || (exports.IContextManagement = {}));

// src/interfaces/channels/logging-channel.interface.ts
exports.ILoggingChannel = void 0;
((ILoggingChannel2) => {
  ILoggingChannel2.$ = Symbol.for("ILoggingChannel");
})(exports.ILoggingChannel || (exports.ILoggingChannel = {}));

// src/interfaces/channels/single-channel.interface.ts
exports.ISingleChannel = void 0;
((ISingleChannel2) => {
  ISingleChannel2.$ = Symbol.for("ISingleChannel");
})(exports.ISingleChannel || (exports.ISingleChannel = {}));

// src/interfaces/channels/stack-channel.interface.ts
exports.IStackChannel = void 0;
((IStackChannel2) => {
  IStackChannel2.$ = Symbol.for("IStackChannel");
})(exports.IStackChannel || (exports.IStackChannel = {}));

// src/interfaces/handlers/console-handler.interface.ts
exports.IConsoleHandler = void 0;
((IConsoleHandler2) => {
  IConsoleHandler2.$ = Symbol.for("IConsoleHandler");
})(exports.IConsoleHandler || (exports.IConsoleHandler = {}));

// src/interfaces/handlers/error-log-handler.interface.ts
exports.IErrorLogHandler = void 0;
((IErrorLogHandler2) => {
  IErrorLogHandler2.$ = Symbol.for("IErrorLogHandler");
})(exports.IErrorLogHandler || (exports.IErrorLogHandler = {}));

// src/interfaces/handlers/fingers-crossed-handler.interface.ts
exports.IFingersCrossedHandler = void 0;
((IFingersCrossedHandler2) => {
  IFingersCrossedHandler2.$ = Symbol.for("IFingersCrossedHandler");
})(exports.IFingersCrossedHandler || (exports.IFingersCrossedHandler = {}));

// src/interfaces/handlers/http-handler.interface.ts
exports.IHttpHandler = void 0;
((IHttpHandler2) => {
  IHttpHandler2.$ = Symbol.for("IHttpHandler");
})(exports.IHttpHandler || (exports.IHttpHandler = {}));

// src/interfaces/handlers/indexed-db-handler.interface.ts
exports.IIndexedDBHandler = void 0;
((IIndexedDBHandler2) => {
  IIndexedDBHandler2.$ = Symbol.for("IIndexedDBHandler");
})(exports.IIndexedDBHandler || (exports.IIndexedDBHandler = {}));

// src/interfaces/handlers/local-storage-handler.interface.ts
exports.ILocalStorageHandler = void 0;
((ILocalStorageHandler2) => {
  ILocalStorageHandler2.$ = Symbol.for("ILocalStorageHandler");
})(exports.ILocalStorageHandler || (exports.ILocalStorageHandler = {}));

// src/interfaces/handlers/log-handler.interface.ts
exports.ILogHandler = void 0;
((ILogHandler2) => {
  ILogHandler2.$ = Symbol.for("ILogHandler");
})(exports.ILogHandler || (exports.ILogHandler = {}));

// src/interfaces/handlers/slack-webhook-handler.interface.ts
exports.ISlackWebhookHandler = void 0;
((ISlackWebhookHandler2) => {
  ISlackWebhookHandler2.$ = Symbol.for("ISlackWebhookHandler");
})(exports.ISlackWebhookHandler || (exports.ISlackWebhookHandler = {}));

// src/interfaces/handlers/syslog-handler.interface.ts
exports.ISyslogHandler = void 0;
((ISyslogHandler2) => {
  ISyslogHandler2.$ = Symbol.for("ISyslogHandler");
})(exports.ISyslogHandler || (exports.ISyslogHandler = {}));

// src/interfaces/formatters/json-formatter.interface.ts
exports.IJsonFormatter = void 0;
((IJsonFormatter2) => {
  IJsonFormatter2.$ = Symbol.for("IJsonFormatter");
})(exports.IJsonFormatter || (exports.IJsonFormatter = {}));

// src/interfaces/formatters/line-formatter.interface.ts
exports.ILineFormatter = void 0;
((ILineFormatter2) => {
  ILineFormatter2.$ = Symbol.for("ILineFormatter");
})(exports.ILineFormatter || (exports.ILineFormatter = {}));

// src/interfaces/formatters/log-formatter.interface.ts
exports.ILogFormatter = void 0;
((ILogFormatter2) => {
  ILogFormatter2.$ = Symbol.for("ILogFormatter");
})(exports.ILogFormatter || (exports.ILogFormatter = {}));

// src/interfaces/formatters/simple-formatter.interface.ts
exports.ISimpleFormatter = void 0;
((ISimpleFormatter2) => {
  ISimpleFormatter2.$ = Symbol.for("ISimpleFormatter");
})(exports.ISimpleFormatter || (exports.ISimpleFormatter = {}));

// src/interfaces/processors/context-log-processor.interface.ts
exports.IContextLogProcessor = void 0;
((IContextLogProcessor2) => {
  IContextLogProcessor2.$ = Symbol.for("IContextLogProcessor");
})(exports.IContextLogProcessor || (exports.IContextLogProcessor = {}));

// src/interfaces/processors/log-processor.interface.ts
exports.ILogProcessor = void 0;
((ILogProcessor2) => {
  ILogProcessor2.$ = Symbol.for("ILogProcessor");
})(exports.ILogProcessor || (exports.ILogProcessor = {}));

// src/interfaces/processors/message-placeholder-processor.interface.ts
exports.IMessagePlaceholderProcessor = void 0;
((IMessagePlaceholderProcessor2) => {
  IMessagePlaceholderProcessor2.$ = Symbol.for("IMessagePlaceholderProcessor");
})(exports.IMessagePlaceholderProcessor || (exports.IMessagePlaceholderProcessor = {}));
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
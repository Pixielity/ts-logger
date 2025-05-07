# API Reference

This document provides a reference for the ts-log API.

## Core

### LogManager

The `LogManager` class is the main entry point for the ts-log package. It provides methods for logging messages and managing channels.

\`\`\`typescript
import { LogManager, EventDispatcher } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a log manager
const logManager = new LogManager(eventDispatcher)
\`\`\`

#### Methods

- `log(level: LogLevel, message: string, context?: LogContext): void`: Log a message at the specified level
- `debug(message: string, context?: LogContext): void`: Log a debug message
- `info(message: string, context?: LogContext): void`: Log an info message
- `notice(message: string, context?: LogContext): void`: Log a notice message
- `warning(message: string, context?: LogContext): void`: Log a warning message
- `error(message: string, context?: LogContext): void`: Log an error message
- `critical(message: string, context?: LogContext): void`: Log a critical message
- `alert(message: string, context?: LogContext): void`: Log an alert message
- `emergency(message: string, context?: LogContext): void`: Log an emergency message
- `withContext(context: LogContext): ILoggingService`: Add contextual data to all subsequent log messages
- `withoutContext(keys: string[]): ILoggingService`: Remove contextual data from all subsequent log messages
- `shareContext(context: LogContext): void`: Share context across channels
- `flushSharedContext(): void`: Flush shared context
- `channel(name?: string): ILoggingService`: Get the channel with the specified name
- `stack(name: string): ILoggingService`: Get the stack channel with the specified name
- `driver(name?: string): ILoggingService`: Get the driver with the specified name
- `extend(driver: string, callback: (config: any) => ILoggingService): void`: Extend the logging system with a custom driver creator
- `emergency(): ILoggingService`: Get the emergency logger
- `getChannels(): Record<string, ILoggingService>`: Get all registered channels
- `getDefaultChannel(): string`: Get the default channel name
- `setDefaultChannel(name: string): void`: Set the default channel name
- `createChannel(name: string, type: LogChannelType, options?: ChannelOptions): ILoggingService`: Create a channel with the specified configuration
- `createHandler(type: string, options?: HandlerOptions): any`: Create a handler with the specified configuration
- `createFormatter(type: string, options?: FormatterOptions): any`: Create a formatter with the specified configuration
- `createProcessor(type: string, options?: ProcessorOptions): any`: Create a processor with the specified configuration
- `getMinimumLevel(): LogLevel`: Get the minimum log level
- `setMinimumLevel(level: LogLevel): void`: Set the minimum log level

### Logger

The `Logger` class is an implementation of the `ILoggingService` interface. It provides methods for logging messages at different levels and with contextual data.

\`\`\`typescript
import { Logger, EventDispatcher } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a logger
const logger = new Logger(channel, eventDispatcher)
\`\`\`

#### Methods

- `log(level: LogLevel, message: string, context?: LogContext): void`: Log a message at the specified level
- `debug(message: string, context?: LogContext): void`: Log a debug message
- `info(message: string, context?: LogContext): void`: Log an info message
- `notice(message: string, context?: LogContext): void`: Log a notice message
- `warning(message: string, context?: LogContext): void`: Log a warning message
- `error(message: string, context?: LogContext): void`: Log an error message
- `critical(message: string, context?: LogContext): void`: Log a critical message
- `alert(message: string, context?: LogContext): void`: Log an alert message
- `emergency(message: string, context?: LogContext): void`: Log an emergency message
- `withContext(context: LogContext): ILoggingService`: Add contextual data to all subsequent log messages
- `withoutContext(keys: string[]): ILoggingService`: Remove contextual data from all subsequent log messages
- `shareContext(context: LogContext): void`: Share context across channels
- `flushSharedContext(): void`: Flush shared context
- `channel(channel: string): ILoggingService`: Get the channel with the specified name
- `stack(stack: string): ILoggingService`: Get the stack channel with the specified name

## Channels

### StackChannel

The `StackChannel` class is an implementation of the `IStackChannel` interface. It combines multiple channels into a single channel.

\`\`\`typescript
import { StackChannel, EventDispatcher } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a stack channel
const stackChannel = new StackChannel('stack', eventDispatcher)

// Add channels to the stack
stackChannel.addChannel(channel1)
stackChannel.addChannel(channel2)
\`\`\`

#### Methods

- `log(level: LogLevel, message: string, context?: LogContext): void`: Log a message at the specified level
- `withContext(context: LogContext): ILoggingChannel`: Add contextual data to all subsequent log messages
- `withoutContext(keys: string[]): ILoggingChannel`: Remove contextual data from all subsequent log messages
- `getName(): string`: Get the channel name
- `processRecord(record: LogRecord): LogRecord`: Process a log record
- `shareContext(context: LogContext): void`: Share context across channels
- `flushSharedContext(): void`: Flush shared context
- `getChannels(): ILoggingChannel[]`: Get the channels in the stack
- `addChannel(channel: ILoggingChannel): void`: Add a channel to the stack
- `removeChannel(name: string): void`: Remove a channel from the stack
- `hasChannel(name: string): boolean`: Check if the stack contains a channel with the specified name
- `getChannel(name: string): ILoggingChannel | undefined`: Get the channel with the specified name

### SingleChannel

The `SingleChannel` class is an implementation of the `ISingleChannel` interface. It uses a single handler to process log messages.

\`\`\`typescript
import { SingleChannel, ConsoleHandler, LineFormatter, EventDispatcher } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a handler
const handler = new ConsoleHandler()

// Create a formatter
const formatter = new LineFormatter()

// Create a single channel
const singleChannel = new SingleChannel('console', handler, formatter, eventDispatcher)
\`\`\`

#### Methods

- `log(level: LogLevel, message: string, context?: LogContext): void`: Log a message at the specified level
- `withContext(context: LogContext): ISingleChannel`: Add contextual data to all subsequent log messages
- `withoutContext(keys: string[]): ISingleChannel`: Remove contextual data from all subsequent log messages
- `getName(): string`: Get the channel name
- `processRecord(record: LogRecord): LogRecord`: Process a log record
- `shareContext(context: LogContext): void`: Share context across channels
- `flushSharedContext(): void`: Flush shared context
- `getHandler(): ILogHandler`: Get the handler used by the channel
- `setHandler(handler: ILogHandler): void`: Set the handler used by the channel
- `getFormatter(): ILogFormatter`: Get the formatter used by the channel
- `setFormatter(formatter: ILogFormatter): void`: Set the formatter used by the channel
- `getProcessors(): ILogProcessor[]`: Get the processors used by the channel
- `addProcessor(processor: ILogProcessor): void`: Add a processor to the channel
- `removeProcessor(name: string): void`: Remove a processor from the channel

## Handlers

### ConsoleHandler

The `ConsoleHandler` class is an implementation of the `IConsoleHandler` interface. It handles log records by outputting them to the browser console.

\`\`\`typescript
import { ConsoleHandler } from '@xai/ts-log'

// Create a console handler
const consoleHandler = new ConsoleHandler({
  emojiSupport: true,
  colorSupport: true,
})
\`\`\`

#### Methods

- `handle(record: LogRecord): void`: Handle a log record
- `isHandling(record: LogRecord): boolean`: Check if the handler can handle the log record
- `setNext(handler: IConsoleHandler): IConsoleHandler`: Set the next handler in the chain
- `getNext(): IConsoleHandler | null`: Get the next handler in the chain
- `getName(): string`: Get the handler name
- `setEmojiSupport(enabled: boolean): void`: Enable or disable emoji support
- `setColorSupport(enabled: boolean): void`: Enable or disable color support
- `isEmojiSupportEnabled(): boolean`: Get whether emoji support is enabled
- `isColorSupportEnabled(): boolean`: Get whether color support is enabled

### LocalStorageHandler

The `LocalStorageHandler` class is an implementation of the `ILocalStorageHandler` interface. It handles log records by storing them in the browser's localStorage.

\`\`\`typescript
import { LocalStorageHandler } from '@xai/ts-log'

// Create a localStorage handler
const localStorageHandler = new LocalStorageHandler({
  key: 'ts-log',
  maxEntries: 100,
})
\`\`\`

#### Methods

- `handle(record: LogRecord): void`: Handle a log record
- `isHandling(record: LogRecord): boolean`: Check if the handler can handle the log record
- `setNext(handler: ILocalStorageHandler): ILocalStorageHandler`: Set the next handler in the chain
- `getNext(): ILocalStorageHandler | null`: Get the next handler in the chain
- `getName(): string`: Get the handler name
- `getKey(): string`: Get the localStorage key used to store logs
- `setKey(key: string): void`: Set the localStorage key used to store logs
- `getMaxEntries(): number`: Get the maximum number of log entries to store
- `setMaxEntries(maxEntries: number): void`: Set the maximum number of log entries to store
- `getEntries(): any[]`: Get all stored log entries
- `clearEntries(): void`: Clear all stored log entries

### IndexedDBHandler

The `IndexedDBHandler` class is an implementation of the `IIndexedDBHandler` interface. It handles log records by storing them in the browser's IndexedDB.

\`\`\`typescript
import { IndexedDBHandler } from '@xai/ts-log'

// Create an IndexedDB handler
const indexedDBHandler = new IndexedDBHandler({
  databaseName: 'ts-log',
  tableName: 'logs',
  maxEntries: 1000,
})
\`\`\`

#### Methods

- `handle(record: LogRecord): void`: Handle a log record
- `isHandling(record: LogRecord): boolean`: Check if the handler can handle the log record
- `setNext(handler: IIndexedDBHandler): IIndexedDBHandler`: Set the next handler in the chain
- `getNext(): IIndexedDBHandler | null`: Get the next handler in the chain
- `getName(): string`: Get the handler name
- `getDatabaseName(): string`: Get the database name
- `setDatabaseName(name: string): void`: Set the database name
- `getTableName(): string`: Get the table name
- `setTableName(name: string): void`: Set the table name
- `getMaxEntries(): number`: Get the maximum number of log entries to store
- `setMaxEntries(maxEntries: number): void`: Set the maximum number of log entries to store
- `getEntries(): Promise<any[]>`: Get all stored log entries
- `clearEntries(): Promise<void>`: Clear all stored log entries

### HttpHandler

The `HttpHandler` class is an implementation of the `IHttpHandler` interface. It handles log records by sending them to a remote server via HTTP.

\`\`\`typescript
import { HttpHandler } from '@xai/ts-log'

// Create an HTTP handler
const httpHandler = new HttpHandler({
  url: 'https://example.com/logs',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token',
  },
  maxRetries: 3,
})
\`\`\`

#### Methods

- `handle(record: LogRecord): void`: Handle a log record
- `isHandling(record: LogRecord): boolean`: Check if the handler can handle the log record
- `setNext(handler: IHttpHandler): IHttpHandler`: Set the next handler in the chain
- `getNext(): IHttpHandler | null`: Get the next handler in the chain
- `getName(): string`: Get the handler name
- `getUrl(): string`: Get the URL to send log records to
- `setUrl(url: string): void`: Set the URL to send log records to
- `getMethod(): string`: Get the HTTP method to use
- `setMethod(method: string): void`: Set the HTTP method to use
- `getHeaders(): Record<string, string>`: Get the HTTP headers to include in requests
- `setHeaders(headers: Record<string, string>): void`: Set the HTTP headers to include in requests
- `getMaxRetries(): number`: Get the maximum number of retry attempts
- `setMaxRetries(maxRetries: number): void`: Set the maximum number of retry attempts

### SlackWebhookHandler

The `SlackWebhookHandler` class is an implementation of the `ISlackWebhookHandler` interface. It handles log records by sending them to a Slack webhook.

\`\`\`typescript
import { SlackWebhookHandler } from '@xai/ts-log'

// Create a Slack webhook handler
const slackWebhookHandler = new SlackWebhookHandler({
  url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
  channel: '#logs',
  username: 'ts-log',
  iconEmoji: ':memo:',
  emojiSupport: true,
  maxRetries: 3,
})
\`\`\`

#### Methods

- `handle(record: LogRecord): void`: Handle a log record
- `isHandling(record: LogRecord): boolean`: Check if the handler can handle the log record
- `setNext(handler: ISlackWebhookHandler): ISlackWebhookHandler`: Set the next handler in the chain
- `getNext(): ISlackWebhookHandler | null`: Get the next handler in the chain
- `getName(): string`: Get the handler name
- `getUrl(): string`: Get the URL to send log records to
- `setUrl(url: string): void`: Set the URL to send log records to
- `getMethod(): string`: Get the HTTP method to use
- `setMethod(method: string): void`: Set the HTTP method to use
- `getHeaders(): Record<string, string>`: Get the HTTP headers to include in requests
- `setHeaders(headers: Record<string, string>): void`: Set the HTTP headers to include in requests
- `getMaxRetries(): number`: Get the maximum number of retry attempts
- `setMaxRetries(maxRetries: number): void`: Set the maximum number of retry attempts
- `getChannel(): string`: Get the Slack channel to send log records to
- `setChannel(channel: string): void`: Set the Slack channel to send log records to
- `getUsername(): string`: Get the username to use when sending log records
- `setUsername(username: string): void`: Set the username to use when sending log records
- `getIconEmoji(): string`: Get the emoji to use as the icon when sending log records
- `setIconEmoji(emoji: string): void`: Set the emoji to use as the icon when sending log records
- `setEmojiSupport(enabled: boolean): void`: Enable or disable emoji support in log messages
- `isEmojiSupportEnabled(): boolean`: Get whether emoji support is enabled in log messages

## Formatters

### LineFormatter

The `LineFormatter` class is an implementation of the `ILineFormatter` interface. It formats log records as lines of text.

\`\`\`typescript
import { LineFormatter } from '@xai/ts-log'

// Create a line formatter
const lineFormatter = new LineFormatter({
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  emojiSupport: true,
  colorSupport: true,
  stackTraceFormatting: true,
})
\`\`\`

#### Methods

- `format(record: LogRecord): string`: Format a log record
- `formatBatch(records: LogRecord[]): string`: Format a batch of log records
- `getName(): string`: Get the formatter name
- `getDateFormat(): string`: Get the date format
- `setDateFormat(format: string): void`: Set the date format
- `setEmojiSupport(enabled: boolean): void`: Enable or disable emoji support
- `isEmojiSupportEnabled(): boolean`: Get whether emoji support is enabled
- `setColorSupport(enabled: boolean): void`: Enable or disable color support
- `isColorSupportEnabled(): boolean`: Get whether color support is enabled
- `setStackTraceFormatting(enabled: boolean): void`: Enable or disable stack trace formatting
- `isStackTraceFormattingEnabled(): boolean`: Get whether stack trace formatting is enabled

### JsonFormatter

The `JsonFormatter` class is an implementation of the `IJsonFormatter` interface. It formats log records as JSON.

\`\`\`typescript
import { JsonFormatter } from '@xai/ts-log'

// Create a JSON formatter
const jsonFormatter = new JsonFormatter({
  prettyPrint: false,
  stackTraceFormatting: true,
})
\`\`\`

#### Methods

- `format(record: LogRecord): string`: Format a log record
- `formatBatch(records: LogRecord[]): string`: Format a batch of log records
- `getName(): string`: Get the formatter name
- `setPrettyPrint(enabled: boolean): void`: Enable or disable pretty printing
- `isPrettyPrintEnabled(): boolean`: Get whether pretty printing is enabled
- `setStackTraceFormatting(enabled: boolean): void`: Enable or disable stack trace formatting
- `isStackTraceFormattingEnabled(): boolean`: Get whether stack trace formatting is enabled

## Processors

### MessagePlaceholderProcessor

The `MessagePlaceholderProcessor` class is an implementation of the `IMessagePlaceholderProcessor` interface. It replaces placeholders in log messages with context values.

\`\`\`typescript
import { MessagePlaceholderProcessor } from '@xai/ts-log'

// Create a message placeholder processor
const messagePlaceholderProcessor = new MessagePlaceholderProcessor({
  placeholderFormat: '{key}',
  emojiSupport: true,
})
\`\`\`

#### Methods

- `process(record: LogRecord): LogRecord`: Process a log record
- `getName(): string`: Get the processor name
- `setPlaceholderFormat(format: string): void`: Set the placeholder format
- `getPlaceholderFormat(): string`: Get the placeholder format
- `setEmojiSupport(enabled: boolean): void`: Enable or disable emoji support
- `isEmojiSupportEnabled(): boolean`: Get whether emoji support is enabled

### ContextLogProcessor

The `ContextLogProcessor` class is an implementation of the `IContextLogProcessor` interface. It adds contextual data to log records.

\`\`\`typescript
import { ContextLogProcessor } from '@xai/ts-log'

// Create a context log processor
const contextLogProcessor = new ContextLogProcessor()

// Add context
contextLogProcessor.addContext({
  app: 'my-app',
  environment: 'production',
})
\`\`\`

#### Methods

- `process(record: LogRecord): LogRecord`: Process a log record
- `getName(): string`: Get the processor name
- `addContext(context: LogContext): void`: Add contextual data to all subsequent log records
- `removeContext(keys: string[]): void`: Remove contextual data from all subsequent log records
- `getContext(): LogContext`: Get the current context
- `clearContext(): void`: Clear the current context

## Context

###  Get the current context
- `clearContext(): void`: Clear the current context

## Context

### ContextRepository

The `ContextRepository` class is an implementation of the `IContextManagement` interface. It provides methods for managing contextual data.

\`\`\`typescript
import { ContextRepository, EventDispatcher } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a context repository
const contextRepository = new ContextRepository(eventDispatcher)

// Add context
contextRepository.add('userId', 123)
contextRepository.add('username', 'john.doe')

// Get context
const userId = contextRepository.get('userId')
const username = contextRepository.get('username')

// Use scoped context
contextRepository.scope(() => {
  contextRepository.add('transactionId', 'xyz789')
  // transactionId is only available within this scope
})

// transactionId is no longer available
\`\`\`

#### Methods

- `add(key: string, value: any): void`: Add a value to the context
- `get<T>(key: string, defaultValue?: T): T`: Get a value from the context
- `has(key: string): boolean`: Check if the context contains a key
- `forget(key: string): void`: Remove a value from the context
- `addHidden(key: string, value: any): void`: Add a hidden value to the context
- `getHidden<T>(key: string, defaultValue?: T): T`: Get a hidden value from the context
- `hasHidden(key: string): boolean`: Check if the context contains a hidden key
- `forgetHidden(key: string): void`: Remove a hidden value from the context
- `push(key: string, value: any): void`: Push a value onto a stack in the context
- `pop<T>(key: string): T | undefined`: Pop a value from a stack in the context
- `stackContains(key: string, value: any): boolean`: Check if a stack in the context contains a value
- `increment(key: string, amount?: number): number`: Increment a counter in the context
- `decrement(key: string, amount?: number): number`: Decrement a counter in the context
- `scope<T>(callback: () => T): T`: Create a scoped context
- `dehydrate(): Record<string, any>`: Dehydrate the context to a serializable object
- `hydrate(data: Record<string, any>): void`: Hydrate the context from a serialized object
- `all(): LogContext`: Get all context data
- `clear(): void`: Clear all context data

## Events

### EventDispatcher

The `EventDispatcher` class is an implementation of the `IEventDispatcher` interface. It provides methods for dispatching events and managing event listeners.

\`\`\`typescript
import { EventDispatcher } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Add a listener
eventDispatcher.addListener('message.logged', (event) => {
  console.log('Message logged:', event.getData())
})

// Dispatch an event
eventDispatcher.dispatch(new MessageLoggedEvent(level, message, context))
\`\`\`

#### Methods

- `dispatch(event: ILogEvent): void`: Dispatch an event
- `addListener(eventName: string, listener: LogListener): void`: Add a listener for an event
- `removeListener(eventName: string, listener: LogListener): void`: Remove a listener for an event
- `getListeners(eventName: string): LogListener[]`: Get all listeners for an event
- `hasListeners(eventName: string): boolean`: Check if an event has listeners
- `clearListeners(eventName: string): void`: Remove all listeners for an event

### MessageLoggedEvent

The `MessageLoggedEvent` class is an implementation of the `IMessageLogged` interface. It represents an event that is dispatched when a message is logged.

\`\`\`typescript
import { MessageLoggedEvent, LogLevel } from '@xai/ts-log'

// Create a message logged event
const event = new MessageLoggedEvent(
  LogLevel.INFO,
  'Hello, world!',
  { userId: 123 },
  undefined,
  'console'
)

// Get event data
const level = event.getLevel()
const message = event.getMessage()
const context = event.getContext()
const stack = event.getStack()
const channel = event.getChannel()
\`\`\`

#### Methods

- `getName(): string`: Get the event name
- `getData(): Record<string, any>`: Get the event data
- `getTimestamp(): Date`: Get the event timestamp
- `getLevel(): LogLevel`: Get the log level
- `getMessage(): string`: Get the log message
- `getContext(): LogContext`: Get the log context
- `getStack(): string | undefined`: Get the stack trace
- `getChannel(): string`: Get the channel name

## Utils

### ContextManager

The `ContextManager` class is an implementation of the `IContextManager` interface. It provides methods for managing contextual data across components.

\`\`\`typescript
import { ContextManager, ContextRepository, EventDispatcher } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a context repository
const contextRepository = new ContextRepository(eventDispatcher)

// Create a context manager
const contextManager = new ContextManager(contextRepository)

// Add context
contextManager.addContext({ userId: 123, username: 'john.doe' })

// Get context
const context = contextManager.getContext()

// Create a scoped context manager
const scopedManager = contextManager.createScope()
scopedManager.addContext({ transactionId: 'xyz789' })

// Merge context from another manager
contextManager.merge(scopedManager)
\`\`\`

#### Methods

- `addContext(context: LogContext): void`: Add contextual data
- `removeContext(keys: string[]): void`: Remove contextual data
- `getContext(): LogContext`: Get all contextual data
- `clearContext(): void`: Clear all contextual data
- `createScope(): IContextManager`: Create a scoped context manager
- `merge(manager: IContextManager): void`: Merge contextual data from another context manager

### ExceptionFormatter

The `ExceptionFormatter` class is an implementation of the `IExceptionFormatter` interface. It provides methods for formatting exceptions.

\`\`\`typescript
import { ExceptionFormatter } from '@xai/ts-log'

// Create an exception formatter
const exceptionFormatter = new ExceptionFormatter({
  colorSupport: true,
})

// Format an exception
try {
  throw new Error('Something went wrong')
} catch (error) {
  if (error instanceof Error) {
    const formatted = exceptionFormatter.format(error)
    console.log(formatted)
  }
}
\`\`\`

#### Methods

- `format(exception: Error): string`: Format an exception
- `getStackTrace(exception: Error): string`: Get the stack trace from an exception
- `setColorSupport(enabled: boolean): void`: Enable or disable color support
- `isColorSupportEnabled(): boolean`: Get whether color support is enabled

## Next Steps

- [Installation](./installation.md): Learn how to install the ts-log package
- [Configuration](./configuration.md): Learn how to configure the ts-log package
- [Context](./context.md): Learn how to use the context repository

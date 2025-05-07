# ts-log

A TypeScript logging library for client-side applications, with a focus on Next.js and React environments.

## Features

- **Multiple Log Levels**: Support for eight log levels (emergency, alert, critical, error, warning, notice, info, debug) with level-specific emojis and colors.
- **Multiple Log Channels**: Console, localStorage, IndexedDB, HTTP, Slack, and more.
- **Stackable Channels**: Combine multiple channels into a single channel.
- **Contextual Data**: Add contextual data to log entries.
- **Context Repository**: Manage contextual data with key-value storage, hidden context, stacks, counters, and scoped context.
- **Event System**: Dispatch events for logging, context dehydration, and context hydration.
- **Formatters**: Format log records as lines of text, JSON, or custom formats.
- **Processors**: Process log records to replace placeholders or add contextual data.
- **Dependency Injection**: Use Inversify for dependency injection.
- **Type Safety**: Full TypeScript support with DDD-structured interfaces.

## Installation

\`\`\`bash
npm install @xai/ts-log
\`\`\`

## Usage

### Basic Usage

\`\`\`typescript
import { LogManager, EventDispatcher, ConsoleHandler, LineFormatter, LogLevel } from "@xai/ts-log"

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a log manager
const logManager = new LogManager(eventDispatcher)

// Log a message
logManager.info("Hello, world!")

// Log a message with context
logManager.info("User logged in", { userId: 123, username: "john.doe" })

// Log a message with a specific level
logManager.log(LogLevel.ERROR, "Something went wrong", { error: "Invalid input" })
\`\`\`

### Using Channels

\`\`\`typescript
import { LogManager, EventDispatcher, ConsoleHandler, LocalStorageHandler, LineFormatter, JsonFormatter } from "@xai/ts-log"

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a log manager
const logManager = new LogManager(eventDispatcher)

// Create a console channel
const consoleChannel = logManager.createChannel("console", "console", {
  handler: new ConsoleHandler({ emojiSupport: true, colorSupport: true }),
  formatter: new LineFormatter({ emojiSupport: true, colorSupport: true }),
})

// Create a localStorage channel
const localStorageChannel = logManager.createChannel("localStorage", "localStorage", {
  handler: new LocalStorageHandler({ key: "ts-log", maxEntries: 100 }),
  formatter: new JsonFormatter({ prettyPrint: false }),
})

// Log a message to the console channel
logManager.channel("console").info("Hello, console!")

// Log a message to the localStorage channel
logManager.channel("localStorage").info("Hello, localStorage!")

// Log a message to the default channel
logManager.info("Hello, default channel!")
\`\`\`

### Using Context

\`\`\`typescript
import { LogManager, EventDispatcher, ContextRepository } from "@xai/ts-log"

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a context repository
const contextRepository = new ContextRepository(eventDispatcher)

// Create a log manager
const logManager = new LogManager(eventDispatcher)

// Add context to the repository
contextRepository.add("userId", 123)
contextRepository.add("username", "john.doe")

// Log a message with the context
logManager.info("User logged in")

// Add context to the logger
logManager.withContext({ sessionId: "abc123" }).info("Session started")

// Remove context from the logger
logManager.withoutContext(["sessionId"]).info("Session ended")

// Use scoped context
contextRepository.scope(() => {
  contextRepository.add("transactionId", "xyz789")
  logManager.info("Transaction started")
  // transactionId is only available within this scope
})

// transactionId is no longer available
logManager.info("After transaction")
\`\`\`

## Configuration

The ts-log package can be configured via the `loggingConfig` object:

\`\`\`typescript
import { loggingConfig, LogLevel, LogChannelType } from "@xai/ts-log"

// Set the default channel
loggingConfig.default = "console"

// Set the minimum log level
loggingConfig.minimumLevel = LogLevel.INFO

// Configure channels
loggingConfig.channels = {
  console: {
    type: LogChannelType.CONSOLE,
    handler: {
      type: "console",
      emojiSupport: true,
      colorSupport: true,
    },
    formatter: {
      type: "line",
      dateFormat: "YYYY-MM-DD HH:mm:ss",
      emojiSupport: true,
      colorSupport: true,
    },
    processors: [
      {
        type: "message-placeholder",
        placeholderFormat: "{key}",
        emojiSupport: true,
      },
      {
        type: "context",
      },
    ],
  },
  // Add more channels here
}
\`\`\`

## License

MIT

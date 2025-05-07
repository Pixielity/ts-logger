# Configuration

This guide will help you configure the ts-log package for your project.

## Basic Configuration

The ts-log package can be configured via the `loggingConfig` object:

\`\`\`typescript
import { loggingConfig, LogLevel, LogChannelType } from '@xai/ts-log'

// Set the default channel
loggingConfig.default = 'console'

// Set the minimum log level
loggingConfig.minimumLevel = LogLevel.INFO

// Configure channels
loggingConfig.channels = {
  console: {
    type: LogChannelType.CONSOLE,
    handler: {
      type: 'console',
      emojiSupport: true,
      colorSupport: true,
    },
    formatter: {
      type: 'line',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      emojiSupport: true,
      colorSupport: true,
      stackTraceFormatting: true,
    },
    processors: [
      {
        type: 'message-placeholder',
        placeholderFormat: '{key}',
        emojiSupport: true,
      },
      {
        type: 'context',
      },
    ],
  },
  // Add more channels here
}
\`\`\`

## Log Levels

The ts-log package supports the following log levels, in order of severity:

1. `LogLevel.EMERGENCY`: System is unusable
2. `LogLevel.ALERT`: Action must be taken immediately
3. `LogLevel.CRITICAL`: Critical conditions
4. `LogLevel.ERROR`: Error conditions
5. `LogLevel.WARNING`: Warning conditions
6. `LogLevel.NOTICE`: Normal but significant condition
7. `LogLevel.INFO`: Informational messages
8. `LogLevel.DEBUG`: Debug-level messages

You can set the minimum log level to filter out less severe log messages:

\`\`\`typescript
import { loggingConfig, LogLevel } from '@xai/ts-log'

// Only log messages with a severity of WARNING or higher
loggingConfig.minimumLevel = LogLevel.WARNING
\`\`\`

## Channels

Channels determine where log messages are sent. The ts-log package supports the following channel types:

- `LogChannelType.CONSOLE`: Output to the browser console
- `LogChannelType.LOCAL_STORAGE`: Store in the browser's localStorage
- `LogChannelType.INDEXED_DB`: Store in the browser's IndexedDB
- `LogChannelType.HTTP`: Send to a remote server via HTTP
- `LogChannelType.SLACK`: Send to a Slack webhook
- `LogChannelType.ERROR_LOG`: Output to the browser's error log
- `LogChannelType.SYSLOG`: Output in syslog format (browser-compatible)
- `LogChannelType.STACK`: Combine multiple channels

You can configure multiple channels and set a default channel:

\`\`\`typescript
import { loggingConfig, LogChannelType } from '@xai/ts-log'

// Configure channels
loggingConfig.channels = {
  console: {
    type: LogChannelType.CONSOLE,
    // ...
  },
  localStorage: {
    type: LogChannelType.LOCAL_STORAGE,
    // ...
  },
  stack: {
    type: LogChannelType.STACK,
    channels: ['console', 'localStorage'],
  },
}

// Set the default channel
loggingConfig.default = 'stack'
\`\`\`

## Handlers

Handlers determine how log messages are processed. Each channel has a handler that processes log messages:

\`\`\`typescript
import { loggingConfig, LogChannelType } from '@xai/ts-log'

// Configure a channel with a handler
loggingConfig.channels.console = {
  type: LogChannelType.CONSOLE,
  handler: {
    type: 'console',
    emojiSupport: true,
    colorSupport: true,
  },
  // ...
}
\`\`\`

## Formatters

Formatters determine how log messages are formatted. Each channel has a formatter that formats log messages:

\`\`\`typescript
import { loggingConfig, LogChannelType } from '@xai/ts-log'

// Configure a channel with a formatter
loggingConfig.channels.console = {
  type: LogChannelType.CONSOLE,
  // ...
  formatter: {
    type: 'line',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    emojiSupport: true,
    colorSupport: true,
    stackTraceFormatting: true,
  },
  // ...
}
\`\`\`

## Processors

Processors modify log messages before they are handled. Each channel can have multiple processors:

\`\`\`typescript
import { loggingConfig, LogChannelType } from '@xai/ts-log'

// Configure a channel with processors
loggingConfig.channels.console = {
  type: LogChannelType.CONSOLE,
  // ...
  processors: [
    {
      type: 'message-placeholder',
      placeholderFormat: '{key}',
      emojiSupport: true,
    },
    {
      type: 'context',
    },
  ],
}
\`\`\`

## Emoji and Colors

The ts-log package supports emoji and colors for log messages:

\`\`\`typescript
import { loggingConfig } from '@xai/ts-log'

// Configure emoji support
loggingConfig.emoji = {
  enabled: true,
  levels: {
    emergency: '🚨',
    alert: '🔔',
    critical: '❗',
    error: '🔴',
    warning: '⚠️',
    notice: '📝',
    info: '✅',
    debug: '🛠️',
  },
}

// Configure color support
loggingConfig.color = {
  enabled: true,
  levels: {
    emergency: '#FF0000', // Red
    alert: '#FF4500', // OrangeRed
    critical: '#FF8C00', // DarkOrange
    error: '#FFA500', // Orange
    warning: '#FFD700', // Gold
    notice: '#1E90FF', // DodgerBlue
    info: '#32CD32', // LimeGreen
    debug: '#808080', // Gray
  },
}
\`\`\`

## Programmatic Configuration

You can also configure the ts-log package programmatically:

\`\`\`typescript
import { 
  LogManager, 
  EventDispatcher, 
  ConsoleHandler, 
  LocalStorageHandler, 
  LineFormatter, 
  JsonFormatter, 
  MessagePlaceholderProcessor, 
  ContextLogProcessor 
} from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a log manager
const logManager = new LogManager(eventDispatcher)

// Create handlers
const consoleHandler = new ConsoleHandler({
  emojiSupport: true,
  colorSupport: true,
})

const localStorageHandler = new LocalStorageHandler({
  key: 'ts-log',
  maxEntries: 100,
})

// Create formatters
const lineFormatter = new LineFormatter({
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  emojiSupport: true,
  colorSupport: true,
  stackTraceFormatting: true,
})

const jsonFormatter = new JsonFormatter({
  prettyPrint: false,
  stackTraceFormatting: true,
})

// Create processors
const messagePlaceholderProcessor = new MessagePlaceholderProcessor({
  placeholderFormat: '{key}',
  emojiSupport: true,
})

const contextLogProcessor = new ContextLogProcessor()

// Create channels
const consoleChannel = logManager.createChannel('console', 'console', {
  handler: consoleHandler,
  formatter: lineFormatter,
  processors: [messagePlaceholderProcessor, contextLogProcessor],
})

const localStorageChannel = logManager.createChannel('localStorage', 'localStorage', {
  handler: localStorageHandler,
  formatter: jsonFormatter,
  processors: [messagePlaceholderProcessor, contextLogProcessor],
})

// Set the default channel
logManager.setDefaultChannel('console')
\`\`\`

## Next Steps

- [Context](./context.md): Learn how to use the context repository
- [API](./api.md): Learn about the ts-log API

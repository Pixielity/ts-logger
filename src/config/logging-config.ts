import { LogLevel } from '../enums/log-level.enum'
import { DateFormat } from '../enums/date-format.enum'
import { HandlerType } from '../enums/handler-type.enum'
import { FormatterType } from '../enums/formatter-type.enum'
import { ProcessorType } from '../enums/processor-type.enum'
import { LogChannelType } from '../enums/log-channel-type.enum'

/**
 * Configuration for the ts-log package.
 * This file contains the default configuration for channels, handlers, formatters, processors, emojis, and colors.
 */
export const loggingConfig = {
  /**
   * The default channel to use
   */
  default: 'console',

  /**
   * The minimum log level to record
   */
  minimumLevel: LogLevel.DEBUG,

  /**
   * The channels configuration
   */
  channels: {
    console: {
      type: LogChannelType.CONSOLE,
      handler: {
        type: HandlerType.CONSOLE,
        emojiSupport: true,
        colorSupport: true,
      },
      formatter: {
        type: FormatterType.LINE,
        dateFormat: DateFormat.YYYY_MM_DD_HH_MM_SS,
        emojiSupport: true,
        colorSupport: true,
        stackTraceFormatting: true,
      },
      processors: [
        {
          type: ProcessorType.MESSAGE_PLACEHOLDER,
          placeholderFormat: '{key}',
          emojiSupport: true,
        },
        {
          type: ProcessorType.CONTEXT,
        },
      ],
    },
    localStorage: {
      type: LogChannelType.LOCAL_STORAGE,
      handler: {
        type: HandlerType.LOCAL_STORAGE,
        key: 'ts-log',
        maxEntries: 100,
      },
      formatter: {
        type: FormatterType.JSON,
        prettyPrint: false,
        stackTraceFormatting: true,
      },
      processors: [
        {
          type: ProcessorType.MESSAGE_PLACEHOLDER,
          placeholderFormat: '{key}',
          emojiSupport: true,
        },
        {
          type: ProcessorType.CONTEXT,
        },
      ],
    },
    indexedDB: {
      type: LogChannelType.INDEXED_DB,
      handler: {
        type: HandlerType.INDEXED_DB,
        databaseName: 'ts-log',
        tableName: 'logs',
        maxEntries: 1000,
      },
      formatter: {
        type: FormatterType.JSON,
        prettyPrint: false,
        stackTraceFormatting: true,
      },
      processors: [
        {
          type: ProcessorType.MESSAGE_PLACEHOLDER,
          placeholderFormat: '{key}',
          emojiSupport: true,
        },
        {
          type: ProcessorType.CONTEXT,
        },
      ],
    },
    slack: {
      type: LogChannelType.SLACK,
      handler: {
        type: HandlerType.SLACK,
        url: '',
        channel: '#logs',
        username: 'ts-log',
        iconEmoji: ':memo:',
        emojiSupport: true,
        maxRetries: 3,
      },
      formatter: {
        type: FormatterType.LINE,
        dateFormat: DateFormat.YYYY_MM_DD_HH_MM_SS,
        emojiSupport: true,
        colorSupport: false,
        stackTraceFormatting: true,
      },
      processors: [
        {
          type: ProcessorType.MESSAGE_PLACEHOLDER,
          placeholderFormat: '{key}',
          emojiSupport: true,
        },
        {
          type: ProcessorType.CONTEXT,
        },
      ],
    },
    errorLog: {
      type: LogChannelType.ERROR_LOG,
      handler: {
        type: HandlerType.ERROR_LOG,
        emojiSupport: true,
      },
      formatter: {
        type: FormatterType.SIMPLE,
        emojiSupport: true,
        colorSupport: false,
      },
      processors: [
        {
          type: ProcessorType.MESSAGE_PLACEHOLDER,
          placeholderFormat: '{key}',
          emojiSupport: true,
        },
        {
          type: ProcessorType.CONTEXT,
        },
      ],
    },
    syslog: {
      type: LogChannelType.SYSLOG,
      handler: {
        type: HandlerType.SYSLOG,
        facility: 16, // local0
        appName: 'ts-log',
        procId: 'browser',
      },
      formatter: {
        type: FormatterType.LINE,
        dateFormat: DateFormat.YYYY_MM_DD_HH_MM_SS,
        emojiSupport: false,
        colorSupport: false,
        stackTraceFormatting: true,
      },
      processors: [
        {
          type: ProcessorType.MESSAGE_PLACEHOLDER,
          placeholderFormat: '{key}',
          emojiSupport: false,
        },
        {
          type: ProcessorType.CONTEXT,
        },
      ],
    },
    stack: {
      type: LogChannelType.STACK,
      channels: ['console', 'localStorage'],
    },
  },

  /**
   * Emoji configuration
   */
  emoji: {
    enabled: true,
    levels: {
      [LogLevel.EMERGENCY]: '🚨',
      [LogLevel.ALERT]: '🔔',
      [LogLevel.CRITICAL]: '❗',
      [LogLevel.ERROR]: '🔴',
      [LogLevel.WARNING]: '⚠️',
      [LogLevel.NOTICE]: '📝',
      [LogLevel.INFO]: '✅',
      [LogLevel.DEBUG]: '🛠️',
    },
  },

  /**
   * Color configuration
   */
  color: {
    enabled: true,
    levels: {
      [LogLevel.EMERGENCY]: '#FF0000', // Red
      [LogLevel.ALERT]: '#FF4500', // OrangeRed
      [LogLevel.CRITICAL]: '#FF8C00', // DarkOrange
      [LogLevel.ERROR]: '#FFA500', // Orange
      [LogLevel.WARNING]: '#FFD700', // Gold
      [LogLevel.NOTICE]: '#1E90FF', // DodgerBlue
      [LogLevel.INFO]: '#32CD32', // LimeGreen
      [LogLevel.DEBUG]: '#808080', // Gray
    },
  },
}

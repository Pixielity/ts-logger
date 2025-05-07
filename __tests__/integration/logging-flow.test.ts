import { LogManager } from '../../src/manager'
import { EventDispatcher } from '../../src/events/event-dispatcher'
import { ConsoleHandler } from '../../src/handlers/console-handler'
import { LineFormatter } from '../../src/formatters/line-formatter'
import { MessagePlaceholderProcessor } from '../../src/processors/message-placeholder-processor'
import { ContextLogProcessor } from '../../src/processors/context-log-processor'
import { SingleChannel } from '../../src/channels/single-channel'
import { LogLevel } from '../../src/enums/log-level.enum'

describe('Logging Flow Integration', () => {
  let logManager: LogManager
  let eventDispatcher: EventDispatcher
  let consoleHandler: ConsoleHandler
  let lineFormatter: LineFormatter
  let messagePlaceholderProcessor: MessagePlaceholderProcessor
  let contextLogProcessor: ContextLogProcessor
  let singleChannel: SingleChannel

  beforeEach(() => {
    // Mock console.log
    console.log = jest.fn()

    // Create components
    eventDispatcher = new EventDispatcher()
    consoleHandler = new ConsoleHandler({ emojiSupport: true, colorSupport: true })
    lineFormatter = new LineFormatter({ emojiSupport: true, colorSupport: true })
    messagePlaceholderProcessor = new MessagePlaceholderProcessor()
    contextLogProcessor = new ContextLogProcessor({ app: 'test-app' })

    // Create channel
    singleChannel = new SingleChannel('console', consoleHandler, lineFormatter)

    // Add processors to channel
    singleChannel.addProcessor(messagePlaceholderProcessor)
    singleChannel.addProcessor(contextLogProcessor)

    // Create log manager
    logManager = new LogManager(eventDispatcher)

    // Add channel to log manager
    Object.defineProperty(logManager, 'channels', {
      value: {
        console: {
          log: jest.fn().mockImplementation((level, message, context) => {
            singleChannel.log(level, message, context)
          }),
          debug: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.DEBUG, message, context)
          }),
          info: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.INFO, message, context)
          }),
          notice: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.NOTICE, message, context)
          }),
          warning: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.WARNING, message, context)
          }),
          error: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.ERROR, message, context)
          }),
          critical: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.CRITICAL, message, context)
          }),
          alert: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.ALERT, message, context)
          }),
          emergency: jest.fn().mockImplementation((message, context) => {
            singleChannel.log(LogLevel.EMERGENCY, message, context)
          }),
          withContext: jest.fn().mockReturnThis(),
          withoutContext: jest.fn().mockReturnThis(),
          shareContext: jest.fn(),
          flushSharedContext: jest.fn(),
          channel: jest.fn().mockReturnThis(),
          stack: jest.fn().mockReturnThis(),
        },
      },
      writable: true,
    })

    // Set default channel
    Object.defineProperty(logManager, 'defaultChannel', {
      value: 'console',
      writable: true,
    })
  })

  test('should log a message through the entire flow', () => {
    // Add event listener
    const eventListener = jest.fn()
    eventDispatcher.addListener('message.logged', eventListener)

    // Log a message
    logManager.info('Hello, {name}!', { name: 'John' })

    // Verify event listener was called
    expect(eventListener).toHaveBeenCalled()

    // Verify console.log was called with the formatted message
    expect(console.log).toHaveBeenCalled()

    // The message should have been processed by the processors
    const consoleLogCall = (console.log as jest.Mock).mock.calls[0][0]
    expect(consoleLogCall).toContain('Hello, John!')
    expect(consoleLogCall).toContain('[INFO]')
  })

  test('should add context to all subsequent log messages', () => {
    // Add context
    logManager.withContext({ userId: 123 })

    // Log a message
    logManager.info('User logged in')

    // Verify console.log was called with the context
    expect(console.log).toHaveBeenCalled()

    // The context should have been included in the log message
    const consoleLogCall = (console.log as jest.Mock).mock.calls[0][0]
    expect(consoleLogCall).toContain('User logged in')
    expect(consoleLogCall).toContain('userId')
    expect(consoleLogCall).toContain('123')
  })

  test('should handle errors and log them appropriately', () => {
    // Log an error
    logManager.error('An error occurred', {
      error: new Error('Test error'),
      code: 500,
    })

    // Verify console.log was called with the error information
    expect(console.log).toHaveBeenCalled()

    // The error should have been included in the log message
    const consoleLogCall = (console.log as jest.Mock).mock.calls[0][0]
    expect(consoleLogCall).toContain('An error occurred')
    expect(consoleLogCall).toContain('[ERROR]')
    expect(consoleLogCall).toContain('Test error')
    expect(consoleLogCall).toContain('500')
  })
})

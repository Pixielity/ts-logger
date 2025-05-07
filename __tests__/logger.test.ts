import { Logger } from '../src/logger'
import { LogLevel } from '../src/enums/log-level.enum'
import { MessageLoggedEvent } from '../src/events/message-logged.event'
import type { ILoggingChannel } from '../src/interfaces/channels/logging-channel.interface'
import type { IEventDispatcher } from '../src/interfaces/events/event-dispatcher.interface'

describe('Logger', () => {
  let logger: Logger
  let mockChannel: jest.Mocked<ILoggingChannel>
  let mockEventDispatcher: jest.Mocked<IEventDispatcher>

  beforeEach(() => {
    // Create mock channel
    mockChannel = {
      log: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
      withoutContext: jest.fn().mockReturnThis(),
      getName: jest.fn().mockReturnValue('test-channel'),
      processRecord: jest.fn().mockImplementation((record) => record),
      shareContext: jest.fn(),
      flushSharedContext: jest.fn(),
    }

    // Create mock event dispatcher
    mockEventDispatcher = {
      dispatch: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      getListeners: jest.fn().mockReturnValue([]),
      hasListeners: jest.fn().mockReturnValue(false),
      clearListeners: jest.fn(),
    }

    // Create logger instance
    logger = new Logger(mockChannel, mockEventDispatcher)
  })

  test('should log a message at the specified level', () => {
    const level = LogLevel.INFO
    const message = 'Test message'
    const context = { key: 'value' }

    logger.log(level, message, context)

    // Verify channel.log was called with correct parameters
    expect(mockChannel.log).toHaveBeenCalledWith(level, message, context)

    // Verify event dispatcher dispatched a MessageLoggedEvent
    expect(mockEventDispatcher.dispatch).toHaveBeenCalledWith(expect.any(MessageLoggedEvent))
  })

  test('should log a debug message', () => {
    const message = 'Debug message'
    const context = { key: 'value' }

    logger.debug(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.DEBUG, message, context)
  })

  test('should log an info message', () => {
    const message = 'Info message'
    const context = { key: 'value' }

    logger.info(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.INFO, message, context)
  })

  test('should log a notice message', () => {
    const message = 'Notice message'
    const context = { key: 'value' }

    logger.notice(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.NOTICE, message, context)
  })

  test('should log a warning message', () => {
    const message = 'Warning message'
    const context = { key: 'value' }

    logger.warning(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.WARNING, message, context)
  })

  test('should log an error message', () => {
    const message = 'Error message'
    const context = { key: 'value' }

    logger.error(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.ERROR, message, context)
  })

  test('should log a critical message', () => {
    const message = 'Critical message'
    const context = { key: 'value' }

    logger.critical(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.CRITICAL, message, context)
  })

  test('should log an alert message', () => {
    const message = 'Alert message'
    const context = { key: 'value' }

    logger.alert(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.ALERT, message, context)
  })

  test('should log an emergency message', () => {
    const message = 'Emergency message'
    const context = { key: 'value' }

    logger.emergency(message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(LogLevel.EMERGENCY, message, context)
  })

  test('should add context to all subsequent log messages', () => {
    const context = { userId: 123, username: 'john.doe' }
    const message = 'Test message'

    logger.withContext(context).info(message)

    // The context should be merged with the message context
    expect(mockChannel.log).toHaveBeenCalledWith(
      LogLevel.INFO,
      message,
      expect.objectContaining(context),
    )
  })

  test('should remove context from all subsequent log messages', () => {
    const initialContext = { userId: 123, username: 'john.doe', sessionId: 'abc123' }
    const keysToRemove = ['sessionId']
    const message = 'Test message'

    // Add initial context
    logger.withContext(initialContext)

    // Remove some context keys
    logger.withoutContext(keysToRemove).info(message)

    // The context should not contain the removed keys
    expect(mockChannel.log).toHaveBeenCalledWith(
      LogLevel.INFO,
      message,
      expect.not.objectContaining({ sessionId: 'abc123' }),
    )
  })

  test('should share context across channels', () => {
    const context = { userId: 123, username: 'john.doe' }

    logger.shareContext(context)

    expect(mockChannel.shareContext).toHaveBeenCalledWith(context)
  })

  test('should flush shared context', () => {
    logger.flushSharedContext()

    expect(mockChannel.flushSharedContext).toHaveBeenCalled()
  })

  test('should throw error when calling channel method', () => {
    expect(() => logger.channel('test')).toThrow(
      'Method not implemented in Logger. Use LogManager.channel() instead.',
    )
  })

  test('should throw error when calling stack method', () => {
    expect(() => logger.stack('test')).toThrow(
      'Method not implemented in Logger. Use LogManager.stack() instead.',
    )
  })
})

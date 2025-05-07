import { SingleChannel } from '../../src/channels/single-channel'
import { LogLevel } from '../../src/enums/log-level.enum'
import type { ILogHandler } from '../../src/interfaces/handlers/log-handler.interface'
import type { ILogFormatter } from '../../src/interfaces/formatters/log-formatter.interface'
import type { ILogProcessor } from '../../src/interfaces/processors/log-processor.interface'
import type { IEventDispatcher } from '../../src/interfaces/events/event-dispatcher.interface'
import type { LogRecord } from '../../src/types'

describe('SingleChannel', () => {
  let singleChannel: SingleChannel
  let mockHandler: jest.Mocked<ILogHandler>
  let mockFormatter: jest.Mocked<ILogFormatter>
  let mockProcessor: jest.Mocked<ILogProcessor>
  let mockEventDispatcher: jest.Mocked<IEventDispatcher>

  beforeEach(() => {
    // Create mock handler
    mockHandler = {
      handle: jest.fn(),
      isHandling: jest.fn().mockReturnValue(true),
      setNext: jest.fn().mockReturnThis(),
      getNext: jest.fn().mockReturnValue(null),
      getName: jest.fn().mockReturnValue('mock-handler'),
    }

    // Create mock formatter
    mockFormatter = {
      format: jest.fn().mockReturnValue('formatted message'),
      formatBatch: jest.fn().mockReturnValue('formatted batch'),
      getName: jest.fn().mockReturnValue('mock-formatter'),
    }

    // Create mock processor
    mockProcessor = {
      process: jest.fn().mockImplementation((record) => record),
      getName: jest.fn().mockReturnValue('mock-processor'),
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

    // Create single channel instance
    singleChannel = new SingleChannel('test-channel', mockHandler, mockFormatter)

    // Add processor
    singleChannel.addProcessor(mockProcessor)
  })

  test('should log a message at the specified level', () => {
    const level = LogLevel.INFO
    const message = 'Test message'
    const context = { key: 'value' }

    singleChannel.log(level, message, context)

    // Verify processor.process was called
    expect(mockProcessor.process).toHaveBeenCalled()

    // Verify handler.isHandling was called
    expect(mockHandler.isHandling).toHaveBeenCalled()

    // Verify handler.handle was called
    expect(mockHandler.handle).toHaveBeenCalled()
  })

  test('should add context to all subsequent log messages', () => {
    const context = { userId: 123, username: 'john.doe' }
    const message = 'Test message'

    singleChannel.withContext(context).log(LogLevel.INFO, message)

    // The context should be merged with the message context
    expect(mockProcessor.process).toHaveBeenCalledWith(
      expect.objectContaining({
        context: expect.objectContaining(context),
      }),
    )
  })

  test('should remove context from all subsequent log messages', () => {
    const initialContext = { userId: 123, username: 'john.doe', sessionId: 'abc123' }
    const keysToRemove = ['sessionId']
    const message = 'Test message'

    // Add initial context
    singleChannel.withContext(initialContext)

    // Remove some context keys
    singleChannel.withoutContext(keysToRemove).log(LogLevel.INFO, message)

    // The context should not contain the removed keys
    expect(mockProcessor.process).toHaveBeenCalledWith(
      expect.objectContaining({
        context: expect.not.objectContaining({ sessionId: 'abc123' }),
      }),
    )
  })

  test('should get the channel name', () => {
    expect(singleChannel.getName()).toBe('test-channel')
  })

  test('should process a log record', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: { key: 'value' },
      datetime: new Date(),
    }

    const result = singleChannel.processRecord(record)

    expect(mockProcessor.process).toHaveBeenCalledWith(record)
    expect(result).toEqual(record) // Since our mock just returns the record
  })

  test('should share context across channels', () => {
    const context = { userId: 123, username: 'john.doe' }

    singleChannel.shareContext(context)

    // Verify the context was added
    singleChannel.log(LogLevel.INFO, 'Test message')
    expect(mockProcessor.process).toHaveBeenCalledWith(
      expect.objectContaining({
        context: expect.objectContaining(context),
      }),
    )
  })

  test('should flush shared context', () => {
    // Add context
    singleChannel.shareContext({ userId: 123 })

    // Flush context
    singleChannel.flushSharedContext()

    // Verify the context was flushed
    singleChannel.log(LogLevel.INFO, 'Test message')
    expect(mockProcessor.process).toHaveBeenCalledWith(
      expect.not.objectContaining({
        context: expect.objectContaining({ userId: 123 }),
      }),
    )
  })

  test('should get and set the handler', () => {
    const newHandler: ILogHandler = {
      handle: jest.fn(),
      isHandling: jest.fn().mockReturnValue(true),
      setNext: jest.fn().mockReturnThis(),
      getNext: jest.fn().mockReturnValue(null),
      getName: jest.fn().mockReturnValue('new-handler'),
    }

    expect(singleChannel.getHandler()).toBe(mockHandler)

    singleChannel.setHandler(newHandler)

    expect(singleChannel.getHandler()).toBe(newHandler)
  })

  test('should get and set the formatter', () => {
    const newFormatter: ILogFormatter = {
      format: jest.fn().mockReturnValue('new formatted message'),
      formatBatch: jest.fn().mockReturnValue('new formatted batch'),
      getName: jest.fn().mockReturnValue('new-formatter'),
    }

    expect(singleChannel.getFormatter()).toBe(mockFormatter)

    singleChannel.setFormatter(newFormatter)

    expect(singleChannel.getFormatter()).toBe(newFormatter)
  })

  test('should get the processors', () => {
    expect(singleChannel.getProcessors()).toContain(mockProcessor)
  })

  test('should add a processor', () => {
    const newProcessor: ILogProcessor = {
      process: jest.fn().mockImplementation((record) => record),
      getName: jest.fn().mockReturnValue('new-processor'),
    }

    singleChannel.addProcessor(newProcessor)

    expect(singleChannel.getProcessors()).toContain(newProcessor)
  })

  test('should remove a processor', () => {
    singleChannel.removeProcessor('mock-processor')

    expect(singleChannel.getProcessors()).not.toContain(mockProcessor)
  })
})

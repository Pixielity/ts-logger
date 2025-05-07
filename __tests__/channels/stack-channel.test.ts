import { StackChannel } from '../../src/channels/stack-channel'
import { LogLevel } from '../../src/enums/log-level.enum'
import type { ILoggingChannel } from '../../src/interfaces/channels/logging-channel.interface'
import type { IEventDispatcher } from '../../src/interfaces/events/event-dispatcher.interface'
import type { LogRecord } from '../../src/types'

describe('StackChannel', () => {
  let stackChannel: StackChannel
  let mockChannel1: jest.Mocked<ILoggingChannel>
  let mockChannel2: jest.Mocked<ILoggingChannel>
  let mockEventDispatcher: jest.Mocked<IEventDispatcher>

  beforeEach(() => {
    // Create mock channels
    mockChannel1 = {
      log: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
      withoutContext: jest.fn().mockReturnThis(),
      getName: jest.fn().mockReturnValue('channel1'),
      processRecord: jest.fn().mockImplementation((record) => record),
      shareContext: jest.fn(),
      flushSharedContext: jest.fn(),
    }

    mockChannel2 = {
      log: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
      withoutContext: jest.fn().mockReturnThis(),
      getName: jest.fn().mockReturnValue('channel2'),
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

    // Create stack channel instance
    stackChannel = new StackChannel('test-stack', mockEventDispatcher)

    // Add channels to the stack
    stackChannel.addChannel(mockChannel1)
    stackChannel.addChannel(mockChannel2)
  })

  test('should log a message at the specified level to all channels', () => {
    const level = LogLevel.INFO
    const message = 'Test message'
    const context = { key: 'value' }

    stackChannel.log(level, message, context)

    // Verify both channels logged the message
    expect(mockChannel1.log).toHaveBeenCalledWith(level, message, context)
    expect(mockChannel2.log).toHaveBeenCalledWith(level, message, context)
  })

  test('should add context to all subsequent log messages for all channels', () => {
    const context = { userId: 123, username: 'john.doe' }

    stackChannel.withContext(context)

    // Verify the context was added to the stack channel
    stackChannel.log(LogLevel.INFO, 'Test message')

    // The context should be merged with the message context for both channels
    expect(mockChannel1.log).toHaveBeenCalledWith(
      LogLevel.INFO,
      'Test message',
      expect.objectContaining(context),
    )
    expect(mockChannel2.log).toHaveBeenCalledWith(
      LogLevel.INFO,
      'Test message',
      expect.objectContaining(context),
    )
  })

  test('should remove context from all subsequent log messages for all channels', () => {
    const initialContext = { userId: 123, username: 'john.doe', sessionId: 'abc123' }
    const keysToRemove = ['sessionId']

    // Add initial context
    stackChannel.withContext(initialContext)

    // Remove some context keys
    stackChannel.withoutContext(keysToRemove)

    // Verify the context was updated
    stackChannel.log(LogLevel.INFO, 'Test message')

    // The context should not contain the removed keys for both channels
    expect(mockChannel1.log).toHaveBeenCalledWith(
      LogLevel.INFO,
      'Test message',
      expect.not.objectContaining({ sessionId: 'abc123' }),
    )
    expect(mockChannel2.log).toHaveBeenCalledWith(
      LogLevel.INFO,
      'Test message',
      expect.not.objectContaining({ sessionId: 'abc123' }),
    )
  })

  test('should get the channel name', () => {
    expect(stackChannel.getName()).toBe('test-stack')
  })

  test('should process a log record through all channels', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: { key: 'value' },
      datetime: new Date(),
    }

    const result = stackChannel.processRecord(record)

    // Verify both channels processed the record
    expect(mockChannel1.processRecord).toHaveBeenCalledWith(record)
    expect(mockChannel2.processRecord).toHaveBeenCalledWith(expect.any(Object))
    expect(result).toBeDefined()
  })

  test('should share context across all channels', () => {
    const context = { userId: 123, username: 'john.doe' }

    stackChannel.shareContext(context)

    // Verify context was shared with all channels
    expect(mockChannel1.shareContext).toHaveBeenCalledWith(context)
    expect(mockChannel2.shareContext).toHaveBeenCalledWith(context)
  })

  test('should flush shared context for all channels', () => {
    stackChannel.flushSharedContext()

    // Verify shared context was flushed for all channels
    expect(mockChannel1.flushSharedContext).toHaveBeenCalled()
    expect(mockChannel2.flushSharedContext).toHaveBeenCalled()
  })

  test('should get the channels in the stack', () => {
    const channels = stackChannel.getChannels()

    expect(channels).toContain(mockChannel1)
    expect(channels).toContain(mockChannel2)
    expect(channels.length).toBe(2)
  })

  test('should add a channel to the stack', () => {
    const newChannel: ILoggingChannel = {
      log: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
      withoutContext: jest.fn().mockReturnThis(),
      getName: jest.fn().mockReturnValue('new-channel'),
      processRecord: jest.fn().mockImplementation((record) => record),
      shareContext: jest.fn(),
      flushSharedContext: jest.fn(),
    }

    stackChannel.addChannel(newChannel)

    expect(stackChannel.getChannels()).toContain(newChannel)
    expect(stackChannel.getChannels().length).toBe(3)
  })

  test('should remove a channel from the stack', () => {
    stackChannel.removeChannel('channel1')

    expect(stackChannel.getChannels()).not.toContain(mockChannel1)
    expect(stackChannel.getChannels()).toContain(mockChannel2)
    expect(stackChannel.getChannels().length).toBe(1)
  })

  test('should check if the stack contains a channel with the specified name', () => {
    expect(stackChannel.hasChannel('channel1')).toBe(true)
    expect(stackChannel.hasChannel('channel2')).toBe(true)
    expect(stackChannel.hasChannel('non-existent')).toBe(false)
  })

  test('should get the channel with the specified name', () => {
    expect(stackChannel.getChannel('channel1')).toBe(mockChannel1)
    expect(stackChannel.getChannel('channel2')).toBe(mockChannel2)
    expect(stackChannel.getChannel('non-existent')).toBeUndefined()
  })
})

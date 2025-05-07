import { LogManager } from '../src/manager'
import { LogLevel } from '../src/enums/log-level.enum'
import { LogChannelType } from '../src/enums/log-channel-type.enum'
import type { IEventDispatcher } from '../src/interfaces/events/event-dispatcher.interface'
import type { ILoggingService } from '../src/interfaces/logging/logging-service.interface'

declare var jest: any

describe('LogManager', () => {
  let logManager: LogManager
  let mockEventDispatcher: jest.Mocked<IEventDispatcher>
  let mockChannel: jest.Mocked<ILoggingService>

  beforeEach(() => {
    // Create mock event dispatcher
    mockEventDispatcher = {
      dispatch: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      getListeners: jest.fn().mockReturnValue([]),
      hasListeners: jest.fn().mockReturnValue(false),
      clearListeners: jest.fn(),
    }

    // Create mock channel
    mockChannel = {
      log: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      notice: jest.fn(),
      warning: jest.fn(),
      error: jest.fn(),
      critical: jest.fn(),
      alert: jest.fn(),
      emergency: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
      withoutContext: jest.fn().mockReturnThis(),
      shareContext: jest.fn(),
      flushSharedContext: jest.fn(),
      channel: jest.fn().mockReturnThis(),
      stack: jest.fn().mockReturnThis(),
    }

    // Create log manager instance
    logManager = new LogManager(mockEventDispatcher)

    // Mock the channels property
    Object.defineProperty(logManager, 'channels', {
      value: {
        default: mockChannel,
        test: mockChannel,
      },
      writable: true,
    })

    // Mock the defaultChannel property
    Object.defineProperty(logManager, 'defaultChannel', {
      value: 'default',
      writable: true,
    })
  })

  test('should log a message at the specified level', () => {
    const level = LogLevel.INFO
    const message = 'Test message'
    const context = { key: 'value' }

    logManager.log(level, message, context)

    expect(mockChannel.log).toHaveBeenCalledWith(level, message, context)
  })

  test('should log a debug message', () => {
    const message = 'Debug message'
    const context = { key: 'value' }

    logManager.debug(message, context)

    expect(mockChannel.debug).toHaveBeenCalledWith(message, context)
  })

  test('should log an info message', () => {
    const message = 'Info message'
    const context = { key: 'value' }

    logManager.info(message, context)

    expect(mockChannel.info).toHaveBeenCalledWith(message, context)
  })

  test('should log a notice message', () => {
    const message = 'Notice message'
    const context = { key: 'value' }

    logManager.notice(message, context)

    expect(mockChannel.notice).toHaveBeenCalledWith(message, context)
  })

  test('should log a warning message', () => {
    const message = 'Warning message'
    const context = { key: 'value' }

    logManager.warning(message, context)

    expect(mockChannel.warning).toHaveBeenCalledWith(message, context)
  })

  test('should log an error message', () => {
    const message = 'Error message'
    const context = { key: 'value' }

    logManager.error(message, context)

    expect(mockChannel.error).toHaveBeenCalledWith(message, context)
  })

  test('should log a critical message', () => {
    const message = 'Critical message'
    const context = { key: 'value' }

    logManager.critical(message, context)

    expect(mockChannel.critical).toHaveBeenCalledWith(message, context)
  })

  test('should log an alert message', () => {
    const message = 'Alert message'
    const context = { key: 'value' }

    logManager.alert(message, context)

    expect(mockChannel.alert).toHaveBeenCalledWith(message, context)
  })

  test('should log an emergency message', () => {
    const message = 'Emergency message'
    const context = { key: 'value' }

    logManager.emergency(message, context)

    expect(mockChannel.emergency).toHaveBeenCalledWith(message, context)
  })

  test('should add context to all subsequent log messages', () => {
    const context = { userId: 123, username: 'john.doe' }

    logManager.withContext(context)

    expect(mockChannel.withContext).toHaveBeenCalledWith(context)
  })

  test('should remove context from all subsequent log messages', () => {
    const keysToRemove = ['sessionId']

    logManager.withoutContext(keysToRemove)

    expect(mockChannel.withoutContext).toHaveBeenCalledWith(keysToRemove)
  })

  test('should share context across channels', () => {
    const context = { userId: 123, username: 'john.doe' }

    logManager.shareContext(context)

    expect(mockChannel.shareContext).toHaveBeenCalledWith(context)
  })

  test('should flush shared context', () => {
    logManager.flushSharedContext()

    expect(mockChannel.flushSharedContext).toHaveBeenCalled()
  })

  test('should get the channel with the specified name', () => {
    const channelName = 'test'

    const result = logManager.channel(channelName)

    expect(result).toBe(mockChannel)
  })

  test('should get the default channel when no name is specified', () => {
    const result = logManager.channel()

    expect(result).toBe(mockChannel)
  })

  test('should throw an error when getting a non-existent channel', () => {
    const channelName = 'non-existent'

    expect(() => logManager.channel(channelName)).toThrow(`Channel [${channelName}] not found.`)
  })

  test('should get the stack channel with the specified name', () => {
    const stackName = 'test'

    const result = logManager.stack(stackName)

    expect(result).toBe(mockChannel)
  })

  test('should get the driver with the specified name', () => {
    const driverName = 'test'

    const result = logManager.driver(driverName)

    expect(result).toBe(mockChannel)
  })

  test('should extend the logging system with a custom driver creator', () => {
    const driverName = 'custom'
    const driverCreator = jest.fn().mockReturnValue(mockChannel)

    logManager.extend(driverName, driverCreator)

    // Verify the driver creator was registered
    expect((logManager as any).customDrivers[driverName]).toBe(driverCreator)
  })

  test('should get the emergency logger', () => {
    const result = logManager.emergency('')

    expect(result).toBe(mockChannel)
  })

  test('should get all registered channels', () => {
    const result = logManager.getChannels()

    expect(result).toEqual({
      default: mockChannel,
      test: mockChannel,
    })
  })

  test('should get the default channel name', () => {
    const result = logManager.getDefaultChannel()

    expect(result).toBe('default')
  })

  test('should set the default channel name', () => {
    const channelName = 'test'

    logManager.setDefaultChannel(channelName)

    expect(logManager.getDefaultChannel()).toBe(channelName)
  })

  test('should throw an error when setting a non-existent channel as default', () => {
    const channelName = 'non-existent'

    expect(() => logManager.setDefaultChannel(channelName)).toThrow(
      `Channel [${channelName}] not found.`,
    )
  })

  test('should create a channel with the specified configuration', () => {
    const channelName = 'new-channel'
    const channelType = LogChannelType.CONSOLE
    const options = { key: 'value' }

    const result = logManager.createChannel(channelName, channelType, options)

    expect(result).toBeDefined()
    expect(logManager.getChannels()[channelName]).toBeDefined()
  })

  test('should get and set the minimum log level', () => {
    const level = LogLevel.WARNING

    logManager.setMinimumLevel(level)

    expect(logManager.getMinimumLevel()).toBe(level)
  })
})

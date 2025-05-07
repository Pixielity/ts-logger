import { LocalStorageHandler } from '../../src/handlers/local-storage-handler'
import { LogLevel } from '../../src/enums/log-level.enum'
import type { LogRecord } from '../../src/types'

describe('LocalStorageHandler', () => {
  let localStorageHandler: LocalStorageHandler
  let mockLocalStorage: {
    getItem: jest.Mock
    setItem: jest.Mock
    removeItem: jest.Mock
  }

  beforeEach(() => {
    mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(JSON.stringify([])),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    }

    // Attach mock localStorage to globalThis (universal context)
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })

    localStorageHandler = new LocalStorageHandler({
      key: 'test-logs',
      maxEntries: 5,
    })
  })

  test('should handle a log record', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: { key: 'value' },
      datetime: new Date(),
    }

    localStorageHandler.handle(record)

    // Verify localStorage.getItem was called
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-logs')

    // Verify localStorage.setItem was called
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-logs', expect.any(String))
  })

  test('should trim entries if maxEntries is exceeded', () => {
    // Mock localStorage to return an array with maxEntries + 1 items
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([
        { level: 'info', message: 'Log 1' },
        { level: 'info', message: 'Log 2' },
        { level: 'info', message: 'Log 3' },
        { level: 'info', message: 'Log 4' },
        { level: 'info', message: 'Log 5' },
      ]),
    )

    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: {},
      datetime: new Date(),
    }

    localStorageHandler.handle(record)

    // Verify localStorage.setItem was called with a trimmed array
    const setItemCall = mockLocalStorage.setItem.mock.calls[0]
    const savedEntries = JSON.parse(setItemCall[1])
    expect(savedEntries.length).toBe(5) // maxEntries
    expect(savedEntries[4].message).toBe('Test message') // New entry is at the end
  })

  test('should check if the handler can handle the log record', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: {},
      datetime: new Date(),
    }

    const result = localStorageHandler.isHandling(record)

    expect(result).toBe(true)
  })

  test('should set and get the next handler in the chain', () => {
    const nextHandler = new LocalStorageHandler()

    localStorageHandler.setNext(nextHandler)

    expect(localStorageHandler.getNext()).toBe(nextHandler)
  })

  test('should get the handler name', () => {
    expect(localStorageHandler.getName()).toBe('localStorage')
  })

  test('should get and set the localStorage key', () => {
    expect(localStorageHandler.getKey()).toBe('test-logs')

    localStorageHandler.setKey('new-key')

    expect(localStorageHandler.getKey()).toBe('new-key')
  })

  test('should get and set the maximum number of log entries', () => {
    expect(localStorageHandler.getMaxEntries()).toBe(5)

    localStorageHandler.setMaxEntries(10)

    expect(localStorageHandler.getMaxEntries()).toBe(10)
  })

  test('should get all stored log entries', () => {
    const mockEntries = [
      { level: 'info', message: 'Log 1' },
      { level: 'info', message: 'Log 2' },
    ]
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockEntries))

    const entries = localStorageHandler.getEntries()

    expect(entries).toEqual(mockEntries)
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-logs')
  })

  test('should clear all stored log entries', () => {
    localStorageHandler.clearEntries()

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-logs')
  })
})

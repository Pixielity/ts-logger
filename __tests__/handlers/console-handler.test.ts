import { ConsoleHandler } from '../../src/handlers/console-handler'
import { LogLevel } from '../../src/enums/log-level.enum'
import type { LogRecord } from '../../src/types'
import { jest } from '@jest/globals'

describe('ConsoleHandler', () => {
  let consoleHandler: ConsoleHandler
  let originalConsoleLog: any

  beforeEach(() => {
    // Save original console.log
    originalConsoleLog = console.log
    // Mock console.log
    console.log = jest.fn()

    // Create console handler instance
    consoleHandler = new ConsoleHandler({
      emojiSupport: true,
      colorSupport: true,
    })
  })

  afterEach(() => {
    // Restore original console.log
    console.log = originalConsoleLog
  })

  test('should handle a log record', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: { key: 'value' },
      datetime: new Date(),
    }

    consoleHandler.handle(record)

    // Verify console.log was called
    expect(console.log).toHaveBeenCalled()
  })

  test('should handle a log record with stack trace', () => {
    const record: LogRecord = {
      level: LogLevel.ERROR,
      levelName: 'ERROR',
      message: 'Error message',
      context: { key: 'value' },
      datetime: new Date(),
      stack: 'Error stack trace',
    }

    consoleHandler.handle(record)

    // Verify console.log was called for the stack trace
    expect(console.log).toHaveBeenCalledWith('Stack trace:', 'Error stack trace')
  })

  test('should check if the handler can handle the log record', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: {},
      datetime: new Date(),
    }

    const result = consoleHandler.isHandling(record)

    expect(result).toBe(true)
  })

  test('should set and get the next handler in the chain', () => {
    const nextHandler = new ConsoleHandler()

    consoleHandler.setNext(nextHandler)

    expect(consoleHandler.getNext()).toBe(nextHandler)
  })

  test('should get the handler name', () => {
    expect(consoleHandler.getName()).toBe('console')
  })

  test('should enable and disable emoji support', () => {
    consoleHandler.setEmojiSupport(false)
    expect(consoleHandler.isEmojiSupportEnabled()).toBe(false)

    consoleHandler.setEmojiSupport(true)
    expect(consoleHandler.isEmojiSupportEnabled()).toBe(true)
  })

  test('should enable and disable color support', () => {
    consoleHandler.setColorSupport(false)
    expect(consoleHandler.isColorSupportEnabled()).toBe(false)

    consoleHandler.setColorSupport(true)
    expect(consoleHandler.isColorSupportEnabled()).toBe(true)
  })
})

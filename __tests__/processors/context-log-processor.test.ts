import { ContextLogProcessor } from '../../src/processors/context-log-processor'
import { LogLevel } from '../../src/enums/log-level.enum'
import type { LogRecord } from '../../src/types'

describe('ContextLogProcessor', () => {
  let processor: ContextLogProcessor

  beforeEach(() => {
    // Create processor instance with initial context
    processor = new ContextLogProcessor({
      app: 'test-app',
      environment: 'test',
    })
  })

  test('should process a log record by adding context', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: {
        userId: 123,
      },
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify the processor's context was merged with the record's context
    expect(result.context).toEqual({
      app: 'test-app',
      environment: 'test',
      userId: 123,
    })
  })

  test('should add context to all subsequent log records', () => {
    const newContext = {
      requestId: 'abc123',
      sessionId: 'xyz789',
    }

    processor.addContext(newContext)

    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: {},
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify the new context was added
    expect(result.context).toEqual({
      app: 'test-app',
      environment: 'test',
      requestId: 'abc123',
      sessionId: 'xyz789',
    })
  })

  test('should remove context from all subsequent log records', () => {
    const keysToRemove = ['app']

    processor.removeContext(keysToRemove)

    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: {},
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify the specified keys were removed
    expect(result.context).toEqual({
      environment: 'test',
    })
  })

  test('should get the current context', () => {
    const context = processor.getContext()

    expect(context).toEqual({
      app: 'test-app',
      environment: 'test',
    })
  })

  test('should clear the current context', () => {
    processor.clearContext()

    const context = processor.getContext()

    expect(context).toEqual({})
  })

  test('should get the processor name', () => {
    expect(processor.getName()).toBe('context')
  })
})

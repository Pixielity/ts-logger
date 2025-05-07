import { MessagePlaceholderProcessor } from '../../src/processors/message-placeholder-processor'
import { LogLevel } from '../../src/enums/log-level.enum'
import type { LogRecord } from '../../src/types'

describe('MessagePlaceholderProcessor', () => {
  let processor: MessagePlaceholderProcessor

  beforeEach(() => {
    // Create processor instance
    processor = new MessagePlaceholderProcessor({
      placeholderFormat: '{key}',
      emojiSupport: true,
    })
  })

  test('should process a log record with placeholders', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Hello, {name}! Your user ID is {userId}.',
      context: {
        name: 'John',
        userId: 123,
      },
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify placeholders were replaced
    expect(result.message).toBe('Hello, John! Your user ID is 123.')
  })

  test('should handle missing context values', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Hello, {name}! Your user ID is {userId}.',
      context: {
        name: 'John',
        // userId is missing
      },
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify placeholders were replaced, with missing values as empty strings
    expect(result.message).toBe('Hello, John! Your user ID is .')
  })

  test('should handle object context values', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'User data: {userData}',
      context: {
        userData: { name: 'John', age: 30 },
      },
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify object was stringified
    expect(result.message).toBe('User data: {"name":"John","age":30}')
  })

  test('should handle null and undefined context values', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Null: {nullValue}, Undefined: {undefinedValue}',
      context: {
        nullValue: null,
        undefinedValue: undefined,
      },
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify null and undefined values are replaced with empty strings
    expect(result.message).toBe('Null: , Undefined: ')
  })

  test('should get the processor name', () => {
    expect(processor.getName()).toBe('messagePlaceholder')
  })

  test('should get and set the placeholder format', () => {
    expect(processor.getPlaceholderFormat()).toBe('{key}')

    processor.setPlaceholderFormat('{{key}}')

    expect(processor.getPlaceholderFormat()).toBe('{{key}}')

    // Test with the new format
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Hello, {{name}}!',
      context: {
        name: 'John',
      },
      datetime: new Date(),
    }

    const result = processor.process(record)

    // Verify placeholders were replaced with the new format
    expect(result.message).toBe('Hello, John!')
  })

  test('should enable and disable emoji support', () => {
    expect(processor.isEmojiSupportEnabled()).toBe(true)

    processor.setEmojiSupport(false)

    expect(processor.isEmojiSupportEnabled()).toBe(false)
  })
})

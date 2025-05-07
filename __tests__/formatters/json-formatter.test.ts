import { JsonFormatter } from '../../src/formatters/json-formatter'
import { LogLevel } from '../../src/enums/log-level.enum'
import type { LogRecord } from '../../src/types'

describe('JsonFormatter', () => {
  let jsonFormatter: JsonFormatter

  beforeEach(() => {
    // Create JSON formatter instance
    jsonFormatter = new JsonFormatter({
      prettyPrint: false,
      stackTraceFormatting: true,
    })
  })

  test('should format a log record as JSON', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: { key: 'value' },
      datetime: new Date('2023-01-01T12:00:00Z'),
    }

    const result = jsonFormatter.format(record)

    // Parse the result to verify it's valid JSON
    const parsed = JSON.parse(result)

    // Verify the parsed JSON contains the expected fields
    expect(parsed.level).toBe(LogLevel.INFO)
    expect(parsed.levelName).toBe('INFO')
    expect(parsed.message).toBe('Test message')
    expect(parsed.context).toEqual({ key: 'value' })
    expect(parsed.datetime).toBe('2023-01-01T12:00:00.000Z')
  })

  test('should format a log record with stack trace', () => {
    const record: LogRecord = {
      level: LogLevel.ERROR,
      levelName: 'ERROR',
      message: 'Error message',
      context: {},
      datetime: new Date('2023-01-01T12:00:00Z'),
      stack: 'Error stack trace',
    }

    const result = jsonFormatter.format(record)

    // Parse the result to verify it's valid JSON
    const parsed = JSON.parse(result)

    // Verify the parsed JSON contains the stack trace
    expect(parsed.stack).toBe('Error stack trace')
  })

  test('should format a batch of log records as JSON', () => {
    const records: LogRecord[] = [
      {
        level: LogLevel.INFO,
        levelName: 'INFO',
        message: 'Info message',
        context: {},
        datetime: new Date('2023-01-01T12:00:00Z'),
      },
      {
        level: LogLevel.ERROR,
        levelName: 'ERROR',
        message: 'Error message',
        context: {},
        datetime: new Date('2023-01-01T12:01:00Z'),
      },
    ]

    const result = jsonFormatter.formatBatch(records)

    // Parse the result to verify it's valid JSON
    const parsed = JSON.parse(result)

    // Verify the parsed JSON is an array with the expected records
    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed.length).toBe(2)
    expect(parsed[0].message).toBe('Info message')
    expect(parsed[1].message).toBe('Error message')
  })

  test('should get the formatter name', () => {
    expect(jsonFormatter.getName()).toBe('json')
  })

  test('should enable and disable pretty printing', () => {
    expect(jsonFormatter.isPrettyPrintEnabled()).toBe(false)

    jsonFormatter.setPrettyPrint(true)

    expect(jsonFormatter.isPrettyPrintEnabled()).toBe(true)

    // Test pretty printing format
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: { key: 'value' },
      datetime: new Date('2023-01-01T12:00:00Z'),
    }

    const result = jsonFormatter.format(record)

    // Verify the result contains newlines and indentation
    expect(result).toContain('\n')
    expect(result).toContain('  ')
  })

  test('should enable and disable stack trace formatting', () => {
    expect(jsonFormatter.isStackTraceFormattingEnabled()).toBe(true)

    jsonFormatter.setStackTraceFormatting(false)

    expect(jsonFormatter.isStackTraceFormattingEnabled()).toBe(false)

    // Test that stack trace is not included when formatting is disabled
    const record: LogRecord = {
      level: LogLevel.ERROR,
      levelName: 'ERROR',
      message: 'Error message',
      context: {},
      datetime: new Date('2023-01-01T12:00:00Z'),
      stack: 'Error stack trace',
    }

    const result = jsonFormatter.format(record)
    const parsed = JSON.parse(result)

    // Verify the parsed JSON does not contain the stack trace
    expect(parsed.stack).toBeUndefined()
  })
})

import { LineFormatter } from '../../src/formatters/line-formatter'
import { LogLevel } from '../../src/enums/log-level.enum'
import { DateFormat } from '../../src/enums/date-format.enum'
import type { LogRecord } from '../../src/types'

describe('LineFormatter', () => {
  let lineFormatter: LineFormatter

  beforeEach(() => {
    // Create line formatter instance
    lineFormatter = new LineFormatter({
      dateFormat: DateFormat.YYYY_MM_DD_HH_MM_SS,
      emojiSupport: true,
      colorSupport: true,
      stackTraceFormatting: true,
    })
  })

  test('should format a log record', () => {
    const record: LogRecord = {
      level: LogLevel.INFO,
      levelName: 'INFO',
      message: 'Test message',
      context: { key: 'value' },
      datetime: new Date('2023-01-01T12:00:00Z'),
    }

    const result = lineFormatter.format(record)

    // Verify the result contains the expected parts
    expect(result).toContain('[2023-01-01 12:00:00]')
    expect(result).toContain('[INFO]')
    expect(result).toContain('Test message')
    expect(result).toContain('{"key":"value"}')
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

    const result = lineFormatter.format(record)

    // Verify the result contains the stack trace
    expect(result).toContain('Error stack trace')
  })

  test('should format a batch of log records', () => {
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

    const result = lineFormatter.formatBatch(records)

    // Verify the result contains both records
    expect(result).toContain('Info message')
    expect(result).toContain('Error message')
    expect(result.split('\n').length).toBe(2)
  })

  test('should get the formatter name', () => {
    expect(lineFormatter.getName()).toBe('line')
  })

  test('should get and set the date format', () => {
    expect(lineFormatter.getDateFormat()).toBe(DateFormat.YYYY_MM_DD_HH_MM_SS)

    lineFormatter.setDateFormat(DateFormat.ISO8601)

    expect(lineFormatter.getDateFormat()).toBe(DateFormat.ISO8601)

    // Test setting a custom date format
    lineFormatter.setDateFormat('YYYY/MM/DD')

    expect(lineFormatter.getDateFormat()).toBe('YYYY/MM/DD')
  })

  test('should enable and disable emoji support', () => {
    expect(lineFormatter.isEmojiSupportEnabled()).toBe(true)

    lineFormatter.setEmojiSupport(false)

    expect(lineFormatter.isEmojiSupportEnabled()).toBe(false)
  })

  test('should enable and disable color support', () => {
    expect(lineFormatter.isColorSupportEnabled()).toBe(true)

    lineFormatter.setColorSupport(false)

    expect(lineFormatter.isColorSupportEnabled()).toBe(false)
  })

  test('should enable and disable stack trace formatting', () => {
    expect(lineFormatter.isStackTraceFormattingEnabled()).toBe(true)

    lineFormatter.setStackTraceFormatting(false)

    expect(lineFormatter.isStackTraceFormattingEnabled()).toBe(false)
  })
})

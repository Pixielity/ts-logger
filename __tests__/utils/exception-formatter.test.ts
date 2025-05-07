import { ExceptionFormatter } from '../../src/utils/exception-formatter'

describe('ExceptionFormatter', () => {
  let exceptionFormatter: ExceptionFormatter

  beforeEach(() => {
    // Create exception formatter instance
    exceptionFormatter = new ExceptionFormatter({
      colorSupport: true,
    })
  })

  test('should format an exception', () => {
    const error = new Error('Test error')

    const result = exceptionFormatter.format(error)

    // Verify the result contains the error message
    expect(result).toContain('Error: Test error')
    // Verify the result contains the stack trace
    expect(result).toContain('at ')
  })

  test('should get the stack trace from an exception', () => {
    const error = new Error('Test error')

    const result = exceptionFormatter.getStackTrace(error)

    // Verify the result contains the stack trace
    expect(result).toContain('at ')
  })

  test('should enable and disable color support', () => {
    expect(exceptionFormatter.isColorSupportEnabled()).toBe(true)

    exceptionFormatter.setColorSupport(false)

    expect(exceptionFormatter.isColorSupportEnabled()).toBe(false)
  })

  test('should format an exception with color support', async () => {
    const error = new Error('Test error')

    // Enable color support
    exceptionFormatter.setColorSupport(true)

    const result = exceptionFormatter.format(error)

    // Verify the result contains the color formatting
    expect((await result).startsWith('%c')).toBe(true)
  })

  test('should format an exception without color support', async () => {
    const error = new Error('Test error')

    // Disable color support
    exceptionFormatter.setColorSupport(false)

    const result = exceptionFormatter.format(error)

    // Verify the result does not contain the color formatting
    expect((await result).startsWith('%c')).toBe(false)
  })
})

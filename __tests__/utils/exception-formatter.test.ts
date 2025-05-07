import { ExceptionFormatter } from '../../src/utils/exception-formatter'

describe('ExceptionFormatter', () => {
  let exceptionFormatter: ExceptionFormatter

  beforeEach(() => {
    // Create a new instance before each test
    exceptionFormatter = new ExceptionFormatter({
      colorSupport: true,
    })
  })

  test('should format an exception', async () => {
    const error = new Error('Test error')

    // Await the result because `.format` is async
    const result = await exceptionFormatter.format(error)

    // Expect error message to be part of the result
    expect(result).toContain('Error: Test error')
    // Expect at least one stack trace line to exist
    expect(result).toContain('at ')
  })

  test('should get the stack trace from an exception', async () => {
    const error = new Error('Test error')

    // Await the result because `.getStackTrace` is async
    const result = await exceptionFormatter.getStackTrace(error)

    // Validate the stack trace content
    expect(result).toContain('at ')
  })

  test('should enable and disable color support', () => {
    // Confirm color is enabled by default (via constructor)
    expect(exceptionFormatter.isColorSupportEnabled()).toBe(true)

    // Disable color
    exceptionFormatter.setColorSupport(false)

    // Confirm it is now disabled
    expect(exceptionFormatter.isColorSupportEnabled()).toBe(false)
  })

  test('should format an exception with color support', async () => {
    const error = new Error('Test error')

    // Explicitly enable color support
    exceptionFormatter.setColorSupport(true)

    const result = await exceptionFormatter.format(error)

    // If color is supported, the result should start with %c
    expect(result.startsWith('%c')).toBe(true)
  })

  test('should format an exception without color support', async () => {
    const error = new Error('Test error')

    // Disable color support
    exceptionFormatter.setColorSupport(false)

    const result = await exceptionFormatter.format(error)

    // No %c should be present at the start
    expect(result.startsWith('%c')).toBe(false)
  })
})

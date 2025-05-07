import { EventDispatcher } from '../../src/events/event-dispatcher'
import { MessageLoggedEvent } from '../../src/events/message-logged.event'
import { LogLevel } from '../../src/enums/log-level.enum'

describe('EventDispatcher', () => {
  let eventDispatcher: EventDispatcher

  beforeEach(() => {
    // Create event dispatcher instance
    eventDispatcher = new EventDispatcher()
  })

  test('should dispatch an event to registered listeners', () => {
    const listener = jest.fn()
    const eventName = 'message.logged'
    const event = new MessageLoggedEvent(
      LogLevel.INFO,
      'Test message',
      {},
      undefined,
      'test-channel',
    )

    // Add listener
    eventDispatcher.addListener(eventName, listener)

    // Dispatch event
    eventDispatcher.dispatch(event)

    // Verify listener was called with the event
    expect(listener).toHaveBeenCalledWith(event)
  })

  test('should add and remove a listener for an event', () => {
    const listener = jest.fn()
    const eventName = 'message.logged'

    // Add listener
    eventDispatcher.addListener(eventName, listener)

    // Verify listener was added
    expect(eventDispatcher.getListeners(eventName)).toContain(listener)

    // Remove listener
    eventDispatcher.removeListener(eventName, listener)

    // Verify listener was removed
    expect(eventDispatcher.getListeners(eventName)).not.toContain(listener)
  })

  test('should get all listeners for an event', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const eventName = 'message.logged'

    // Add listeners
    eventDispatcher.addListener(eventName, listener1)
    eventDispatcher.addListener(eventName, listener2)

    // Get listeners
    const listeners = eventDispatcher.getListeners(eventName)

    // Verify listeners were returned
    expect(listeners).toContain(listener1)
    expect(listeners).toContain(listener2)
    expect(listeners.length).toBe(2)
  })

  test('should check if an event has listeners', () => {
    const listener = jest.fn()
    const eventName = 'message.logged'

    // Initially, the event should have no listeners
    expect(eventDispatcher.hasListeners(eventName)).toBe(false)

    // Add listener
    eventDispatcher.addListener(eventName, listener)

    // Now the event should have a listener
    expect(eventDispatcher.hasListeners(eventName)).toBe(true)
  })

  test('should clear all listeners for an event', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const eventName = 'message.logged'

    // Add listeners
    eventDispatcher.addListener(eventName, listener1)
    eventDispatcher.addListener(eventName, listener2)

    // Clear listeners
    eventDispatcher.clearListeners(eventName)

    // Verify listeners were cleared
    expect(eventDispatcher.getListeners(eventName)).toEqual([])
    expect(eventDispatcher.hasListeners(eventName)).toBe(false)
  })

  test('should handle errors in event listeners', () => {
    const errorListener = jest.fn().mockImplementation(() => {
      throw new Error('Listener error')
    })
    const normalListener = jest.fn()
    const eventName = 'message.logged'
    const event = new MessageLoggedEvent(
      LogLevel.INFO,
      'Test message',
      {},
      undefined,
      'test-channel',
    )

    // Mock console.error
    const originalConsoleError = console.error
    console.error = jest.fn()

    // Add listeners
    eventDispatcher.addListener(eventName, errorListener)
    eventDispatcher.addListener(eventName, normalListener)

    // Dispatch event
    eventDispatcher.dispatch(event)

    // Verify error was logged
    expect(console.error).toHaveBeenCalled()

    // Verify normal listener was still called
    expect(normalListener).toHaveBeenCalledWith(event)

    // Restore console.error
    console.error = originalConsoleError
  })
})

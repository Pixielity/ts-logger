import { ContextRepository } from '../../src/context/repository'
import { ContextDehydratingEvent } from '../../src/context/events/dehydrating.event'
import { ContextHydratedEvent } from '../../src/context/events/hydrated.event'
import type { IEventDispatcher } from '../../src/interfaces/events/event-dispatcher.interface'

describe('ContextRepository', () => {
  let contextRepository: ContextRepository
  let mockEventDispatcher: jest.Mocked<IEventDispatcher>

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

    // Create context repository instance
    contextRepository = new ContextRepository(mockEventDispatcher)
  })

  test('should add and get a value from the context', () => {
    contextRepository.add('userId', 123)

    expect(contextRepository.get('userId')).toBe(123)
  })

  test('should check if the context contains a key', () => {
    contextRepository.add('userId', 123)

    expect(contextRepository.has('userId')).toBe(true)
    expect(contextRepository.has('username')).toBe(false)
  })

  test('should remove a value from the context', () => {
    contextRepository.add('userId', 123)
    contextRepository.forget('userId')

    expect(contextRepository.has('userId')).toBe(false)
  })

  test('should add and get a hidden value from the context', () => {
    contextRepository.addHidden('password', 'secret')

    expect(contextRepository.getHidden('password')).toBe('secret')
  })

  test('should check if the context contains a hidden key', () => {
    contextRepository.addHidden('password', 'secret')

    expect(contextRepository.hasHidden('password')).toBe(true)
    expect(contextRepository.hasHidden('apiKey')).toBe(false)
  })

  test('should remove a hidden value from the context', () => {
    contextRepository.addHidden('password', 'secret')
    contextRepository.forgetHidden('password')

    expect(contextRepository.hasHidden('password')).toBe(false)
  })

  test('should push and pop values from a stack in the context', () => {
    contextRepository.push('breadcrumbs', 'page1')
    contextRepository.push('breadcrumbs', 'page2')

    expect(contextRepository.pop('breadcrumbs')).toBe('page2')
    expect(contextRepository.pop('breadcrumbs')).toBe('page1')
    expect(contextRepository.pop('breadcrumbs')).toBeUndefined()
  })

  test('should check if a stack in the context contains a value', () => {
    contextRepository.push('breadcrumbs', 'page1')
    contextRepository.push('breadcrumbs', 'page2')

    expect(contextRepository.stackContains('breadcrumbs', 'page1')).toBe(true)
    expect(contextRepository.stackContains('breadcrumbs', 'page3')).toBe(false)
  })

  test('should increment and decrement a counter in the context', () => {
    expect(contextRepository.increment('counter')).toBe(1)
    expect(contextRepository.increment('counter')).toBe(2)
    expect(contextRepository.increment('counter', 3)).toBe(5)

    expect(contextRepository.decrement('counter')).toBe(4)
    expect(contextRepository.decrement('counter', 2)).toBe(2)
  })

  test('should create a scoped context', () => {
    contextRepository.add('userId', 123)

    const result = contextRepository.scope(() => {
      contextRepository.add('transactionId', 'abc123')
      expect(contextRepository.get('userId')).toBe(123)
      expect(contextRepository.get('transactionId')).toBe('abc123')
      return 'result'
    })

    expect(result).toBe('result')
    expect(contextRepository.get('userId')).toBe(123)
    expect(contextRepository.has('transactionId')).toBe(false)
  })

  test('should dehydrate the context to a serializable object', () => {
    contextRepository.add('userId', 123)
    contextRepository.add('username', 'john.doe')
    contextRepository.increment('counter', 5)

    const dehydrated = contextRepository.dehydrate()

    // Verify the dehydrated context contains the expected data
    expect(dehydrated.context).toEqual({
      userId: 123,
      username: 'john.doe',
    })
    expect(dehydrated.counters).toEqual({
      counter: 5,
    })

    // Verify a ContextDehydrating event was dispatched
    expect(mockEventDispatcher.dispatch).toHaveBeenCalledWith(expect.any(ContextDehydratingEvent))
  })

  test('should hydrate the context from a serialized object', () => {
    const data = {
      context: {
        userId: 123,
        username: 'john.doe',
      },
      counters: {
        counter: 5,
      },
    }

    contextRepository.hydrate(data)

    // Verify the context was hydrated correctly
    expect(contextRepository.get('userId')).toBe(123)
    expect(contextRepository.get('username')).toBe('john.doe')
    expect(contextRepository.increment('counter', 0)).toBe(5) // Get the counter value

    // Verify a ContextHydrated event was dispatched
    expect(mockEventDispatcher.dispatch).toHaveBeenCalledWith(expect.any(ContextHydratedEvent))
  })

  test('should get all context data', () => {
    contextRepository.add('userId', 123)
    contextRepository.add('username', 'john.doe')

    const all = contextRepository.all()

    expect(all).toEqual({
      userId: 123,
      username: 'john.doe',
    })
  })

  test('should clear all context data', () => {
    contextRepository.add('userId', 123)
    contextRepository.addHidden('password', 'secret')
    contextRepository.push('breadcrumbs', 'page1')
    contextRepository.increment('counter')

    contextRepository.clear()

    expect(contextRepository.all()).toEqual({})
    expect(contextRepository.hasHidden('password')).toBe(false)
    expect(contextRepository.stackContains('breadcrumbs', 'page1')).toBe(false)
    expect(contextRepository.increment('counter', 0)).toBe(0) // Counter should be reset
  })
})

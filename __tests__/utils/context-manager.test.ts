import { ContextManager } from '../../src/context/manager'
import type { IContextManagement } from '../../src/interfaces/context/management.interface'
import { jest } from '@jest/globals'

describe('ContextManager', () => {
  let contextManager: ContextManager
  let mockContextRepository: jest.Mocked<IContextManagement>

  beforeEach(() => {
    // Create mock context repository
    mockContextRepository = jest.mocked({
      add: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
      forget: jest.fn(),
      addHidden: jest.fn(),
      getHidden: jest.fn(),
      hasHidden: jest.fn(),
      forgetHidden: jest.fn(),
      push: jest.fn(),
      pop: jest.fn(),
      stackContains: jest.fn(),
      increment: jest.fn(),
      decrement: jest.fn(),
      scope: jest.fn(),
      dehydrate: jest.fn(),
      hydrate: jest.fn(),
      all: jest.fn(),
      clear: jest.fn(),
    } as unknown as IContextManagement)

    // Create context manager instance
    contextManager = new ContextManager(mockContextRepository)
  })

  test('should add contextual data', () => {
    const context = {
      userId: 123,
      username: 'john.doe',
    }

    contextManager.addContext(context)

    // Verify context was added to the repository
    expect(mockContextRepository.add).toHaveBeenCalledWith('userId', 123)
    expect(mockContextRepository.add).toHaveBeenCalledWith('username', 'john.doe')
  })

  test('should remove contextual data', () => {
    const keys = ['userId', 'username']

    contextManager.removeContext(keys)

    // Verify context was removed from the repository
    expect(mockContextRepository.forget).toHaveBeenCalledWith('userId')
    expect(mockContextRepository.forget).toHaveBeenCalledWith('username')
  })

  test('should get all contextual data', () => {
    // Set up the context
    Object.defineProperty(contextManager, 'context', {
      value: {
        userId: 123,
        username: 'john.doe',
      },
      writable: true,
    })

    const result = contextManager.getContext()

    expect(result).toEqual({
      userId: 123,
      username: 'john.doe',
    })
  })

  test('should clear all contextual data', () => {
    // Set up the context
    Object.defineProperty(contextManager, 'context', {
      value: {
        userId: 123,
        username: 'john.doe',
      },
      writable: true,
    })

    contextManager.clearContext()

    expect(contextManager.getContext()).toEqual({})
  })

  test('should create a scoped context manager', () => {
    const scopedManager = contextManager.createScope()

    expect(scopedManager).toBeInstanceOf(ContextManager)
    expect((scopedManager as any).parent).toBe(contextManager)
  })

  test('should merge contextual data from another context manager', () => {
    const otherManager = new ContextManager(mockContextRepository)

    // Set up the context in the other manager
    Object.defineProperty(otherManager, 'context', {
      value: {
        userId: 123,
        username: 'john.doe',
      },
      writable: true,
    })

    contextManager.merge(otherManager)

    // Verify context was added
    expect(mockContextRepository.add).toHaveBeenCalledWith('userId', 123)
    expect(mockContextRepository.add).toHaveBeenCalledWith('username', 'john.doe')
  })
})

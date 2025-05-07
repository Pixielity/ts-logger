import type { ILogHandler } from './log-handler.interface'
import type { LogLevel } from '../../enums/log-level.enum'

/**
 * IFingersCrossedHandler defines the contract for fingers-crossed handlers.
 * It provides methods for handling log records only when a certain action level is reached.
 */
export interface IFingersCrossedHandler extends ILogHandler {
  /**
   * Get the action level
   */
  getActionLevel(): LogLevel

  /**
   * Set the action level
   * @param level The action level
   */
  setActionLevel(level: LogLevel): void

  /**
   * Get the buffer size
   */
  getBufferSize(): number

  /**
   * Set the buffer size
   * @param size The buffer size
   */
  setBufferSize(size: number): void

  /**
   * Get whether the handler is activated
   */
  isActivated(): boolean

  /**
   * Reset the handler
   */
  reset(): void
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IFingersCrossedHandler {
  /**
   * Symbol for injecting the fingers-crossed handler
   */
  export const $ = Symbol.for('IFingersCrossedHandler')
}

import type { ILogProcessor } from './log-processor.interface'

/**
 * IMessagePlaceholderProcessor defines the contract for message placeholder processors.
 * It provides methods for replacing placeholders in log messages with context values.
 */
export interface IMessagePlaceholderProcessor extends ILogProcessor {
  /**
   * Set the placeholder format
   * @param format The placeholder format (e.g., '{key}')
   */
  setPlaceholderFormat(format: string): void

  /**
   * Get the placeholder format
   */
  getPlaceholderFormat(): string

  /**
   * Enable or disable emoji support
   * @param enabled Whether emoji support is enabled
   */
  setEmojiSupport(enabled: boolean): void

  /**
   * Get whether emoji support is enabled
   */
  isEmojiSupportEnabled(): boolean
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IMessagePlaceholderProcessor {
  /**
   * Symbol for injecting the message placeholder processor
   */
  export const $ = Symbol.for('IMessagePlaceholderProcessor')
}

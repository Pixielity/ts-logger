import { ILogProcessor } from './log-processor.interface.mjs';
import '../../types/types.mjs';

/**
 * IMessagePlaceholderProcessor defines the contract for message placeholder processors.
 * It provides methods for replacing placeholders in log messages with context values.
 */
interface IMessagePlaceholderProcessor extends ILogProcessor {
    /**
     * Set the placeholder format
     * @param format The placeholder format (e.g., '{key}')
     */
    setPlaceholderFormat(format: string): void;
    /**
     * Get the placeholder format
     */
    getPlaceholderFormat(): string;
    /**
     * Enable or disable emoji support
     * @param enabled Whether emoji support is enabled
     */
    setEmojiSupport(enabled: boolean): void;
    /**
     * Get whether emoji support is enabled
     */
    isEmojiSupportEnabled(): boolean;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IMessagePlaceholderProcessor {
    /**
     * Symbol for injecting the message placeholder processor
     */
    const $: unique symbol;
}

export { IMessagePlaceholderProcessor };

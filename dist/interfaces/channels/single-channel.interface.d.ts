import { ILoggingChannel } from './logging-channel.interface.js';
import { ILogHandler } from '../handlers/log-handler.interface.js';
import { ILogFormatter } from '../formatters/log-formatter.interface.js';
import { ILogProcessor } from '../processors/log-processor.interface.js';
import '../../enums/log-level.enum.js';
import '../../types/log-record.type.js';
import '../../types/log-context.type.js';

/**
 * ISingleChannel defines the contract for single channels.
 * A single channel uses a single handler to process log messages.
 */
interface ISingleChannel extends ILoggingChannel {
    /**
     * Get the handler used by the channel
     */
    getHandler(): ILogHandler;
    /**
     * Set the handler used by the channel
     * @param handler The handler to use
     */
    setHandler(handler: ILogHandler): void;
    /**
     * Get the formatter used by the channel
     */
    getFormatter(): ILogFormatter;
    /**
     * Set the formatter used by the channel
     * @param formatter The formatter to use
     */
    setFormatter(formatter: ILogFormatter): void;
    /**
     * Get the processors used by the channel
     */
    getProcessors(): ILogProcessor[];
    /**
     * Add a processor to the channel
     * @param processor The processor to add
     */
    addProcessor(processor: ILogProcessor): void;
    /**
     * Remove a processor from the channel
     * @param name The name of the processor to remove
     */
    removeProcessor(name: string): void;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ISingleChannel {
    /**
     * Symbol for injecting the single channel
     */
    const $: unique symbol;
}

export { ISingleChannel };

import { ILoggingChannel } from './logging-channel.interface.js';
import '../../enums/log-level.enum.js';
import '../../types/log-record.type.js';
import '../../types/log-context.type.js';

/**
 * IStackChannel defines the contract for stack channels.
 * A stack channel combines multiple channels into a single channel.
 */
interface IStackChannel extends ILoggingChannel {
    /**
     * Get the channels in the stack
     */
    getChannels(): ILoggingChannel[];
    /**
     * Add a channel to the stack
     * @param channel The channel to add
     */
    addChannel(channel: ILoggingChannel): void;
    /**
     * Remove a channel from the stack
     * @param name The name of the channel to remove
     */
    removeChannel(name: string): void;
    /**
     * Check if the stack contains a channel with the specified name
     * @param name The channel name
     */
    hasChannel(name: string): boolean;
    /**
     * Get the channel with the specified name
     * @param name The channel name
     */
    getChannel(name: string): ILoggingChannel | undefined;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IStackChannel {
    /**
     * Symbol for injecting the stack channel
     */
    const $: unique symbol;
}

export { IStackChannel };

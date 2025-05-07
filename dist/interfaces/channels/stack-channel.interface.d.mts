import { ILoggingChannel } from './logging-channel.interface.mjs';
import '../../enums/log-level.enum.mjs';
import '../../types/types.mjs';

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

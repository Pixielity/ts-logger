import { IHttpHandler } from './http-handler.interface.js';
import './log-handler.interface.js';
import '../../types/log-record.type.js';
import '../../types/log-context.type.js';

/**
 * ISlackWebhookHandler defines the contract for Slack webhook handlers.
 * It provides methods for handling log records via Slack webhooks.
 */
interface ISlackWebhookHandler extends IHttpHandler {
    /**
     * Get the Slack channel to send log records to
     */
    getChannel(): string;
    /**
     * Set the Slack channel to send log records to
     * @param channel The Slack channel
     */
    setChannel(channel: string): void;
    /**
     * Get the username to use when sending log records
     */
    getUsername(): string;
    /**
     * Set the username to use when sending log records
     * @param username The username
     */
    setUsername(username: string): void;
    /**
     * Get the emoji to use as the icon when sending log records
     */
    getIconEmoji(): string;
    /**
     * Set the emoji to use as the icon when sending log records
     * @param emoji The emoji
     */
    setIconEmoji(emoji: string): void;
    /**
     * Enable or disable emoji support in log messages
     * @param enabled Whether emoji support is enabled
     */
    setEmojiSupport(enabled: boolean): void;
    /**
     * Get whether emoji support is enabled in log messages
     */
    isEmojiSupportEnabled(): boolean;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ISlackWebhookHandler {
    /**
     * Symbol for injecting the Slack webhook handler
     */
    const $: unique symbol;
}

export { ISlackWebhookHandler };

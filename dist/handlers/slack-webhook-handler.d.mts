import { HttpHandler } from './http-handler.mjs';
import { LogRecord } from '../types/log-record.type.mjs';
import { ISlackWebhookHandler } from '../interfaces/handlers/slack-webhook-handler.interface.mjs';
import '../interfaces/handlers/http-handler.interface.mjs';
import '../interfaces/handlers/log-handler.interface.mjs';
import '../types/log-context.type.mjs';

/**
 * SlackWebhookHandler is an implementation of the ISlackWebhookHandler interface.
 * It handles log records by sending them to a Slack webhook.
 */
declare class SlackWebhookHandler extends HttpHandler implements ISlackWebhookHandler {
    private channel;
    private username;
    private iconEmoji;
    private emojiSupport;
    /**
     * Create a new SlackWebhookHandler instance
     * @param options Options for the handler
     */
    constructor(options?: {
        url?: string;
        channel?: string;
        username?: string;
        iconEmoji?: string;
        emojiSupport?: boolean;
        maxRetries?: number;
    });
    /**
     * Handle a log record
     * @param record The log record to handle
     */
    handle(record: LogRecord): Promise<void>;
    /**
     * Get the color for a log level
     * @param level The log level
     */
    private getColorForLevel;
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

export { SlackWebhookHandler };

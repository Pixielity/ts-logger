import { injectable } from 'inversify'
import type { ISlackWebhookHandler } from '../interfaces/handlers/slack-webhook-handler.interface'
import { HttpHandler } from './http-handler'
import type { LogRecord } from '../types/types'
import { LogLevelEmoji } from '../constants'

/**
 * SlackWebhookHandler is an implementation of the ISlackWebhookHandler interface.
 * It handles log records by sending them to a Slack webhook.
 */
@injectable()
export class SlackWebhookHandler extends HttpHandler implements ISlackWebhookHandler {
  private channel = '#logs'
  private username = 'ts-log'
  private iconEmoji = ':memo:'
  private emojiSupport = true

  /**
   * Create a new SlackWebhookHandler instance
   * @param options Options for the handler
   */
  constructor(
    options: {
      url?: string
      channel?: string
      username?: string
      iconEmoji?: string
      emojiSupport?: boolean
      maxRetries?: number
    } = {},
  ) {
    super({
      url: options.url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      maxRetries: options.maxRetries,
    })

    if (options.channel) {
      this.channel = options.channel
    }
    if (options.username) {
      this.username = options.username
    }
    if (options.iconEmoji) {
      this.iconEmoji = options.iconEmoji
    }
    if (options.emojiSupport !== undefined) {
      this.emojiSupport = options.emojiSupport
    }

    this.setName('slack')
  }

  /**
   * Handle a log record
   * @param record The log record to handle
   */
  public async handle(record: LogRecord): Promise<void> {
    if (!this.getUrl()) {
      console.error('Slack webhook URL not configured')
      return
    }

    // Format the message with emoji if enabled
    let message = record.message
    if (this.emojiSupport && LogLevelEmoji[record.level as keyof typeof LogLevelEmoji]) {
      message = `${LogLevelEmoji[record.level as keyof typeof LogLevelEmoji]} ${message}`
    }

    // Create the Slack payload
    const payload = {
      channel: this.channel,
      username: this.username,
      icon_emoji: this.iconEmoji,
      text: `[${record.levelName}] ${message}`,
      attachments: [
        {
          color: this.getColorForLevel(record.level),
          fields: [
            {
              title: 'Time',
              value: record.datetime.toISOString(),
              short: true,
            },
            {
              title: 'Level',
              value: record.levelName,
              short: true,
            },
          ],
          fallback: `[${record.levelName}] ${message}`,
        },
      ],
    }

    // Add context as fields if it's not empty
    if (Object.keys(record.context).length > 0) {
      for (const [key, value] of Object.entries(record.context)) {
        payload.attachments[0].fields.push({
          title: key,
          value: JSON.stringify(value),
          short: false,
        })
      }
    }

    // Add stack trace if it exists
    if (record.stack) {
      payload.attachments[0].fields.push({
        title: 'Stack Trace',
        value: `\`\`\`${record.stack}\`\`\``,
        short: false,
      })
    }

    // Override the HTTP handler's payload
    const originalHeaders = this.getHeaders()
    this.setHeaders({
      ...originalHeaders,
      'Content-Type': 'application/json',
    })

    // Use the HTTP handler to send the request
    await super.handle({
      ...record,
      message: JSON.stringify(payload),
    })
  }

  /**
   * Get the color for a log level
   * @param level The log level
   */
  private getColorForLevel(level: string): string {
    switch (level) {
      case 'emergency':
      case 'alert':
      case 'critical':
      case 'error':
        return 'danger'
      case 'warning':
        return 'warning'
      case 'notice':
      case 'info':
        return 'good'
      case 'debug':
      default:
        return '#CCCCCC'
    }
  }

  /**
   * Get the Slack channel to send log records to
   */
  public getChannel(): string {
    return this.channel
  }

  /**
   * Set the Slack channel to send log records to
   * @param channel The Slack channel
   */
  public setChannel(channel: string): void {
    this.channel = channel
  }

  /**
   * Get the username to use when sending log records
   */
  public getUsername(): string {
    return this.username
  }

  /**
   * Set the username to use when sending log records
   * @param username The username
   */
  public setUsername(username: string): void {
    this.username = username
  }

  /**
   * Get the emoji to use as the icon when sending log records
   */
  public getIconEmoji(): string {
    return this.iconEmoji
  }

  /**
   * Set the emoji to use as the icon when sending log records
   * @param emoji The emoji
   */
  public setIconEmoji(emoji: string): void {
    this.iconEmoji = emoji
  }

  /**
   * Enable or disable emoji support in log messages
   * @param enabled Whether emoji support is enabled
   */
  public setEmojiSupport(enabled: boolean): void {
    this.emojiSupport = enabled
  }

  /**
   * Get whether emoji support is enabled in log messages
   */
  public isEmojiSupportEnabled(): boolean {
    return this.emojiSupport
  }
}

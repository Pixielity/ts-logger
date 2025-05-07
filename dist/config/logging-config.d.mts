import { LogLevel } from '../enums/log-level.enum.mjs';
import { DateFormat } from '../enums/date-format.enum.mjs';
import { HandlerType } from '../enums/handler-type.enum.mjs';
import { FormatterType } from '../enums/formatter-type.enum.mjs';
import { ProcessorType } from '../enums/processor-type.enum.mjs';
import { LogChannelType } from '../enums/log-channel-type.enum.mjs';

/**
 * Configuration for the ts-log package.
 * This file contains the default configuration for channels, handlers, formatters, processors, emojis, and colors.
 */
declare const loggingConfig: {
    /**
     * The default channel to use
     */
    default: string;
    /**
     * The minimum log level to record
     */
    minimumLevel: LogLevel;
    /**
     * The channels configuration
     */
    channels: {
        console: {
            type: LogChannelType;
            handler: {
                type: HandlerType;
                emojiSupport: boolean;
                colorSupport: boolean;
            };
            formatter: {
                type: FormatterType;
                dateFormat: DateFormat;
                emojiSupport: boolean;
                colorSupport: boolean;
                stackTraceFormatting: boolean;
            };
            processors: ({
                type: ProcessorType;
                placeholderFormat: string;
                emojiSupport: boolean;
            } | {
                type: ProcessorType;
                placeholderFormat?: undefined;
                emojiSupport?: undefined;
            })[];
        };
        localStorage: {
            type: LogChannelType;
            handler: {
                type: HandlerType;
                key: string;
                maxEntries: number;
            };
            formatter: {
                type: FormatterType;
                prettyPrint: boolean;
                stackTraceFormatting: boolean;
            };
            processors: ({
                type: ProcessorType;
                placeholderFormat: string;
                emojiSupport: boolean;
            } | {
                type: ProcessorType;
                placeholderFormat?: undefined;
                emojiSupport?: undefined;
            })[];
        };
        indexedDB: {
            type: LogChannelType;
            handler: {
                type: HandlerType;
                databaseName: string;
                tableName: string;
                maxEntries: number;
            };
            formatter: {
                type: FormatterType;
                prettyPrint: boolean;
                stackTraceFormatting: boolean;
            };
            processors: ({
                type: ProcessorType;
                placeholderFormat: string;
                emojiSupport: boolean;
            } | {
                type: ProcessorType;
                placeholderFormat?: undefined;
                emojiSupport?: undefined;
            })[];
        };
        slack: {
            type: LogChannelType;
            handler: {
                type: HandlerType;
                url: string;
                channel: string;
                username: string;
                iconEmoji: string;
                emojiSupport: boolean;
                maxRetries: number;
            };
            formatter: {
                type: FormatterType;
                dateFormat: DateFormat;
                emojiSupport: boolean;
                colorSupport: boolean;
                stackTraceFormatting: boolean;
            };
            processors: ({
                type: ProcessorType;
                placeholderFormat: string;
                emojiSupport: boolean;
            } | {
                type: ProcessorType;
                placeholderFormat?: undefined;
                emojiSupport?: undefined;
            })[];
        };
        errorLog: {
            type: LogChannelType;
            handler: {
                type: HandlerType;
                emojiSupport: boolean;
            };
            formatter: {
                type: FormatterType;
                emojiSupport: boolean;
                colorSupport: boolean;
            };
            processors: ({
                type: ProcessorType;
                placeholderFormat: string;
                emojiSupport: boolean;
            } | {
                type: ProcessorType;
                placeholderFormat?: undefined;
                emojiSupport?: undefined;
            })[];
        };
        syslog: {
            type: LogChannelType;
            handler: {
                type: HandlerType;
                facility: number;
                appName: string;
                procId: string;
            };
            formatter: {
                type: FormatterType;
                dateFormat: DateFormat;
                emojiSupport: boolean;
                colorSupport: boolean;
                stackTraceFormatting: boolean;
            };
            processors: ({
                type: ProcessorType;
                placeholderFormat: string;
                emojiSupport: boolean;
            } | {
                type: ProcessorType;
                placeholderFormat?: undefined;
                emojiSupport?: undefined;
            })[];
        };
        stack: {
            type: LogChannelType;
            channels: string[];
        };
    };
    /**
     * Emoji configuration
     */
    emoji: {
        enabled: boolean;
        levels: {
            emergency: string;
            alert: string;
            critical: string;
            error: string;
            warning: string;
            notice: string;
            info: string;
            debug: string;
        };
    };
    /**
     * Color configuration
     */
    color: {
        enabled: boolean;
        levels: {
            emergency: string;
            alert: string;
            critical: string;
            error: string;
            warning: string;
            notice: string;
            info: string;
            debug: string;
        };
    };
};

export { loggingConfig };

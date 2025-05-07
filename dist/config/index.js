'use strict';

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/config/logging-config.ts
var loggingConfig = {
  /**
   * The default channel to use
   */
  default: "console",
  /**
   * The minimum log level to record
   */
  minimumLevel: "debug" /* DEBUG */,
  /**
   * The channels configuration
   */
  channels: {
    console: {
      type: "console" /* CONSOLE */,
      handler: {
        type: "console" /* CONSOLE */,
        emojiSupport: true,
        colorSupport: true
      },
      formatter: {
        type: "line" /* LINE */,
        dateFormat: "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */,
        emojiSupport: true,
        colorSupport: true,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    localStorage: {
      type: "localStorage" /* LOCAL_STORAGE */,
      handler: {
        type: "localStorage" /* LOCAL_STORAGE */,
        key: "ts-log",
        maxEntries: 100
      },
      formatter: {
        type: "json" /* JSON */,
        prettyPrint: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    indexedDB: {
      type: "indexedDB" /* INDEXED_DB */,
      handler: {
        type: "indexedDB" /* INDEXED_DB */,
        databaseName: "ts-log",
        tableName: "logs",
        maxEntries: 1e3
      },
      formatter: {
        type: "json" /* JSON */,
        prettyPrint: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    slack: {
      type: "slack" /* SLACK */,
      handler: {
        type: "slack" /* SLACK */,
        url: "",
        channel: "#logs",
        username: "ts-log",
        iconEmoji: ":memo:",
        emojiSupport: true,
        maxRetries: 3
      },
      formatter: {
        type: "line" /* LINE */,
        dateFormat: "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */,
        emojiSupport: true,
        colorSupport: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    errorLog: {
      type: "errorLog" /* ERROR_LOG */,
      handler: {
        type: "errorLog" /* ERROR_LOG */,
        emojiSupport: true
      },
      formatter: {
        type: "simple" /* SIMPLE */,
        emojiSupport: true,
        colorSupport: false
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    syslog: {
      type: "syslog" /* SYSLOG */,
      handler: {
        type: "syslog" /* SYSLOG */,
        facility: 16,
        // local0
        appName: "ts-log",
        procId: "browser"
      },
      formatter: {
        type: "line" /* LINE */,
        dateFormat: "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */,
        emojiSupport: false,
        colorSupport: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: false
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    stack: {
      type: "stack" /* STACK */,
      channels: ["console", "localStorage"]
    }
  },
  /**
   * Emoji configuration
   */
  emoji: {
    enabled: true,
    levels: {
      ["emergency" /* EMERGENCY */]: "\u{1F6A8}",
      ["alert" /* ALERT */]: "\u{1F514}",
      ["critical" /* CRITICAL */]: "\u2757",
      ["error" /* ERROR */]: "\u{1F534}",
      ["warning" /* WARNING */]: "\u26A0\uFE0F",
      ["notice" /* NOTICE */]: "\u{1F4DD}",
      ["info" /* INFO */]: "\u2705",
      ["debug" /* DEBUG */]: "\u{1F6E0}\uFE0F"
    }
  },
  /**
   * Color configuration
   */
  color: {
    enabled: true,
    levels: {
      ["emergency" /* EMERGENCY */]: "#FF0000",
      // Red
      ["alert" /* ALERT */]: "#FF4500",
      // OrangeRed
      ["critical" /* CRITICAL */]: "#FF8C00",
      // DarkOrange
      ["error" /* ERROR */]: "#FFA500",
      // Orange
      ["warning" /* WARNING */]: "#FFD700",
      // Gold
      ["notice" /* NOTICE */]: "#1E90FF",
      // DodgerBlue
      ["info" /* INFO */]: "#32CD32",
      // LimeGreen
      ["debug" /* DEBUG */]: "#808080"
      // Gray
    }
  }
};

exports.loggingConfig = loggingConfig;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
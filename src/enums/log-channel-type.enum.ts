/**
 * LogChannelType enum defines the available channel types in the ts-log package.
 * These types determine how logs are processed and stored.
 */
export enum LogChannelType {
  /**
   * Console channel outputs logs to the browser console
   */
  CONSOLE = 'console',

  /**
   * LocalStorage channel stores logs in the browser's localStorage
   */
  LOCAL_STORAGE = 'localStorage',

  /**
   * IndexedDB channel stores logs in the browser's IndexedDB
   */
  INDEXED_DB = 'indexedDB',

  /**
   * HTTP channel sends logs to a remote server via HTTP
   */
  HTTP = 'http',

  /**
   * Slack channel sends logs to a Slack webhook
   */
  SLACK = 'slack',

  /**
   * ErrorLog channel outputs logs to the browser's error log
   */
  ERROR_LOG = 'errorLog',

  /**
   * Syslog channel outputs logs in syslog format (browser-compatible)
   */
  SYSLOG = 'syslog',

  /**
   * Stack channel combines multiple channels
   */
  STACK = 'stack',

  /**
   * Custom channel type for user-defined channels
   */
  CUSTOM = 'custom',
}

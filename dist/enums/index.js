'use strict';

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/enums/date-format.enum.ts
var DateFormat = /* @__PURE__ */ ((DateFormat2) => {
  DateFormat2["ISO8601"] = "ISO8601";
  DateFormat2["RFC3339"] = "RFC3339";
  DateFormat2["RFC2822"] = "RFC2822";
  DateFormat2["UNIX"] = "UNIX";
  DateFormat2["YYYY_MM_DD"] = "YYYY-MM-DD";
  DateFormat2["YYYY_MM_DD_HH_MM_SS"] = "YYYY-MM-DD HH:mm:ss";
  DateFormat2["DD_MM_YYYY"] = "DD/MM/YYYY";
  DateFormat2["MM_DD_YYYY"] = "MM/DD/YYYY";
  DateFormat2["HH_MM_SS"] = "HH:mm:ss";
  DateFormat2["CUSTOM"] = "custom";
  return DateFormat2;
})(DateFormat || {});

// src/enums/formatter-type.enum.ts
var FormatterType = /* @__PURE__ */ ((FormatterType2) => {
  FormatterType2["LINE"] = "line";
  FormatterType2["JSON"] = "json";
  FormatterType2["SIMPLE"] = "simple";
  FormatterType2["CUSTOM"] = "custom";
  return FormatterType2;
})(FormatterType || {});

// src/enums/handler-type.enum.ts
var HandlerType = /* @__PURE__ */ ((HandlerType2) => {
  HandlerType2["CONSOLE"] = "console";
  HandlerType2["LOCAL_STORAGE"] = "localStorage";
  HandlerType2["INDEXED_DB"] = "indexedDB";
  HandlerType2["HTTP"] = "http";
  HandlerType2["SLACK"] = "slack";
  HandlerType2["ERROR_LOG"] = "errorLog";
  HandlerType2["SYSLOG"] = "syslog";
  HandlerType2["FINGERS_CROSSED"] = "fingersCrossed";
  HandlerType2["CUSTOM"] = "custom";
  return HandlerType2;
})(HandlerType || {});

// src/enums/log-channel-type.enum.ts
var LogChannelType = /* @__PURE__ */ ((LogChannelType2) => {
  LogChannelType2["CONSOLE"] = "console";
  LogChannelType2["LOCAL_STORAGE"] = "localStorage";
  LogChannelType2["INDEXED_DB"] = "indexedDB";
  LogChannelType2["HTTP"] = "http";
  LogChannelType2["SLACK"] = "slack";
  LogChannelType2["ERROR_LOG"] = "errorLog";
  LogChannelType2["SYSLOG"] = "syslog";
  LogChannelType2["STACK"] = "stack";
  LogChannelType2["CUSTOM"] = "custom";
  return LogChannelType2;
})(LogChannelType || {});

// src/enums/log-level.enum.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["EMERGENCY"] = "emergency";
  LogLevel2["ALERT"] = "alert";
  LogLevel2["CRITICAL"] = "critical";
  LogLevel2["ERROR"] = "error";
  LogLevel2["WARNING"] = "warning";
  LogLevel2["NOTICE"] = "notice";
  LogLevel2["INFO"] = "info";
  LogLevel2["DEBUG"] = "debug";
  return LogLevel2;
})(LogLevel || {});

// src/enums/processor-type.enum.ts
var ProcessorType = /* @__PURE__ */ ((ProcessorType2) => {
  ProcessorType2["MESSAGE_PLACEHOLDER"] = "messagePlaceholder";
  ProcessorType2["CONTEXT"] = "context";
  ProcessorType2["CUSTOM"] = "custom";
  return ProcessorType2;
})(ProcessorType || {});

exports.DateFormat = DateFormat;
exports.FormatterType = FormatterType;
exports.HandlerType = HandlerType;
exports.LogChannelType = LogChannelType;
exports.LogLevel = LogLevel;
exports.ProcessorType = ProcessorType;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/interfaces/channels/logging-channel.interface.ts
var ILoggingChannel;
((ILoggingChannel2) => {
  ILoggingChannel2.$ = Symbol.for("ILoggingChannel");
})(ILoggingChannel || (ILoggingChannel = {}));

// src/interfaces/channels/single-channel.interface.ts
var ISingleChannel;
((ISingleChannel2) => {
  ISingleChannel2.$ = Symbol.for("ISingleChannel");
})(ISingleChannel || (ISingleChannel = {}));

// src/interfaces/channels/stack-channel.interface.ts
var IStackChannel;
((IStackChannel2) => {
  IStackChannel2.$ = Symbol.for("IStackChannel");
})(IStackChannel || (IStackChannel = {}));

export { ILoggingChannel, ISingleChannel, IStackChannel };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map
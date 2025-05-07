'use strict';

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/interfaces/channels/logging-channel.interface.ts
exports.ILoggingChannel = void 0;
((ILoggingChannel2) => {
  ILoggingChannel2.$ = Symbol.for("ILoggingChannel");
})(exports.ILoggingChannel || (exports.ILoggingChannel = {}));

// src/interfaces/channels/single-channel.interface.ts
exports.ISingleChannel = void 0;
((ISingleChannel2) => {
  ISingleChannel2.$ = Symbol.for("ISingleChannel");
})(exports.ISingleChannel || (exports.ISingleChannel = {}));

// src/interfaces/channels/stack-channel.interface.ts
exports.IStackChannel = void 0;
((IStackChannel2) => {
  IStackChannel2.$ = Symbol.for("IStackChannel");
})(exports.IStackChannel || (exports.IStackChannel = {}));
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
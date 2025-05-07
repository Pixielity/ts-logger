'use strict';

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/constants/log-level-color.constant.ts
var LogLevelColor = {
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
};

// src/constants/log-level-emoji.constant.ts
var LogLevelEmoji = {
  ["emergency" /* EMERGENCY */]: "\u{1F6A8}",
  ["alert" /* ALERT */]: "\u{1F514}",
  ["critical" /* CRITICAL */]: "\u2757",
  ["error" /* ERROR */]: "\u{1F534}",
  ["warning" /* WARNING */]: "\u26A0\uFE0F",
  ["notice" /* NOTICE */]: "\u{1F4DD}",
  ["info" /* INFO */]: "\u2705",
  ["debug" /* DEBUG */]: "\u{1F6E0}\uFE0F"
};

// src/constants/log-level-value.constant.ts
var LogLevelValue = {
  ["emergency" /* EMERGENCY */]: 800,
  ["alert" /* ALERT */]: 700,
  ["critical" /* CRITICAL */]: 600,
  ["error" /* ERROR */]: 500,
  ["warning" /* WARNING */]: 400,
  ["notice" /* NOTICE */]: 300,
  ["info" /* INFO */]: 200,
  ["debug" /* DEBUG */]: 100
};

exports.LogLevelColor = LogLevelColor;
exports.LogLevelEmoji = LogLevelEmoji;
exports.LogLevelValue = LogLevelValue;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
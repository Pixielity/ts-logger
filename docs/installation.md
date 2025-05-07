# Installation

This guide will help you install and set up the ts-log package in your project.

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher or yarn 1.x or higher

## Installation

### Using npm

\`\`\`bash
npm install @xai/ts-log
\`\`\`

### Using yarn

\`\`\`bash
yarn add @xai/ts-log
\`\`\`

## Dependencies

The ts-log package has the following dependencies:

- `inversify`: For dependency injection
- `reflect-metadata`: Required by inversify
- `uuid`: For generating unique identifiers
- `ansi-colors`: For colorized output
- `dexie`: For IndexedDB storage
- `stacktrace-js`: For stack trace parsing

These dependencies will be installed automatically when you install the ts-log package.

## TypeScript Configuration

The ts-log package requires TypeScript 4.x or higher and the following compiler options:

\`\`\`json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "lib": ["dom", "es2020"]
  }
}
\`\`\`

Make sure these options are enabled in your `tsconfig.json` file.

## Next.js Configuration

If you're using Next.js, you'll need to configure it to support the ts-log package:

\`\`\`javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Add support for inversify
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    return config
  },
}
\`\`\`

## React Configuration

If you're using React, you'll need to import `reflect-metadata` at the entry point of your application:

\`\`\`javascript
// index.js or index.tsx
import 'reflect-metadata'
\`\`\`

## Basic Setup

Here's a basic setup for the ts-log package:

\`\`\`typescript
import { LogManager, EventDispatcher, ConsoleHandler, LineFormatter } from '@xai/ts-log'

// Create an event dispatcher
const eventDispatcher = new EventDispatcher()

// Create a log manager
const logManager = new LogManager(eventDispatcher)

// Export the log manager for use in your application
export const logger = logManager
\`\`\`

You can then import and use the logger in your application:

\`\`\`typescript
import { logger } from './logger'

logger.info('Hello, world!')
\`\`\`

## Next Steps

- [Configuration](./configuration.md): Learn how to configure the ts-log package
- [Context](./context.md): Learn how to use the context repository
- [API](./api.md): Learn about the ts-log API

/**
 * Example Next.js application using the ts-log package.
 */

import {
  LogManager,
  EventDispatcher,
  ConsoleHandler,
  LocalStorageHandler,
  LineFormatter,
  JsonFormatter,
  MessagePlaceholderProcessor,
  ContextLogProcessor,
  DateFormat,
} from '../src'

/**
 * Initialize the logger for a Next.js application.
 * This function can be called in a Next.js app's _app.tsx file.
 */
export function initLogger() {
  // Create an event dispatcher
  const eventDispatcher = new EventDispatcher()

  // Create a log manager
  const logManager = new LogManager(eventDispatcher)

  // Create a console handler with emoji and color support
  const consoleHandler = new ConsoleHandler({
    emojiSupport: true,
    colorSupport: true,
  })

  // Create a localStorage handler
  const localStorageHandler = new LocalStorageHandler({
    key: 'next-app-logs',
    maxEntries: 100,
  })

  // Create formatters
  const lineFormatter = new LineFormatter({
    dateFormat: DateFormat.YYYY_MM_DD_HH_MM_SS,
    emojiSupport: true,
    colorSupport: true,
    stackTraceFormatting: true,
  })

  const jsonFormatter = new JsonFormatter({
    prettyPrint: false,
    stackTraceFormatting: true,
  })

  // Create processors
  const messagePlaceholderProcessor = new MessagePlaceholderProcessor({
    placeholderFormat: '{key}',
    emojiSupport: true,
  })

  const contextLogProcessor = new ContextLogProcessor()

  // Add application-specific context
  contextLogProcessor.addContext({
    app: 'next-app',
    environment: process.env.NODE_ENV,
  })

  // Create channels
  const consoleChannel = {
    handler: consoleHandler,
    formatter: lineFormatter,
    processors: [messagePlaceholderProcessor, contextLogProcessor],
  }

  const localStorageChannel = {
    handler: localStorageHandler,
    formatter: jsonFormatter,
    processors: [messagePlaceholderProcessor, contextLogProcessor],
  }

  // Configure the log manager
  // In a real application, you would use the createChannel method
  // For this example, we're just simulating the configuration

  // Set up event listeners
  eventDispatcher.addListener('message.logged', (event) => {
    // You could send analytics or perform other actions when logs are created
    console.debug('Log event:', event.getData())
  })

  // Return the log manager for use in the application
  return logManager
}

/**
 * Example usage in a Next.js page component
 */
export function ExamplePage() {
  const logger = initLogger()

  // Log a simple message
  logger.info('Page loaded')

  // Log a message with context
  logger.info('User action', { action: 'button_click', component: 'ExamplePage' })

  // Log an error with a try/catch
  try {
    // Simulate an error
    throw new Error('Something went wrong')
  } catch (error) {
    logger.error('Error in ExamplePage', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  // Log with placeholders
  logger.info('User {action} on {component}', { action: 'clicked', component: 'Button' })

  // Use different log levels
  logger.debug('Debug information')
  logger.notice('Something noteworthy happened')
  logger.warning('Warning: approaching rate limit')
  logger.critical('Critical error in payment processing')

  // Use withContext to add context to all subsequent logs
  logger.withContext({ userId: 'user-123', sessionId: 'session-456' }).info('User session started')

  // Return the component JSX
  return 'Example Page Component'
}

/**
 * Example usage in a Next.js API route
 */
export async function exampleApiRoute(req, res) {
  const logger = initLogger()

  // Log the request
  logger.info('API request received', {
    method: req.method,
    url: req.url,
    query: req.query,
  })

  try {
    // Process the request
    const result = await processRequest(req)

    // Log the successful response
    logger.info('API request successful', {
      method: req.method,
      url: req.url,
      responseTime: performance.now(),
    })

    // Return the response
    res.status(200).json(result)
  } catch (error) {
    // Log the error
    logger.error('API request failed', {
      method: req.method,
      url: req.url,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Return an error response
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

/**
 * Simulate processing a request
 */
async function processRequest(req) {
  // Simulate processing
  await new Promise((resolve) => setTimeout(resolve, 100))
  return { success: true }
}

'use client'

import React from 'react'
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
import { createContext, useContext, useEffect, useState } from 'react'

// Create a React context for the logger
const LoggerContext = createContext<LogManager | null>(null)

/**
 * Initialize the logger for a React application.
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
    key: 'react-app-logs',
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
    app: 'react-app',
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
 * Logger provider component for React applications.
 */
export function LoggerProvider({ children }) {
  const [logger, setLogger] = useState<LogManager | null>(null)

  useEffect(() => {
    // Initialize the logger
    const logManager = initLogger()
    setLogger(logManager)

    // Log that the application has started
    logManager.info('React application started')

    // Clean up when the component unmounts
    return () => {
      logManager.info('React application stopped')
    }
  }, [])

  return <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
}

/**
 * Custom hook to use the logger in React components.
 */
export function useLogger() {
  const logger = useContext(LoggerContext)

  if (!logger) {
    throw new Error('useLogger must be used within a LoggerProvider')
  }

  return logger
}

/**
 * Example usage in a React component
 */
export function ExampleComponent() {
  const logger = useLogger()

  useEffect(() => {
    // Log when the component mounts
    logger.info('ExampleComponent mounted')

    // Return a cleanup function that logs when the component unmounts
    return () => {
      logger.info('ExampleComponent unmounted')
    }
  }, [logger])

  const handleClick = () => {
    logger.info('Button clicked', { component: 'ExampleComponent' })
  }

  const handleError = () => {
    try {
      // Simulate an error
      throw new Error('Something went wrong')
    } catch (error) {
      logger.error('Error in ExampleComponent', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      })
    }
  }

  return (
    <div>
      <h1>Example Component</h1>
      <button onClick={handleClick}>Log Click</button>
      <button onClick={handleError}>Trigger Error</button>
    </div>
  )
}

/**
 * Example of a higher-order component that adds logging
 */
export function withLogging(Component) {
  return function WithLogging(props) {
    const logger = useLogger()
    const componentName = Component.displayName || Component.name || 'Component'

    useEffect(() => {
      logger.info(`${componentName} mounted`)

      return () => {
        logger.info(`${componentName} unmounted`)
      }
    }, [logger, componentName])

    // Log all prop changes
    useEffect(() => {
      logger.debug(`${componentName} props updated`, { props })
    }, [logger, componentName, props])

    return <Component {...props} logger={logger} />
  }
}

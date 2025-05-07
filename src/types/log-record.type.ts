import { LogContext } from './log-context.type'

export type LogRecord = {
  level: string
  levelName: string
  message: string
  context: LogContext
  datetime: Date
  extra?: Record<string, any>
  stack?: string
}

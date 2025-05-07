// General Types
export type LogContext = Record<string, any>
export type LogRecord = {
  level: string
  levelName: string
  message: string
  context: LogContext
  datetime: Date
  extra?: Record<string, any>
  stack?: string
}

export type HandlerOptions = Record<string, any>
export type FormatterOptions = Record<string, any>
export type ProcessorOptions = Record<string, any>
export type ChannelOptions = Record<string, any>

export type LogListener = (event: any) => void

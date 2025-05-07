type LogContext = Record<string, any>;
type LogRecord = {
    level: string;
    levelName: string;
    message: string;
    context: LogContext;
    datetime: Date;
    extra?: Record<string, any>;
    stack?: string;
};
type HandlerOptions = Record<string, any>;
type FormatterOptions = Record<string, any>;
type ProcessorOptions = Record<string, any>;
type ChannelOptions = Record<string, any>;
type LogListener = (event: any) => void;

export type { ChannelOptions, FormatterOptions, HandlerOptions, LogContext, LogListener, LogRecord, ProcessorOptions };

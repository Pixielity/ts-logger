import { LogContext } from './log-context.type.js';

type LogRecord = {
    level: string;
    levelName: string;
    message: string;
    context: LogContext;
    datetime: Date;
    extra?: Record<string, any>;
    stack?: string;
};

export type { LogRecord };

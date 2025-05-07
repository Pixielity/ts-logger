/**
 * ContextScope represents a scope for context operations.
 */
type ContextScope = () => void;
/**
 * ContextValue represents a value that can be stored in the context.
 */
type ContextValue = any;
/**
 * ContextStack represents a stack of values in the context.
 */
type ContextStack = any[];
/**
 * ContextCounter represents a counter in the context.
 */
type ContextCounter = number;
/**
 * DehydratedContext represents a dehydrated context.
 */
type DehydratedContext = Record<string, any>;

export type { ContextCounter, ContextScope, ContextStack, ContextValue, DehydratedContext };

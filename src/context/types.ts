/**
 * ContextScope represents a scope for context operations.
 */
export type ContextScope = () => void

/**
 * ContextValue represents a value that can be stored in the context.
 */
export type ContextValue = any

/**
 * ContextStack represents a stack of values in the context.
 */
export type ContextStack = any[]

/**
 * ContextCounter represents a counter in the context.
 */
export type ContextCounter = number

/**
 * DehydratedContext represents a dehydrated context.
 */
export type DehydratedContext = Record<string, any>

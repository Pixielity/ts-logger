/**
 * Check if a value is an object
 * @param value The value to check
 */
declare function isObject(value: any): boolean;
/**
 * Check if a value is a string
 * @param value The value to check
 */
declare function isString(value: any): boolean;
/**
 * Check if a value is a number
 * @param value The value to check
 */
declare function isNumber(value: any): boolean;
/**
 * Check if a value is a boolean
 * @param value The value to check
 */
declare function isBoolean(value: any): boolean;
/**
 * Check if a value is a function
 * @param value The value to check
 */
declare function isFunction(value: any): boolean;
/**
 * Check if a value is undefined
 * @param value The value to check
 */
declare function isUndefined(value: any): boolean;
/**
 * Check if a value is null
 * @param value The value to check
 */
declare function isNull(value: any): boolean;
/**
 * Check if a value is null or undefined
 * @param value The value to check
 */
declare function isNullOrUndefined(value: any): boolean;
/**
 * Check if a value is empty
 * @param value The value to check
 */
declare function isEmpty(value: any): boolean;
/**
 * Merge objects
 * @param target The target object
 * @param sources The source objects
 */
declare function merge(target: any, ...sources: any[]): any;

export { isBoolean, isEmpty, isFunction, isNull, isNullOrUndefined, isNumber, isObject, isString, isUndefined, merge };

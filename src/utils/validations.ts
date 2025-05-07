/**
 * Check if a value is an object
 * @param value The value to check
 */
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Check if a value is a string
 * @param value The value to check
 */
export function isString(value: any): boolean {
  return typeof value === 'string'
}

/**
 * Check if a value is a number
 * @param value The value to check
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Check if a value is a boolean
 * @param value The value to check
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean'
}

/**
 * Check if a value is a function
 * @param value The value to check
 */
export function isFunction(value: any): boolean {
  return typeof value === 'function'
}

/**
 * Check if a value is undefined
 * @param value The value to check
 */
export function isUndefined(value: any): boolean {
  return typeof value === 'undefined'
}

/**
 * Check if a value is null
 * @param value The value to check
 */
export function isNull(value: any): boolean {
  return value === null
}

/**
 * Check if a value is null or undefined
 * @param value The value to check
 */
export function isNullOrUndefined(value: any): boolean {
  return isNull(value) || isUndefined(value)
}

/**
 * Check if a value is empty
 * @param value The value to check
 */
export function isEmpty(value: any): boolean {
  if (isNullOrUndefined(value)) {
    return true
  }
  if (isString(value) || Array.isArray(value)) {
    return value.length === 0
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0
  }
  return false
}

/**
 * Merge objects
 * @param target The target object
 * @param sources The source objects
 */
export function merge(target: any, ...sources: any[]): any {
  if (!sources.length) {
    return target
  }

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        merge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return merge(target, ...sources)
}

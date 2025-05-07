import { DateFormat } from '@/enums'
import {
  isObject,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isUndefined,
  isNull,
  isNullOrUndefined,
  isEmpty,
  merge,
  formatDate,
} from '../../src/utils'

describe('Helpers', () => {
  describe('isObject', () => {
    test('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ key: 'value' })).toBe(true)
      expect(isObject(new Object())).toBe(true)
    })

    test('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject([])).toBe(false)
      expect(isObject('string')).toBe(false)
      expect(isObject(123)).toBe(false)
      expect(isObject(true)).toBe(false)
      expect(isObject(() => {})).toBe(false)
    })
  })

  describe('isString', () => {
    test('should return true for strings', () => {
      expect(isString('')).toBe(true)
      expect(isString('string')).toBe(true)
      expect(isString(new String('string'))).toBe(true)
    })

    test('should return false for non-strings', () => {
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString(123)).toBe(false)
      expect(isString(true)).toBe(false)
      expect(isString(() => {})).toBe(false)
    })
  })

  describe('isNumber', () => {
    test('should return true for numbers', () => {
      expect(isNumber(0)).toBe(true)
      expect(isNumber(123)).toBe(true)
      expect(isNumber(-123)).toBe(true)
      expect(isNumber(1.23)).toBe(true)
      expect(isNumber(new Number(123))).toBe(true)
    })

    test('should return false for non-numbers', () => {
      expect(isNumber(Number.NaN)).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
      expect(isNumber({})).toBe(false)
      expect(isNumber([])).toBe(false)
      expect(isNumber('123')).toBe(false)
      expect(isNumber(true)).toBe(false)
      expect(isNumber(() => {})).toBe(false)
    })
  })

  describe('isBoolean', () => {
    test('should return true for booleans', () => {
      expect(isBoolean(true)).toBe(true)
      expect(isBoolean(false)).toBe(true)
      expect(isBoolean(new Boolean(true))).toBe(true)
    })

    test('should return false for non-booleans', () => {
      expect(isBoolean(null)).toBe(false)
      expect(isBoolean(undefined)).toBe(false)
      expect(isBoolean({})).toBe(false)
      expect(isBoolean([])).toBe(false)
      expect(isBoolean('true')).toBe(false)
      expect(isBoolean(123)).toBe(false)
      expect(isBoolean(() => {})).toBe(false)
    })
  })

  describe('isFunction', () => {
    test('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(new Function())).toBe(true)
    })

    test('should return false for non-functions', () => {
      expect(isFunction(null)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction({})).toBe(false)
      expect(isFunction([])).toBe(false)
      expect(isFunction('function')).toBe(false)
      expect(isFunction(123)).toBe(false)
      expect(isFunction(true)).toBe(false)
    })
  })

  describe('isUndefined', () => {
    test('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true)
      let undefinedVar
      expect(isUndefined(undefinedVar)).toBe(true)
    })

    test('should return false for non-undefined', () => {
      expect(isUndefined(null)).toBe(false)
      expect(isUndefined({})).toBe(false)
      expect(isUndefined([])).toBe(false)
      expect(isUndefined('')).toBe(false)
      expect(isUndefined(0)).toBe(false)
      expect(isUndefined(false)).toBe(false)
      expect(isUndefined(() => {})).toBe(false)
    })
  })

  describe('isNull', () => {
    test('should return true for null', () => {
      expect(isNull(null)).toBe(true)
    })

    test('should return false for non-null', () => {
      expect(isNull(undefined)).toBe(false)
      expect(isNull({})).toBe(false)
      expect(isNull([])).toBe(false)
      expect(isNull('')).toBe(false)
      expect(isNull(0)).toBe(false)
      expect(isNull(false)).toBe(false)
      expect(isNull(() => {})).toBe(false)
    })
  })

  describe('isNullOrUndefined', () => {
    test('should return true for null or undefined', () => {
      expect(isNullOrUndefined(null)).toBe(true)
      expect(isNullOrUndefined(undefined)).toBe(true)
      let undefinedVar
      expect(isNullOrUndefined(undefinedVar)).toBe(true)
    })

    test('should return false for non-null and non-undefined', () => {
      expect(isNullOrUndefined({})).toBe(false)
      expect(isNullOrUndefined([])).toBe(false)
      expect(isNullOrUndefined('')).toBe(false)
      expect(isNullOrUndefined(0)).toBe(false)
      expect(isNullOrUndefined(false)).toBe(false)
      expect(isNullOrUndefined(() => {})).toBe(false)
    })
  })

  describe('isEmpty', () => {
    test('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
    })

    test('should return false for non-empty values', () => {
      expect(isEmpty('string')).toBe(false)
      expect(isEmpty([1, 2, 3])).toBe(false)
      expect(isEmpty({ key: 'value' })).toBe(false)
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(false)).toBe(false)
      expect(isEmpty(() => {})).toBe(false)
    })
  })

  describe('merge', () => {
    test('should merge objects', () => {
      const target = { a: 1, b: 2 }
      const source = { b: 3, c: 4 }

      const result = merge(target, source)

      expect(result).toEqual({ a: 1, b: 3, c: 4 })
      expect(result).toBe(target) // Should modify the target object
    })

    test('should merge nested objects', () => {
      const target = { a: 1, b: { x: 1, y: 2 } }
      const source = { b: { y: 3, z: 4 }, c: 5 }

      const result = merge(target, source)

      expect(result).toEqual({ a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 })
    })

    test('should merge multiple sources', () => {
      const target = { a: 1 }
      const source1 = { b: 2 }
      const source2 = { c: 3 }

      const result = merge(target, source1, source2)

      expect(result).toEqual({ a: 1, b: 2, c: 3 })
    })

    test('should return the target if no sources are provided', () => {
      const target = { a: 1 }

      const result = merge(target)

      expect(result).toBe(target)
    })
  })

  describe('formatDate', () => {
    test('should format a date according to the format string', () => {
      const date = new Date('2023-01-02T03:04:05.678Z')

      expect(formatDate(date, DateFormat.YYYY_MM_DD)).toBe('2023-01-02')
      expect(formatDate(date, DateFormat.YYYY_MM_DD)).toBe('2023/01/02')
      expect(formatDate(date, DateFormat.DD_MM_YYYY)).toBe('02/01/2023')
      expect(formatDate(date, DateFormat.HH_MM_SS)).toBe('03:04:05')
      expect(formatDate(date, DateFormat.YYYY_MM_DD_HH_MM_SS)).toBe('2023-01-02 03:04:05')
      expect(formatDate(date, DateFormat.YYYY_MM_DD_HH_MM_SS)).toBe('2023-01-02 03:04:05.678')
    })
  })
})

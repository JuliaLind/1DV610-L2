/**
 * A utility class for type checking.
 */
export class TypeChecker {
  /**
   * Checks if the value is null or undefined.
   *
   * @param {any} value - The value to check.
   * @returns { boolean } - True if the value is null or undefined, false otherwise.
   */
  isNullOrUndefined (value) {
    return value === null || value === undefined
  }

  /**
   * Checks if the value is a Date object.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - True if the value is a Date, false otherwise.
   */
  isDate (value) {
    return value instanceof Date
  }

  /**
   * Checks if the value is a primitive type.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - True if the value is a primitive, false otherwise.
   */
  isPrimitive (value) {
    return (typeof value !== 'object' && typeof value !== 'function') || this.isNullOrUndefined(value)
  }

  /**
   * Checks if the value is an array.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - True if the value is an array, false otherwise.
   */
  isArray (value) {
    return Array.isArray(value)
  }

  /**
   * Checks if the value is a function.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - True if the value is a function, false otherwise.
   */
  isFunction (value) {
    return typeof value === 'function'
  }

  /**
   * Checks if the value is a Set.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - True if the value is a Set, false otherwise.
   */
  isSet (value) {
    return value instanceof Set
  }

  /**
   * Checks if the value is a Map.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - True if the value is a Map, false otherwise.
   */
  isMap (value) {
    return value instanceof Map
  }
}

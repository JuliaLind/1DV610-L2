/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} value - The value to round.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} The rounded value.
 */
export const round = (value, decimals = 2) => {
  const adjValue = value + Number.EPSILON // add a small value to avoid floating point issues

  return Number(adjValue.toFixed(decimals))
}

/**
 * Compares two arrays for equality.
 * Equal means that they contain the same elements, regardless of order.
 *
 * @param {string[]} arr1 - first array
 * @param {string[]} arr2 - second array
 * @returns {boolean} - true if the arrays contain the same elements
 */
export const arraysAreEqual = (arr1, arr2) => {
  return JSON.stringify([...arr1].sort()) === JSON.stringify([...arr2].sort())
}

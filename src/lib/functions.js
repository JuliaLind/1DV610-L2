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

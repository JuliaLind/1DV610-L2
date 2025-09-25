/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} value - The value to round.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} The rounded value.
 */
export const round = (value, decimals = 2) => {
    return Number(value.toFixed(decimals))
}
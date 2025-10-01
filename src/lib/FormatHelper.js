/**
 * Class helps to format and normalize the data from the Norway BankAPI.
 */
export class FormatHelper {
  #rates
  #attributes
  #ids
  #dates

  #currentRate = null
  #currentAttr = null

  /**
   * Sets the rates data.
   *
   * @param {Array} rates - The rates data
   */
  setRates (rates) {
    this.#rates = rates
  }

  /**
   * Sets the attributes data.
   *
   * @param {Array} attributes - The attributes data
   */
  setAttributes (attributes) {
    this.#attributes = attributes
  }

  /**
   * Sets the currency IDs.
   *
   * @param {Array} ids - The currency IDs, for example 'SEK'
   */
  setIds (ids) {
    this.#ids = ids
  }

  /**
   * Sets the observation dates.
   *
   * @param {Array} dates - Array of the date strings
   */
  setDates (dates) {
    this.#dates = dates
  }

  /**
   * Gets the multiplier id of the current currency rate.
   *
   * @param {number} multiplierIndex - The index of the multiplier
   * @returns {string} - The multiplier id
   */
  #getMultiplierId (multiplierIndex) {
    return this.#currentRate.attributes[multiplierIndex]
  }

  /**
   * Calculates the denominator to normalize the rate value into units.
   *
   * @param {number} multiplierIndex - The index of the multiplier id to use
   * @returns {number} - The denominator to normalize the rate value into units
   */
  #calculateDenominator (multiplierIndex) {
    const multiplierId = this.#getMultiplierId(multiplierIndex)
    const powerOf = Number(this.#currentAttr.values[multiplierId].id)

    return 10 ** powerOf
  }

  /**
   * Checks if the current attribute is a multiplier index.
   *
   * @returns {boolean} - true if the current attribute is UNIT_MULT
   */
  #isMultiplierIndex () {
    return this.#currentAttr.id === 'UNIT_MULT'
  }

  /**
   * Gets the multiplier for the current exchange rate's value.
   *
   * @returns {number|undefined} - The multiplier value or undefined if not found
   */
  #getMultiplier () {
    for (const attrIndex in this.#currentRate.attributes) {
      this.#currentAttr = this.#attributes[attrIndex]

      if (this.#isMultiplierIndex()) {
        return this.#calculateDenominator(attrIndex)
      }
    }

    throw new Error('UNIT_MULT attribute missing')
  }

  /**
   * Gets the currency ID for a specific currency.
   *
   * @param {number} currencyIndex - The index of the currency
   * @returns {string} - The currency ID
   */
  getCurrency (currencyIndex) {
    return this.#ids[currencyIndex]
  }

  /**
   * Merges and normalizes the data for a specific rate.
   *
   * @returns {object} - merged and normalized data for the currency rate
   */
  #mergeAndNormalize () {
    const formatted = {}
    const multiplier = this.#getMultiplier()

    for (const dateIndex in this.#dates) {
      const rateValue = Number(this.#currentRate.observations[dateIndex][0])

      formatted[this.#dates[dateIndex]] = Number((rateValue / multiplier).toFixed(4))
    }

    return formatted
  }

  /**
   * Sets the current rate.
   *
   * @param {number} rateIndex - The index of the rate to set as current
   */
  #setCurrentRate (rateIndex) {
    this.#currentRate = this.#rates[rateIndex]
  }

  /**
   * Formats the data for a specific currency.
   *
   * @param {number} currencyIndex - index of the currency to format
   * @returns {object} - The formatted currency data
   */
  formatOneCurrency (currencyIndex) {
    this.#setCurrentRate(currencyIndex)

    return this.#mergeAndNormalize()
  }
}

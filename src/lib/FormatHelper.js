/**
 * Class helps to format and normalize the data from the Norway BankAPI.
 */
export class FormatHelper {
  #rates
  // #attributes
  #ids
  #dates
  #multipliers

  #currentCurrency = null

  #denominator = null

  /**
   * Sets the rates data.
   *
   * @param {Array} rates - The rates data
   */
  setRates (rates) {
    this.#rates = rates
  }

  /**
   * Sets the multipliers data.
   *
   * @param {object[]} multipliers - The multipliers data
   */
  setMultipliers (multipliers) {
    this.#multipliers = multipliers
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
   * Calculates the denominator to normalize the rate value into units.
   *
   * @returns {number} - The denominator to normalize the rate value into units
   */
  #setDenominator () {
    const multiplierIndex = this.#currentCurrency.attributes[0]

    const powerOf = Number(this.#multipliers[multiplierIndex].id)

    this.#denominator = 10 ** powerOf
  }


  /**
   * Gets the currency ID for a specific currency.
   *
   * @param {number} currencyIndex - The index of the currency
   * @returns {string} - The currency ID
   */
  getCurrencyId (currencyIndex) {
    return this.#ids[currencyIndex]
  }

  /**
   * Merges and normalizes all observations for a specific rate.
   *
   * @returns {object} - merged and normalized observations for the currency rate
   */
  #normalize () {
    this.#setDenominator()

    const normalized = {}

    for (const dateIndex in this.#dates) {
      normalized[this.#getObservationDate(dateIndex)] = this.#getObservationValue(dateIndex)
    }

    return normalized
  }

  /**
   * Gets the normalized observation value of the current currency
   * for a specific date, based on dateIndex.
   *
   * @param {number} dateIndex - The index of the date to get the observation value for.
   * @returns {number} - The normalized observation value.
   */
  #getObservationValue (dateIndex) {
    const observationValue = Number(this.#currentCurrency.observations[dateIndex][0])

    return Number((observationValue / this.#denominator).toFixed(4))
  }

  /**
   * Gets the observation date for a specific index.
   *
   * @param {number} dateIndex - The index of the date to get.
   * @returns {string} - The observation date.
   */
  #getObservationDate (dateIndex) {
    return this.#dates[dateIndex]
  }

  /**
   * Sets the current rate.
   *
   * @param {number} currencyIndex - The index of the currency to set as current
   */
  #setCurrentCurrency (currencyIndex) {
    this.#currentCurrency = this.#rates[currencyIndex]
  }

  /**
   * Formats the data for a specific currency.
   *
   * @param {number} currencyIndex - index of the currency to format
   * @returns {object} - The formatted currency data
   */
  formatOneCurrency (currencyIndex) {
    this.#setCurrentCurrency(currencyIndex)

    return this.#normalize()
  }
}

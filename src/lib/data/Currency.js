/**
 * Class representing a currency and its exchange rate observations.
 */
export class Currency {
  #id
  #observations = {}
  #datedRates = {}
  #attributes
  #denominator
  #dates
  #multipliers

  /**
   * Create a new currency.
   *
   * @param {object} data - The data neccessary to initialize the currency.
   */
  constructor (data) {
    this.#id = data.id
    this.#observations = data.observations
    this.#attributes = data.attributes
    this.#dates = data.dates
    this.#multipliers = data.multipliers
  }

  /**
   * Gets the multiplier adjusted rates for the currency.
   *
   * @returns {object} - multiplier adjusted rates for the currency
   */
  getRates () {
    if (!this.#isFormatted()) {
      this.#format()
    }

    return this.#datedRates
  }

  /**
   * Gets the currency id.
   *
   * @returns {string} - The currency id, for example 'USD'.
   */
  getId () {
    return this.#id
  }

  /**
   * Checks if the currency has already been formatted.
   *
   * @returns {boolean} - Whether the currency has been formatted.
   */
  #isFormatted () {
    return false
    // return Object.keys(this.#observations).length === Object.keys(this.#datedRates).length
  }

  /**
   * Formats the observations for the currency,
   * by merging dates with multiplier adjusted observations.
   *
   * @returns {object} - The formatted observations.
   */
  #format () {
    this.#setDenominator()
    const dateIndices = this.#getDateIndices()

    for (const index in dateIndices) {
      this.#datedRates[this.#getObservationDate(dateIndices[index])] = this.#getObservedValue(index)
    }
  }

  /**
   * Sets the denominator for normalization based on the unit multiplier.
   */
  #setDenominator () {
    const multiplierIndex = this.#attributes[0]
    const powerOf = Number(this.#multipliers[multiplierIndex].id)

    this.#denominator = 10 ** powerOf
  }

  /**
   * Gets the date indices for the observations.
   *
   * @returns {Array<number>} - The date indices.
   */
  #getDateIndices () {
    return Object.keys(this.#observations)
  }

  /**
   * Gets the observation date for a specific index.
   *
   * @param {number} dateIndex - The index of the date to get.
   * @returns {string} - The observation date.
   */
  #getObservationDate (dateIndex) {
    return this.#dates[Object.keys(this.#dates)[dateIndex]]
  }

  /**
   * Gets the normalized observation value of the current currency
   * for a specific date, based on dateIndex.
   *
   * @param {number} dateIndex - The index of the date to get the observation value for.
   * @returns {number} - The normalized observation value.
   */
  #getObservedValue (dateIndex) {
    const observationValue = Number(Object.values(this.#observations)[dateIndex])

    return Number((observationValue / this.#denominator).toFixed(4))
  }
}

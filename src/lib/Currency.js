/**
 *
 */
export class Currency {
  #id
  #observations
  #normalizedObservations = {}
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
   * Gets the normalized rates for the currency.
   *
   * @returns {object} - normalized rates for the currency
   */
  getNormalizedRates () {
    if (!this.#isNormalized()) {
      this.#normalize()
    }

    return this.#normalizedObservations
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
   * Checks if the currency has already been normalized.
   *
   * @returns {boolean} - Whether the currency has been normalized.
   */
  #isNormalized () {
    return this.#observations.length === Object.keys(this.#normalizedObservations).length
  }

  /**
   * Normalizes the observations for the currency.
   *
   * @returns {object} - The normalized observations.
   */
  #normalize () {
    this.#setDenominator()
    const dateIndices = this.#getDateIndices()

    for (const index in dateIndices) {
      this.#normalizedObservations[this.#getObservationDate(dateIndices[index])] = this.#getObservedValue(index)
    }

    return this.#normalizedObservations
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

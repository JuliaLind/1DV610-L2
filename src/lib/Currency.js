export class Currency {
  #id
  #observations
  #normalizedObservations = {}
  #attributes
  #denominator
  #dates
  #multipliers

  constructor(data) {
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
  getNormalizedRates() {
    if (!this.#isNormalized()) {
      this.#normalize()
    }

    return this.#normalizedObservations
  }

  getId() {
    return this.#id
  }

  #isNormalized() {
    return this.#observations.length === Object.keys(this.#normalizedObservations).length 
  }

  #normalize() {
    this.#setDenominator()
    const dateIndeces = this.#getDateIndeces()

    for (const index in dateIndeces) {
      this.#normalizedObservations[this.#getObservationDate(dateIndeces[index])] = this.#getObservedValue(index)
    }

    return this.#normalizedObservations
  }

  #setDenominator() {
    const multiplierIndex = this.#attributes[0]
    const powerOf = Number(this.#multipliers[multiplierIndex].id)

    this.#denominator = 10 ** powerOf
  }

  #getDateIndeces() {
    return Object.keys(this.#observations)
  }


  /**
   * Gets the observation date for a specific index.
   *
   * @param {number} dateIndex - The index of the date to get.
   * @returns {string} - The observation date.
   */
  #getObservationDate(dateIndex) {
    return this.#dates[Object.keys(this.#dates)[dateIndex]]
  }


  /**
   * Gets the normalized observation value of the current currency
   * for a specific date, based on dateIndex.
   *
   * @param {number} dateIndex - The index of the date to get the observation value for.
   * @returns {number} - The normalized observation value.
   */
  #getObservedValue(dateIndex) {
    const observationValue = Number(Object.values(this.#observations)[dateIndex])

    return Number((observationValue / this.#denominator).toFixed(4))
  }

}
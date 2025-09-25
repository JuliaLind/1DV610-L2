/**
 *
 */
export class RateNormalizer {
  #fromCurrency
  #toCurrencies
  #normalizedRates = null

  /**
   * Sets the base currency for normalization.
   *
   * @param {string} value - The currency code to set as the base currency.
   */
  setFromCurrency (value) {
    this.#fromCurrency = value
  }

  /**
   * Gets the current base currency.
   *
   * @returns {string} - The current base currency.
   */
  getFromCurrency () {
    return this.#fromCurrency
  }

  /**
   * Resets the cached normalized rates.
   */
  reset () {
    this.#normalizedRates = null
  }

  /**
   * Checks if normalized rates are cached.
   *
   * @returns {boolean} - True if normalized rates are cached, false otherwise.
   */
  hasCachedRates () {
    return this.#normalizedRates !== null
  }

  /**
   * Sets the target currencies for normalization.
   *
   * @param {string[]} values - The currency codes to set as target currencies.
   */
  setToCurrencies (values) {
    this.#toCurrencies = values
  }

  /**
   * Normalizes the fetched exchange rates.
   *
   * @param {object} rates - The fetched exchange rates.
   */
  normalize (rates) {
    const fromRate = rates[this.#fromCurrency][0]
    const normalized = {}

    for (const toCurrency of this.#toCurrencies) {
      const toRate = rates[toCurrency][0]

      normalized[toCurrency] = toRate / fromRate
    }
    this.#normalizedRates = normalized
  }

  /**
   * Returns the normalized exchange rates.
   *
   * @returns {object} - The normalized exchange rates.
   */
  getNormalizedRates () {
    return this.#normalizedRates
  }
}

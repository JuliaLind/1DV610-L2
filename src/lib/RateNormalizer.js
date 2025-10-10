import { round } from './functions.js'

/**
 * Class to normalize exchange rates based on a selected base currency.
 */
export class RateNormalizer {
  #baseCurrency
  #targetCurrencies
  #normalizedRates = {}

  /**
   * Sets the base currency for normalization.
   *
   * @param {string} value - The currency code to set as the base currency.
   */
  setBaseCurrency (value) {
    this.#baseCurrency = value
  }

  /**
   * Gets the current base currency.
   *
   * @returns {string} - The current base currency.
   */
  getBaseCurrency () {
    return this.#baseCurrency
  }

  /**
   * Resets the cached normalized rates.
   */
  reset () {
    this.#normalizedRates = {}
  }

  /**
   * Checks if normalized rates are cached.
   *
   * @returns {boolean} - True if normalized rates are cached, false otherwise.
   */
  hasCachedRates () {
    return Object.keys(this.#normalizedRates).length > 0
  }

  /**
   * Sets the target currencies for normalization.
   *
   * @param {string[]} values - The currency codes to set as target currencies.
   */
  setTargetCurrencies (values) {
    this.#targetCurrencies = values
  }

  /**
   * Gets the current target currencies.
   *
   * @returns {string[]} - The current target currencies.
   */
  getTargetCurrencies () {
    return [...this.#targetCurrencies]
  }

  /**
   * Normalizes the fetched exchange rates.
   *
   * @param {object} rates - The fetched exchange rates.
   */
  normalize (rates) {
    const fromRate = Object.values(rates[this.#baseCurrency])[0]
    const normalized = {}

    for (const toCurrency of this.#targetCurrencies) {
      const toRate = toCurrency === 'NOK' ? 1 : Object.values(rates[toCurrency])[0]

      normalized[toCurrency] = round(toRate / fromRate, 4)
    }
    this.#normalizedRates = normalized
  }

  /**
   * Returns the normalized exchange rates.
   *
   * @returns {object} - The normalized exchange rates.
   */
  getNormalizedRates () {
    return { ...this.#normalizedRates }
  }
}

import { round } from './functions.js'

/**
 * Class to normalize exchange rates based on a selected base currency.
 */
export class RateNormalizer {
  #baseCurrency
  #targetCurrencies
  #normalizedRates = {}
  #ORIGINAL_BASE = 'NOK'

  /**
   * Sets the base currency for normalization.
   *
   * @param {string} value - The currency code to set as the base currency.
   */
  setBaseCurrency(value) {
    this.#baseCurrency = value
  }

  /**
   * Gets the current base currency.
   *
   * @returns {string} - The current base currency.
   */
  getBaseCurrency() {
    return this.#baseCurrency
  }

  /**
   * Resets the cached normalized rates.
   */
  reset() {
    this.#normalizedRates = {}
  }

  /**
   * Checks if normalized rates are cached.
   *
   * @returns {boolean} - True if normalized rates are cached, false otherwise.
   */
  hasCachedRates() {
    return Object.keys(this.#normalizedRates).length > 0
  }

  /**
   * Sets the target currencies for normalization.
   *
   * @param {string[]} values - The currency codes to set as target currencies.
   */
  setTargetCurrencies(values) {
    this.#targetCurrencies = values
  }

  /**
   * Gets the current target currencies.
   *
   * @returns {string[]} - The current target currencies.
   */
  getTargetCurrencies() {
    return [...this.#targetCurrencies]
  }

  /**
   * Normalizes the fetched exchange rates.
   *
   * @param {object} rates - The fetched exchange rates.
   */
  normalize(rates) {
    const baseRate = Object.values(rates[this.#baseCurrency])[0]
    const normalized = {}

    for (const currency of this.#targetCurrencies) {
      const targetRate = this.#getTargetRate(currency, rates)

      normalized[currency] = this.#normalizeOne(targetRate, baseRate)
    }

    this.#normalizedRates = normalized
  }


  /**
   * Returns the normalized exchange rates.
   *
   * @returns {object} - The normalized exchange rates.
   */
  getNormalizedRates() {
    return { ...this.#normalizedRates }
  }

  /**
   * Normalizes a single exchange rate based on the base rate.
   *
   * @param  {number} targetRate - The target currency rate.
   * @param  {number} baseRate - The base currency rate.
   * @returns {number} - The normalized target exchange rate.
   */
  #normalizeOne(targetRate, baseRate) {
    return round(targetRate / baseRate, 4)
  }

  /**
   * Gets the target exchange rate for a specific currency.
   *
   * @param  {string} currency - The currency code to get the target rate for.
   * @param  {object} rates - The fetched exchange rates.
   * @returns {number} - The target exchange rate.
   */
  #getTargetRate(currency, rates) {
    if (currency === this.#ORIGINAL_BASE) {
      return 1
    }

    return Object.values(rates[currency])[0]
  }
}

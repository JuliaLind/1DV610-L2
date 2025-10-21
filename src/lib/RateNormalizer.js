import { round } from './functions.js'

/**
 * Class to normalize exchange rates based on a selected base currency.
 */
export class RateNormalizer {
  #baseCurrency = ''
  #targetCurrencies = []
  #originalRates = {}
  #normalizedRates = {}
  #ORIGINAL_BASE = {
    id: 'NOK',
    value: 1
  }

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
    this.reset()
    this.#setOriginalRates(rates)
    this.#rebaseRates(this.#getBaseRate())
  }

  /**
   * Resets the cached normalized rates.
   */
  reset () {
    this.#normalizedRates = {}
    this.#originalRates = {}
  }

  /**
   * Sets the original exchange rates.
   *
   * @param {object} rates - the original exchange rates
   */
  #setOriginalRates (rates) {
    this.#originalRates = { ...rates }
  }

  /**
   * Gets the base exchange rate for the current base currency.
   *
   * @returns {number} - the base rate
   */
  #getBaseRate () {
    if (this.#baseCurrency === this.#ORIGINAL_BASE.id) {
      return this.#ORIGINAL_BASE.value
    }

    return Object.values(this.#originalRates[this.#baseCurrency])[0]
  }

  /**
   * Rebases the exchange rates based on the base rate.
   *
   * @param {number} baseRate - the exchange rate to use as base for conversion
   */
  #rebaseRates (baseRate) {
    for (const currency of this.#targetCurrencies) {
      const targetRate = this.#getTargetRate(currency)

      this.#normalizedRates[currency] = this.#normalizeOne(targetRate, baseRate)
    }
  }

  /**
   * Gets the target exchange rate for a specific currency.
   *
   * @param  {string} currency - The currency code to get the target rate for.
   * @returns {number} - The target exchange rate.
   */
  #getTargetRate (currency) {
    if (currency === this.#ORIGINAL_BASE.id) {
      return this.#ORIGINAL_BASE.value
    }

    return Object.values(this.#originalRates[currency])[0]
  }

  /**
   * Normalizes a single exchange rate based on the base rate.
   *
   * @param  {number} targetRate - The target currency rate.
   * @param  {number} baseRate - The base currency rate.
   * @returns {number} - The normalized target exchange rate.
   */
  #normalizeOne (targetRate, baseRate) {
    return round(targetRate / baseRate, 4)
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
   * Returns the normalized exchange rates.
   *
   * @returns {object} - The normalized exchange rates.
   */
  getNormalizedRates () {
    return { ...this.#normalizedRates }
  }
}

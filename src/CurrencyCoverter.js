import { RateFetcher } from './RateFetcher.js'
import { RateNormalizer } from './lib/RateNormalizer.js'
import { round, arraysAreEqual } from './lib/functions.js'

/**
 * Manages conversion between currencies
 */
export class CurrencyConverter {
  #fetcher
  #normalizer
  #baseCurrency = null
  #targetCurrencies = []

  /**
   * Creates an instance of CurrencyConverter.
   *
   * @param {object} dependencies - Configuration object for dependencies
   * @param {RateFetcher} dependencies.fetcher - Instance of RateFetcher
   * @param {RateNormalizer} dependencies.normalizer - Instance of RateNormalizer
   */
  constructor (dependencies = {
    fetcher: new RateFetcher(),
    normalizer: new RateNormalizer()
  }) {
    this.#fetcher = dependencies.fetcher
    this.#normalizer = dependencies.normalizer
  }

  /**
   * Sets the base currency for conversion.
   * If the currency is changed, cached rates are cleared.
   *
   * @param {string} value - The currency code to set as the base currency.
   */
  setBaseCurrency (value) {
    const current = this.#baseCurrency

    this.#baseCurrency = value

    if (current && current !== value) {
      this.#normalizer.reset()
    }
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
   * Sets the target currencies for conversion.
   * If the currencies are changed, cached rates are cleared.
   *
   * @param {string[]} values - The currency codes to set as target currencies.
   */
  setTargetCurrencies (values) {
    const current = this.#targetCurrencies

    this.#targetCurrencies = values

    if (current.length > 0 && !arraysAreEqual(values, current)) {
      this.#normalizer.reset()
    }
  }

  /**
   * Gets the current target currencies.
   *
   * @returns {string[]} - The current target currencies.
   */
  getTargetCurrencies () {
    return this.#targetCurrencies
  }

  /**
   * Clears the base and target currencies and resets cached rates.
   */
  clear () {
    this.#baseCurrency = null
    this.#targetCurrencies = []
    this.#normalizer.reset()
  }

  /**
   * Converts the specified amount from the base currency to the target currencies.
   *
   * @param {number} amount - The amount to convert.
   * @returns {Promise<object>} - The conversion results.
   */
  async convert (amount) {
    this.#isReady()
    await this.#prep()
    return this.#recalc(amount)
  }

  /**
   * Checks if the converter is fully initialized.
   * Throws an error if not.
   *
   * @throws {Error} - If the converter is not fully initialized.
   */
  #isReady () {
    if (!this.#baseCurrency || this.#targetCurrencies?.length === 0) {
      throw new Error('CurrencyConverter is not fully initialized')
    }
  }

  /**
   * Prepares the converter by fetching and normalizing rates.
   *
   * @returns {Promise<void>} - A promise that resolves when preparation is complete.
   */
  async #prep () {
    if (this.#normalizer.hasCachedRates()) {
      return
    }

    this.#isReady()
    this.#fetcher.setCurrencies([this.#baseCurrency, ...this.#targetCurrencies])
    const rates = await this.#fetcher.fetchLatest()

    this.#normalizer.setBaseCurrency(this.#baseCurrency)
    this.#normalizer.setTargetCurrencies(this.#targetCurrencies)
    this.#normalizer.normalize(rates)
  }

  /**
   * Recalculates the conversion results for the specified amount.
   *
   * @param {number} amount - The amount to convert.
   * @returns {object} - The conversion results.
   */
  #recalc (amount) {
    const results = {}
    const rates = this.#normalizer.getNormalizedRates()

    for (const currency of this.#targetCurrencies) {
      results[currency] = round(amount / rates[currency])
    }

    return results
  }
}

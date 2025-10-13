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
  constructor (dependencies) {
    this.#fetcher = dependencies?.fetcher || new RateFetcher()
    this.#normalizer = dependencies?.normalizer || new RateNormalizer()
  }

  /**
   * Sets the base currency for conversion.
   * If the currency is changed, cached rates are cleared.
   *
   * @param {string} value - The currency code to set as the base currency.
   */
  setBaseCurrency (value) {
    if (this.#isBaseChanged(value)) {
      this.#normalizer.reset()
    }

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
   * Sets the target currencies for conversion.
   * If the currencies are changed, cached rates are cleared.
   *
   * @param {string[]} values - The currency codes to set as target currencies.
   */
  setTargetCurrencies (values) {
    if (this.#isTargetChanged(values)) {
      this.#normalizer.reset()
    }

    this.#targetCurrencies = values
  }

  /**
   * Checks if the target currencies have changed.
   *
   * @param {string[]} newValue - The new target currencies.
   * @returns {boolean} - True if the target currencies have changed, false otherwise.
   */
  #isTargetChanged (newValue) {
    return this.#targetCurrencies.length > 0 && !arraysAreEqual(newValue, this.#targetCurrencies)
  }

  /**
   * Checks if the base currency has changed.
   *
   * @param {string} newValue - The new base currency.
   * @returns {boolean} - True if the base currency has changed, false otherwise.
   */
  #isBaseChanged (newValue) {
    return this.#baseCurrency && this.#baseCurrency !== newValue
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
   * Resets the base and target currencies and the cached rates.
   */
  reset () {
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
    this.#alertIfNotReady()
    await this.#prepareRates()

    return this.#convert(amount)
  }

  /**
   * Checks if the converter is fully initialized.
   * Throws an error if not.
   *
   * @throws {Error} - If the converter is not fully initialized.
   */
  #alertIfNotReady () {
    if (!this.#hasCurrencies()) {
      throw new Error('CurrencyConverter is not fully initialized')
    }
  }

  /**
   * Checks if both base and target currencies are set.
   *
   * @returns {boolean} - True if both base and target currencies are set, false otherwise.
   */
  #hasCurrencies () {
    return this.#baseCurrency && this.#targetCurrencies?.length > 0
  }

  /**
   * Prepares the converter by fetching and normalizing rates.
   *
   * @returns {Promise<void>} - A promise that resolves when preparation is complete.
   */
  async #prepareRates () {
    if (!this.#normalizer.hasCachedRates()) {
      this.#getRatesFromApi()
    }
  }

  /**
   * Fetches rates from the API.
   */
  async #getRatesFromApi () {
    this.#alertIfNotReady()
    this.#assignCurrencies()
    this.#fetchAndNormalize()
  }

  /**
   * Fetches and normalizes exchange rates
   * from the external API.
   */
  async #fetchAndNormalize () {
    const rates = await this.#fetcher.fetchLatest()
    this.#normalizer.normalize(rates)
  }

  /**
   * Assigns the base and target currencies to the fetcher and normalizer.
   */
  #assignCurrencies () {
    this.#fetcher.setCurrencies([this.#baseCurrency, ...this.#targetCurrencies])
    this.#normalizer.setBaseCurrency(this.#baseCurrency)
    this.#normalizer.setTargetCurrencies(this.#targetCurrencies)
  }

  /**
   * Converts the specified amount from the base currency to the target currencies.
   *
   * @param {number} amount - The amount to convert.
   * @returns {object} - The conversion results.
   */
  #convert (amount) {
    const rates = this.#normalizer.getNormalizedRates()

    return this.#convertToEachTarget(amount, rates)
  }

  /**
   * Converts the specified amount from the base currency to the target currencies.
   *
   * @param {number} amount - The amount to convert.
   * @param {object} rates - The exchange rates.
   * @returns {object} - The conversion results.
   */
  #convertToEachTarget (amount, rates) {
    const converted = {}

    for (const currency of this.#targetCurrencies) {
      converted[currency] = round(amount / rates[currency])
    }

    return converted
  }
}

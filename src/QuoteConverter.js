import { RateFetcher } from './RateFetcher.js'
import { round } from './lib/functions.js'

/**
 * Converts stock quotes from NOK to
 * other currencies using exchange rates from Norges Bank.
 */
export class QuoteConverter {
  #fetcher
  #quotes = []
  #currencies = []
  #rates = {}

  /**
   * Creates an instance of QuoteConverter.
   *
   * @param {object} dependencies - Configuration object for dependencies
   * @param {RateFetcher} dependencies.fetcher - Instance of RateFetcher
   */
  constructor (dependencies = {
    fetcher: new RateFetcher()
  }) {
    this.#fetcher = dependencies.fetcher
  }

  /**
   * Sets the target currencies for conversion.
   * If the currencies are changed, cached rates are cleared.
   *
   * @param {string[]} values - The currency codes to set as target currencies.
   */
  setCurrencies (values) {
    this.#currencies = values
  }

  /**
   * Gets the current target currencies.
   *
   * @returns {string[]} - The current target currencies.
   */
  getCurrencies () {
    return this.#currencies
  }

  /**
   * Converts stock quotes from NOK to the target currencies.
   *
   * @param {object} quotes - The quotes to convert.
   * @returns {Promise<object>} - The conversion results.
   */
  async convert (quotes) {
    this.#isReady()
    await this.#prep(quotes)
    return this.#calcMany(quotes)
  }

  /**
   * Checks if the converter is fully initialized.
   * Throws an error if not.
   *
   * @throws {Error} - If the converter is not fully initialized.
   */
  #isReady () {
    if (this.#currencies?.length === 0) {
      throw new Error('QuoteConverter is not fully initialized')
    }
  }

  /**
   * Prepares the converter by fetching rates.
   *
   * @returns {Promise<void>} - A promise that resolves when preparation is complete.
   */
  async #prep (quotes) {
    this.#isReady()
    this.#fetcher.setCurrencies(this.#currencies)
    const { from, to } = this.#extractPeriod(Object.keys(quotes))
    this.#rates = await this.#fetcher.fetchByPeriod(from, to)
  }

  /**
   * Extracts the period covered by the quotes.
   *
   * @returns {object} - The period covered by the quotes.
   */
  #extractPeriod (quotes) {
    return {
      from: quotes[quotes.length - 1],
      to: quotes[0]
    }
  }

  /**
   * Recalculates the conversion results for the specified amount.
   *
   * @param {number} amount - The amount to convert.
   * @param quotes
   * @returns {object} - The conversion results.
   */
  #calcMany (quotes) {
    const final = {}
    Object.entries(quotes).forEach(([date, nokValue]) => {
      const quote = { date, NOK: nokValue }
      final[date] = this.#calcOne(quote)
    })

    return final
  }

  /**
   * Recalculates the conversion results for a single quote.
   *
   * @param {object} quote - The quote to convert.
   */
  #calcOne (quote) {
    const calculated = {
      NOK: quote.NOK
    }
    for (const currency of this.#currencies) {
      const rate = this.#rates[currency][quote.date]
      calculated[currency] = round(quote.NOK / rate)
    }
    return calculated
  }
}

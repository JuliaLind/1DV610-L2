import { RateFetcher } from './RateFetcher.js'
import { round } from './lib/functions.js'

/**
 * Converts stock quotes from NOK to
 * other targetCurrencies using exchange rates from Norges Bank.
 */
export class QuoteConverter {
  #fetcher
  #targetCurrencies = []
  #rates = {}
  #quotes = {}

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
   * Sets the target targetCurrencies for conversion.
   * If the targetCurrencies are changed, cached rates are cleared.
   *
   * @param {string[]} values - The currency codes to set as target targetCurrencies.
   */
  setTargetCurrencies (values) {
    this.#targetCurrencies = values
  }

  /**
   * Converts stock quotes from NOK to the target targetCurrencies.
   *
   * @param {object} quotes - The quotes to convert.
   * @returns {Promise<object>} - The conversion results.
   */
  async convert (quotes) {
    this.#setQuotes(quotes)
    await this.#prep()

    return this.#convertAll()
  }

  /**
   * Sets the quotes to convert.
   *
   * @param {object} quotes - The quotes to convert.
   */
  #setQuotes (quotes) {
    this.#quotes = quotes
  }

  /**
   * Checks if the converter is fully initialized.
   * Throws an error if not.
   *
   * @throws {Error} - If the converter is not fully initialized.
   */
  #alertIfNotReady () {
    if (this.#targetCurrencies?.length === 0) {
      throw new Error('QuoteConverter is not fully initialized')
    }
  }

  /**
   * Prepares the converter by fetching rates.
   *
   * @returns {Promise<void>} - A promise that resolves when preparation is complete.
   */
  async #prep () {
    this.#alertIfNotReady()
    await this.#fetchRates()
  }

  /**
   * Fetches exchange rates for the target currencies.
   */
  async #fetchRates () {
    this.#fetcher.setCurrencies(this.#targetCurrencies)
    const { from, to } = this.#getPeriod()

    this.#rates = await this.#fetcher.fetchByPeriod(from, to)
  }

  /**
   * Extracts the period covered by the quotes.
   *
   * @returns {object} - The period covered by the quotes.
   */
  #getPeriod () {
    const dates = Object.keys(this.#quotes)

    return {
      from: dates[dates.length - 1],
      to: dates[0]
    }
  }

  /**
   * Converts all quotes to the target currencies.
   *
   * @returns {object} - The conversion results.
   */
  #convertAll () {
    const final = {}

    Object.entries(this.#quotes).forEach(([date, nokValue]) => {
      const quote = { date, NOK: nokValue }
      final[date] = this.#convertOne(quote)
    })

    return final
  }

  /**
   * Converts a single quote to the target currencies.
   *
   * @param {object} quote - The quote to convert.
   * @returns {object} - The conversion results for the quote.
   */
  #convertOne (quote) {
    const calculated = {
      NOK: quote.NOK
    }
    for (const currency of this.#targetCurrencies) {
      const rate = this.#rates[currency][quote.date]
      calculated[currency] = round(quote.NOK / rate)
    }
    return calculated
  }
}

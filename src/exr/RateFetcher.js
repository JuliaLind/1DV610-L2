import { JsonFetchService } from './lib/JsonFetchService.js'
import { DataFormatter } from './lib/DataFormatter.js'

/**
 * Fetches exchange rates from Norges Bank.
 */
export class RateFetcher {
  #fetchService
  #formatter

  #params = {
    /**
     * Gets the query parameter for number of items to fetch.
     *
     * @param {number} count - The number of observations to fetch from the end
     * @returns {string} - The nr of items query parameter
     */
    items: (count) => 'lastNObservations=' + count,

    /**
     * Gets the query parameter for JSON format.
     *
     * @returns {string} - The JSON format query parameter
     */
    json: () => 'format=sdmx-json',
    /**
     * Gets the query parameter for the from date.
     *
     * @param {string} date - The start date
     * @returns {string} - The start date query parameter
     */
    from: (date) => 'startPeriod=' + date,
    /**
     * Gets the query parameter for the to date.
     *
     * @param {string} date - The end date
     * @returns {string} - The end date query parameter
     */
    to: (date) => 'endPeriod=' + date
  }

  /**
   * Creates an instance of RateService.
   *
   * @param {string[]} currencies - The currencies to fetch rates for
   * @param {object} config - Configuration object for dependencies
   * @param {JsonFetchService} config.fetchService - Instance of JsonFetchService
   * @param {DataFormatter} config.dataFormatter - Instance of DataFormatter
   */
  constructor (currencies, config = {
    fetchService: new JsonFetchService(),
    dataFormatter: new DataFormatter()
  }) {
    const baseUrl = `https://data.norges-bank.no/api/data/EXR/B.${currencies.join('+')}.NOK.SP`

    this.#fetchService = config.fetchService
    this.#formatter = config.dataFormatter
    this.#fetchService.setBaseUrl(baseUrl)
  }

  /**
   * Fetch exchange rates by date.
   *
   * @param {string} date - The date to fetch rates for.
   * @param {number} count - The number of observations to fetch prior to and including the specified date (default is 1).
   * @returns {Promise<object>} - The fetched exchange rates.
   */
  async fetchByDate (date, count = 1) {
    const queryString = `${this.#params.to(date)}&${this.#params.items(count)}&${this.#params.json()}`

    const raw = await this.#fetchService.get(queryString)
    return this.#formatter.format(raw)
  }

  /**
   * Fetch exchange rates from the latest available date.
   *
   * @returns {Promise<object>} - The exchange rates from the latest available date.
   */
  async fetchLatest () {
    const queryString = `${this.#params.items(1)}&${this.#params.json()}`

    const raw = await this.#fetchService.get(queryString)
    return this.#formatter.format(raw)
  }

  /**
   * Fetch exchange rates by period.
   *
   * @param {string} startDate - The start date of the period.
   * @param {string} endDate - The end date of the period.
   * @returns {Promise<object>} - The fetched exchange rates for the period.
   */
  async fetchByPeriod (startDate, endDate) {
    const queryString = `${this.#params.from(startDate)}&${this.#params.to(endDate)}&${this.#params.json()}`

    const raw = await this.#fetchService.get(queryString)
    return this.#formatter.format(raw)
  }
}

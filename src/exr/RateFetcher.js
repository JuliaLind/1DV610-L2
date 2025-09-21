import { JsonFetchService } from './lib/JsonFetchService.js'

/**
 * Fetches exchange rates from Norges Bank.
 */
export class RateFetcher {
  #fetchService
  #formatter

  #params = {
    /**
     *
     * @param count
     */
    items: (count) => 'lastNObservations=' + count,
    /**
     *
     */
    json: () => 'format=sdmx-json',
    /**
     *
     * @param date
     */
    from: (date) => 'startPeriod=' + date,
    /**
     *
     * @param date
     */
    to: (date) => 'endPeriod=' + date
  }

  /**
   * Creates an instance of RateService.
   *
   * @param {string[]} currencies - The currencies to fetch rates for.
   * @param {JsonFetchService} fetchService - The fetch service to use.
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

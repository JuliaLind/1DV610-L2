import { JsonFetchService } from './lib/JsonFetchService.js'
import { DataFormatter } from './lib/DataFormatter.js'

/**
 * Fetches exchange rates from Norges Bank.
 */
export class RateFetcher {
  #fetchService
  #formatter
  #baseDataFetcher

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
   * @param {object} dependencies - Configuration object for dependencies
   * @param {JsonFetchService} dependencies.fetchService - Instance of JsonFetchService
   * @param {DataFormatter} dependencies.dataFormatter - Instance of DataFormatter
   */
  constructor(dependencies = {
    fetchService: new JsonFetchService(),
    dataFormatter: new DataFormatter(),
    baseDataFetcher: new BaseDataFetcher()
  }) {
    this.#fetchService = dependencies.fetchService
    this.#formatter = dependencies.dataFormatter
    this.#baseDataFetcher = dependencies.baseDataFetcher
  }

  /**
   * Sets the currencies to fetch rates for.
   *
   * @param {string[]} currencies - The currencies to fetch rates for
   */
  setCurrencies(currencies) {
    const baseUrl = `https://data.norges-bank.no/api/data/EXR/B.${currencies.join('+')}.NOK.SP?attributes=UNIT_MULT`

    this.#fetchService.setBaseUrl(baseUrl)
  }

  /**
   * Fetch exchange rates by date.
   *
   * @param {string} date - The date to fetch rates for.
   * @param {number} observations - The number of observations to fetch prior to and including the specified date (default is 1).
   * @returns {Promise<object>} - The fetched exchange rates.
   */
  async fetchByDate(date, observations = 1) {
    const queryString = `${this.#params.to(date)}&${this.#params.items(observations)}&${this.#params.json()}`
    const raw = await this.#fetchService.get(queryString)

    return this.#formatter.format(raw)
  }

  /**
   * Fetch exchange rates from and prior to the latest available date.
   *
   * @param {number} observations - The number of latest observations to fetch (default is 1).
   * @returns {Promise<object>} - The exchange rates from the latest available date.
   */
  async fetchLatest(observations = 1) {
    const queryString = `${this.#params.items(observations)}&${this.#params.json()}`
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
  async fetchByPeriod(startDate, endDate) {
    const queryString = `${this.#params.from(startDate)}&${this.#params.to(endDate)}&${this.#params.json()}`
    const raw = await this.#fetchService.get(queryString)

    return this.#formatter.format(raw)
  }


  /**
   * Fetches available currencies from Norges Bank.
   *
   * @returns {Promise<object[]>} - The available currencies.
   */
  async getAvailableCurrencies() {
    return await this.#baseDataFetcher.getCurrencies()
  }
}

import { JsonFetchService } from './lib/api/JsonFetchService.js'
import { ApiUrl } from './lib/api/ApiUrl.js'

/**
 * Fetches exchange rates from Norges Bank.
 */
export class RateFetcher {
  #fetchService
  #apiUrl

  /**
   * Creates an instance of RateService.
   *
   * @param {object} dependencies - Configuration object for dependencies
   * @param {JsonFetchService} dependencies.fetchService - Instance of JsonFetchService - handles JSON fetching
   * @param {ApiUrl} dependencies.apiUrl - Instance of ApiUrl - constructs API request URLs
   */
  constructor (dependencies) {
    this.#fetchService = dependencies?.fetchService || new JsonFetchService()
    this.#apiUrl = dependencies?.apiUrl || new ApiUrl()
  }

  /**
   * Fetch exchange rates by date.
   *
   * @param {object} reqParams - The request parameter s
   * @param {string[]} reqParams.currencies - The list of currency codes to fetch rates for.
   * @param {string} reqParams.date - The specific date to fetch rates for.
   * @param {number} observations - The number of observations to fetch prior to and including the specified date (default is 1).
   * @returns {Promise<object>} - The fetched exchange rates.
   */
  async fetchByDate (reqParams, observations = 1) {
    const url = this.#apiUrl.getRateRequestUrl(
      reqParams.currencies,
      {
        to: reqParams.date,
        observations
      })
    const data = await this.#fetchService.fetch(url)

    return data.getRates()
  }

  /**
   * Fetch exchange rates from and prior to the latest available date.
   *
   * @param {object} reqParams - The request parameters
   * @param {string[]} reqParams.currencies - The list of currency codes to fetch rates for.
   * @param {number} observations - The number of latest observations to fetch (default is 1).
   * @returns {Promise<object>} - The exchange rates from the latest available date.
   */
  async fetchLatest (reqParams, observations = 1) {
    const url = this.#apiUrl.getRateRequestUrl(
      reqParams.currencies,
      {
        observations
      })
    const data = await this.#fetchService.fetch(url)

    return data.getRates()
  }

  /**
   * Fetch exchange rates by period.
   *
   * @param {object} reqParams - The request parameters
   * @param {string[]} reqParams.currencies - The list of currency codes to fetch rates for.
   * @param {string} reqParams.startDate - The start date of the period (inclusive).
   * @param {string} reqParams.endDate - The end date of the period (inclusive).
   * @returns {Promise<object>} - The fetched exchange rates for the period.
   */
  async fetchByPeriod (reqParams) {
    const url = this.#apiUrl.getRateRequestUrl(
      reqParams.currencies,
      {
        from: reqParams.startDate,
        to: reqParams.endDate
      })
    const data = await this.#fetchService.fetch(url)

    return data.getRates()
  }

  /**
   * Fetches available currencies from Norges Bank.
   *
   * @returns {Promise<object[]>} - The available currencies.
   */
  async getAvailableCurrencies () {
    const url = this.#apiUrl.getCurrencyRequestUrl()
    const data = await this.#fetchService.fetch(url)

    return data.getCurrencies()
  }
}

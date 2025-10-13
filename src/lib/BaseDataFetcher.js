import { JsonFetchService } from './JsonFetchService.js'
import { DeepCloner } from './DeepCloner.js'
import { DataReader } from './DataReader.js'

/**
 * Fetches available currencies.
 */
export class BaseDataFetcher {
  #BASE_URL = 'https://data.norges-bank.no/api/data/EXR/?'
  #CURRENCY_URL = 'apisrc=qb&format=sdmx-json&detail=nodata&attributes=FALSE'
  #currencies = []
  #fetchService
  #cloner
  #reader

  /**
   * Creates an instance of BaseDataFetcher.
   *
   * @param {object} dependencies - Configuration object for dependencies
   * @param {JsonFetchService} dependencies.fetchService - Instance of JsonFetchService
   * @param {DeepCloner} dependencies.cloner - Instance of DeepCloner
   * @param {DataReader} dependencies.reader - Instance of DataReader
   */
  constructor (dependencies) {
    this.#fetchService = dependencies?.fetchService || new JsonFetchService()
    this.#cloner = dependencies?.cloner || new DeepCloner()
    this.#reader = dependencies?.reader || new DataReader()
  }

  /**
   * Fetches available currencies.
   *
   * @returns {Promise<object[]>} - A promise that resolves to an array of available currencies
   */
  async getCurrencies () {
    if (this.#currencies.length === 0) {
      await this.#fetchCurrencies()
    }

    return this.#cloner.clone(this.#currencies)
  }

  /**
   * Fetches currencies from the API and stores them in the instance.
   */
  async #fetchCurrencies () {
    this.#fetchService.setBaseUrl(this.#BASE_URL)

    const raw = await this.#fetchService.fetch(this.#CURRENCY_URL)
    this.#reader.setData(raw)
    this.#currencies = this.#getCurrencies()
  }

  /**
   * Extracts available currencies from the API response.
   *
   * @returns {object[]} - An array of available currencies
   */
  #getCurrencies () {
    const currencies = this.#reader.getCurrencies('BASE_CUR')
    const quoteCur = this.#reader.getCurrencies('QUOTE_CUR')[0]

    currencies.push(quoteCur)

    currencies.sort((currency1, currency2) => currency1.id.localeCompare(currency2.id))

    return currencies
  }
}

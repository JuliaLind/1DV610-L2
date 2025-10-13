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

  constructor(config = {
    fetchService: new JsonFetchService(),
    cloner: new DeepCloner(),
    reader: new DataReader()
  }) {
    this.#fetchService = config.fetchService
    this.#cloner = config.cloner
    this.#reader = config.reader
  }


  /**
   * Fetches available currencies.
   *
   * @param {object} config - Configuration object
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
  async #fetchCurrencies() {
    this.#fetchService.setBaseUrl(this.#BASE_URL)

    const raw = await this.#fetchService.fetch(this.#CURRENCY_URL)
    this.#reader.setData(raw)
    this.#currencies = this.#extractCurrencies(raw, this.#cloner)
  }

  /**
   * Extracts available currencies from the API response.
   *
   * @param {object} data - The API response data
   * @returns {object[]} - An array of available currencies
   */
  #extractCurrencies (data) {
    const currencies = this.#reader.extractCurrencies('BASE_CUR')
    const quoteCur = this.#reader.extractCurrencies('QUOTE_CUR')[0]

    currencies.push(quoteCur) // Add NOK as it's not included in the API response

    currencies.sort((currency1, currency2) => currency1.id.localeCompare(currency2.id))
    console.log(currencies)

    return currencies
  }
}

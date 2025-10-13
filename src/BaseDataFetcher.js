import { JsonFetchService } from './lib/JsonFetchService.js'

/**
 * Fetches available currencies.
 */
export class BaseDataFetcher {
  #CURRENCY_URL = 'https://data.norges-bank.no/api/data/EXR/?apisrc=qb&format=sdmx-json&includeMetrics=true&detail=nodata&locale=no&attributes=UNIT_MULT'

  /**
   * Fetches available currencies.
   *
   * @param {object} config - Configuration object
   * @returns {Promise<object[]>} - A promise that resolves to an array of available currencies
   */
  async getCurrencies (config = {
    fetchService: new JsonFetchService(),
  }) {
    const { fetchService } = config
    fetchService.setBaseUrl(this.#CURRENCY_URL)

    const raw = await fetchService.get()
    return this.#extractCurrencies(raw)
  }

  /**
   * Extracts available currencies from the API response.
   *
   * @param {object} data - The API response data
   * @returns {object[]} - An array of available currencies
   */
  #extractCurrencies (data) {
    const currencies = data.data.structure.dimensions.series.find(dim => dim.id === 'BASE_CUR').values

    currencies.push({ id: 'NOK', name: 'Norske kroner' }) // Add NOK as it's not included in the API response

    currencies.sort((currency1, currency2) => currency1.id.localeCompare(currency2.id))

    return currencies
  }
}

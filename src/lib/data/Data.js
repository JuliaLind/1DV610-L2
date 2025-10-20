import { Currency } from './Currency.js'
import { Structure } from './Structure.js'
import { DataSet } from './DataSet.js'

/**
 * Formats the data from API into a more usable structure.
 */
export class Data {
  #structure
  #dataSet

  #rates = {}

  /**
   * Creates a new data instance.
   *
   * @param {object} data - the data from the API response
   */
  constructor (data) {
    this.#structure = new Structure(data.structure)
    this.#dataSet = new DataSet(data.dataSets[0])
  }

  /**
   * Gets all currencies.
   *
   * @returns {Array} - a list with all currencies
   */
  getCurrencies () {
    const currencies = this.#structure.getAllCurrencies()

    currencies.sort((currency1, currency2) => this.#sortById(currency1, currency2))

    return currencies
  }

  /**
   * Compares two currencies by their IDs.
   * Used to sort the currencies array.
   *
   * @param {object} currency1 - one currency
   * @param {object} currency2 - another currency
   * @returns {number} - the comparison result
   */
  #sortById (currency1, currency2) {
    return currency1.id.localeCompare(currency2.id)
  }

  /**
   * Gets the exchange rates.
   *
   * @returns {object} - exchange rates
   */
  getRates () {
    if (!this.#hasRates()) {
      this.#formatAll()
    }

    return this.#rates
  }

  /**
   * Checks if the rates have been formatted.
   *
   * @returns {boolean} - if the rates attribute has been set
   */
  #hasRates () {
    return Object.keys(this.#rates).length > 0
  }

  /**
   * Rearrange the data into a more usable structure.
   */
  #formatAll () {
    const rateSeriesCount = this.#dataSet.countSeries()

    for (let currencyIndex = 0; currencyIndex < rateSeriesCount; currencyIndex++) {
      this.#formatOne(currencyIndex)
    }
  }

  /**
   * Formats data for one currency.
   *
   * @param {number} currencyIndex - The index of the currency to format.
   */
  #formatOne (currencyIndex) {
    const currencyRates = this.#dataSet.getOneRateSeries(currencyIndex)

    const currency = new Currency({
      ...currencyRates,
      dates: this.#structure.getDates(),
      multipliers: this.#structure.getUnitMultipliers(),
      id: this.#structure.getOneCurrencyId(currencyIndex)
    })

    this.#rates[currency.getId()] = currency.getRates()
  }
}

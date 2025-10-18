// import { DataReader } from './DataReader.js'
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

  constructor (data) {
    this.#structure = new Structure(data.structure)
    this.#dataSet = new DataSet(data.dataSets[0])
  }

  getRates () {
    if (Object.keys(this.#rates).length === 0) {
      this.#formatAll()
    }
    return this.#rates
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
    const currency = new Currency({
      ...(this.#rates[currencyIndex]),
      dates: this.#structure.getDates(),
      multipliers: this.#dataSet.getMultipliers(),
      id: this.#structure.getOneCurrencyId(currencyIndex)
    })

    this.#rates[currency.getId()] = currency.getFormattedRates()
  }
}

import { DataReader } from './DataReader.js'
import { Currency } from './Currency.js'

/**
 * Formats the data from API into a more usable structure.
 */
export class DataFormatter {
  #reader
  #rates
  #ids
  #dates
  #multipliers

  #formatted = {}

  /**
   * Creates an instance of DataFormatter.
   *
   * @param {object} dependencies - Configuration object for dependencies
   * @param {DataReader} dependencies.reader - Instance of DataReader
   */
  constructor(dependencies) {
    this.#reader = dependencies?.reader || new DataReader()
  }

  /**
 * Format the data from the API.
 *
 * @param {object} data - The data to format
 * @returns {object} - The formatted data
 */
  format(data) {
    this.#extract(data)
    this.#normalizeAll()

    return this.#formatted
  }

  /**
   * Extracts relevant data from the API response.
   *
   * @param {object} data - The API response data
   */
  #extract(data) {
    this.#reader.setData(data)

    this.#rates = this.#reader.getRates()
    this.#ids = this.#reader.getIds()
    this.#dates = this.#reader.getDates()
    this.#multipliers = this.#reader.getMultipliers()
  }


  /**
   * Rearrange the data into a more usable structure.
   */
  #normalizeAll() {
    for (let currencyIndex = 0; currencyIndex < this.#rates.length; currencyIndex++) {
      this.#normalizeOne(currencyIndex)
    }
  }

  /**
   * Normalize data for one currency.
   *
   * @param {number} currencyIndex - The index of the currency to normalize.
   */
  #normalizeOne(currencyIndex) {
    const currency = new Currency({
      ...(this.#rates[currencyIndex]),
      dates: this.#dates,
      multipliers: this.#multipliers,
      id: this.#ids[currencyIndex]
    })

    this.#formatted[currency.getId()] = currency.getNormalizedRates()

  }


}

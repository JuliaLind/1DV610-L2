import { DataReader } from './DataReader.js'
import { FormatHelper } from './FormatHelper.js'

/**
 * Formats the data from API into a more usable structure.
 */
export class DataFormatter {
  #reader
  #helper

  #rateCount = 0
  #formatted = {}

  /**
   * Creates an instance of DataFormatter.
   *
   * @param {object} dependencies - Configuration object for dependencies
   * @param {DataReader} dependencies.reader - Instance of DataReader
   * @param {FormatHelper} dependencies.helper - Instance of FormatHelper
   */
  constructor (dependencies = {
    reader: new DataReader(),
    helper: new FormatHelper()
  }) {
    this.#reader = dependencies.reader
    this.#helper = dependencies.helper
  }

  /**
   * Extracts relevant data from the API response.
   *
   * @param {object} data - The API response data
   */
  #extract (data) {
    this.#reader.setData(data)

    const rates = this.#reader.getRates()
    this.#rateCount = rates.length
    this.#helper.setRates(rates)
    this.#helper.setAttributes(this.#reader.getAttributes())
    this.#helper.setIds(this.#reader.getIds())
    this.#helper.setDates(this.#reader.getDates())
  }

  /**
   * Rearrange the data into a more usable structure.
   */
  #normalizeAll () {
    for (let currencyIndex = 0; currencyIndex < this.#rateCount; currencyIndex++) {
      this.#normalizeOne(currencyIndex)
    }
  }

  #normalizeOne (currencyIndex) {
    const currency = this.#helper.getCurrencyId(currencyIndex)

    this.#formatted[currency] = this.#helper.formatOneCurrency(currencyIndex)
  }

  /**
   * Format the data from the API.
   *
   * @param {object} data - The data to format
   * @returns {object} - The formatted data
   */
  format (data) {
    this.#extract(data)
    this.#normalizeAll()

    return this.#formatted
  }
}

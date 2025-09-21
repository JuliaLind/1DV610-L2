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
   * @param {DataReader} reader - Instance of DataReader
   */
  constructor(reader = new DataReader(), helper = new FormatHelper()) {
    this.#reader = reader
    this.#helper = helper
  }

  /**
   * Extracts relevant data from the API response.
   * @param {object} data - The API response data
   *
   */
  #extract(data) {
    this.#reader.setData(data.data)

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
  #rearrange() {
    for (let rateIndex = 0; rateIndex < this.#rateCount; rateIndex++) {
      this.#formatted[this.#helper.getCurrency(rateIndex)] = this.#helper.mergeAndNormalize(rateIndex)
    }
  }

  /**
   * Format the data from the API.
   *
   * @param {Object} data - The data to format
   */
  format(data) {
    this.#extract(data)
    this.#rearrange()

    return this.#formatted
  }
}

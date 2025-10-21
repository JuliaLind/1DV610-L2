import { DeepCloner } from '../cloning/DeepCloner.js'

/**
 * Class representing the dataSet part
 * of the Norway BankAPI response.
 */
export class DataSet {
  #rateSeries = []
  #cloner

  /**
   * Creates an instance of DataSet.
   *
   * @param {object} data - the dataSet part of the API response
   * @param {object} dependencies - the dependencies to be used by the class
   */
  constructor (data, dependencies) {
    this.#rateSeries = Object.values(data?.series)
    this.#cloner = dependencies?.cloner || new DeepCloner()
  }

  /**
   * Gets the series of exchange rates.
   *
   * @returns {Array} - a list containing the series of exchange rates
   */
  getAllRateSeries () {
    return this.#rateSeries.map(rate => this.#cloner.clone(rate))
  }

  /**
   * Gets one exchange rate series by index.
   *
   * @param {number} index - the index of the exchange rate series
   * @returns {object} - the exchange rate series at the specified index
   */
  getOneRateSeries (index) {
    return this.#cloner.clone(this.#rateSeries[index])
  }

  /**
   * Counts the number of exchange rate series.
   *
   * @returns {number} - the quantity of exchange rate series (it's one per currency, except for NOK)
   */
  countSeries () {
    return this.#rateSeries.length
  }
}

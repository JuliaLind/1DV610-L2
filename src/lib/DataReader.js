import { DeepCloner } from './DeepCloner.js'

/**
 * Class reads data from the Norway BankAPI response.
 */
export class DataReader {
  #data
  #cloner

  /**
   * Creates an instance of DataReader.
   *
   * @param {object} dependencies - Configuration object for dependencies
   * @param {DeepCloner} dependencies.cloner - Instance of DeepCloner
   */
  constructor (dependencies) {
    this.#data = {}
    this.#cloner = dependencies?.cloner || new DeepCloner()
  }

  /**
   * Set the data to read from.
   *
   * @param {object} data - The data object to read from
   */
  setData (data) {
    this.#data = data.data
  }

  /**
   * Get the exchange rates from the data.
   *
   * @returns {Array} rates - Array of rate objects
   */
  getRates () {
    const clonedRates = []

    for (const rate of Object.values(this.#data.dataSets[0].series)) {
      clonedRates.push(this.#cloner.clone(rate))
    }

    return clonedRates
  }

  /**
   * Get the attributes from the data.
   *
   * @returns {Array} attributes - Array of attribute objects
   */
  getAttributes () {
    return this.#cloner.clone(this.#data.structure.attributes.series)
  }

  /**
   * Get the unit multipliers from the data.
   *
   * @returns {Array} multipliers - Array of unit multipliers
   */
  getMultipliers () {
    const multipliers = this.getAttributes().find(attr => attr.id === 'UNIT_MULT').values
    return this.#cloner.clone(multipliers)
  }

  /**
   * Get the dates from the data.
   *
   * @returns {Array} dates - Array of date strings
   */
  getDates () {
    const dates = []

    for (const obj of this.#data.structure.dimensions.observation[0].values) {
      dates.push(obj.id)
    }

    return dates
  }

  /**
   * Get the ids from the data.
   *
   * @returns {Array} ids - Array of currency ids, fo example: ['USD', 'EUR']
   */
  getIds () {
    const ids = []

    for (const currency of this.getCurrencies()) {
      ids.push(currency.id)
    }
    return ids
  }

  /**
   * Gets currencies from the data.
   *
   * @param {string} currencyType - The type of currency to get ('BASE_CUR' or 'QUOTE_CUR')
   * @returns {object[]} - An array of currency objects
   */
  getCurrencies (currencyType = 'BASE_CUR') {
    const dimensions = this.#data.structure.dimensions.series

    return this.#cloner.clone(dimensions.find(dimension => dimension.id === currencyType).values)
  }
}

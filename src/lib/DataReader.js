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
    const rateSeries = this.#getRateSeries(this.#data.dataSets)
    return rateSeries.map(rate => this.#cloner.clone(rate))
  }

  #getRateSeries (dataSets) {
    return Object.values(dataSets[0].series)
  }

  /**
   * Get the attributes from the data.
   *
   * @returns {Array} attributes - Array of attribute objects
   */
  getAttributes () {
    const attributeSeries = this.#getAttributeSeries(this.#data.structure)

    return this.#cloner.clone(attributeSeries)
  }

  #getAttributeSeries (structure) {
    return structure.attributes.series
  }

  /**
   * Get the unit multipliers from the data.
   *
   * @returns {Array} multipliers - Array of unit multipliers
   */
  getMultipliers () {
    const attributes = this.#getAttributeSeries(this.#data.structure)
    const unitMultiplier = attributes.find(attr => this.#isUnitMultipler(attr))

    return this.#cloner.clone(unitMultiplier.values)
  }

  #isUnitMultipler(attr) {
    return attr.id === 'UNIT_MULT'
  }

  /**
   * Get the dates from the data.
   *
   * @returns {Array} dates - Array of date strings
   */
  getDates () {
    const dimensions = this.#getDimensions(this.#data.structure)

    return this.#getObservationDates(dimensions.observation[0])
  }

  #getDimensions(structure) {
    return structure.dimensions
  }

  #getObservationDates(observationDimension) {
    return observationDimension.values.map(dateObject => dateObject.id)
  }

  /**
   * Get the ids from the data.
   *
   * @returns {Array} ids - Array of currency ids, fo example: ['USD', 'EUR']
   */
  getIds () {
    const currencies = this.getCurrencies()

    return currencies.map(currency => currency.id)
  }

  /**
   * Gets currencies from the data.
   *
   * @param {string} currencyType - The type of currency to get ('BASE_CUR' or 'QUOTE_CUR')
   * @returns {object[]} - An array of currency objects
   */
  getCurrencies () {
    const dimensions = this.#getDimensions(this.#data.structure)
    const currencyDimensions = this.#getCurrencyDimensions(dimensions.series)
    const currencies = currencyDimensions.map(dimension => dimension.values).flat()

    return this.#cloner.clone(currencies)
  }


  #getCurrencyDimensions(dimensionSeries) {
    return dimensionSeries.filter(dimension => this.#isCurrencyDimension(dimension))
  }

  #isCurrencyDimension(dimension) {
    return ['BASE_CUR', 'QUOTE_CUR'].includes(dimension.id)
  }
}

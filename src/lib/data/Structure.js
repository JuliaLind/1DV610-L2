import { DeepCloner } from '../cloning/DeepCloner.js'

/**
 * Class representing the structure part
 * of the Norway BankAPI response.
 */
export class Structure {
  #cloner

  #baseCurrency
  #targetCurrencies
  #allCurrencies

  #unitMultipliers

  #dates

  /**
   * Creates an instance of Structure.
   *
   * @param {object} data - the structure part of data returned by API, to extract structure from
   * @param {object} dependencies - the dependencies to be used by the class
   */
  constructor (data, dependencies) {
    this.#cloner = dependencies?.cloner || new DeepCloner()
    this.#setBaseCurrency(data)
    this.#setTargetCurrencies(data)
    this.#setUnitMultipliers(data)
    this.#setDates(data)
    this.#setAllCurrencies()
  }

  /**
   * Sets the base currency from the API data.
   *
   * @param {object} data - the structure part of data returned by API, to extract base currency from
   */
  #setBaseCurrency (data) {
    this.#baseCurrency = data.dimensions.series.find(dimension => this.#isBaseCurrency(dimension)).values[0]
  }

  /**
   * Checks if the dimension is the base currency dimension.
   *
   * @param {object} dimension - dimension object to check
   * @returns {boolean} - whether the dimension is the base currency dimension
   */
  #isBaseCurrency (dimension) {
    return dimension.id === 'QUOTE_CUR'
  }

  /**
   * Sets the target currencies from the API data.
   *
   * @param {object} data - the structure part of data returned by API, to extract target currencies from
   */
  #setTargetCurrencies (data) {
    this.#targetCurrencies = data.dimensions.series.find(dimension => this.#isTargetCurrency(dimension)).values
  }

  /**
   * Checks if the dimension is the target currency dimension.
   *
   * @param {object} dimension - dimension object to check
   * @returns {boolean} - whether the dimension is the target currency dimension
   */
  #isTargetCurrency (dimension) {
    return dimension.id === 'BASE_CUR'
  }

  /**
   * Gets the base currency.
   *
   * @returns {object} - the base currency
   */
  getBaseCurrency () {
    return this.#cloner.clone(this.#baseCurrency)
  }

  /**
   * Gets the target currencies.
   *
   * @returns {Array} - a list with the target currencies
   */
  getTargetCurrencies () {
    return this.#targetCurrencies.map(currency => this.#cloner.clone(currency))
  }

  /**
   * Sets the unit multipliers for the rates from the API data.
   * Unitmultipliers are used to scale the rates to their correct values,
   * for example one currency rate might be given per 100 units of base currency.
   *
   * @param {object} data - the structure part of data returned by API, to extract unit multipliers from
   */
  #setUnitMultipliers (data) {
    this.#unitMultipliers = data.attributes.series.find(dimension => this.#isUnitMultipler(dimension)).values
  }

  /**
   * Checks if the attribute is a unit multiplier.
   *
   * @param {object} attribute - The attribute object to check.
   * @returns {boolean} - Whether the attribute is a unit multiplier.
   */
  #isUnitMultipler (attribute) {
    return attribute.id === 'UNIT_MULT'
  }

  /**
   * Sets the dates from the API data.
   *
   * @param {object} data - the structure part of data returned by API, to extract dates from
   */
  #setDates (data) {
    this.#dates = data.dimensions.observation[0].values.map(dateObject => dateObject.id)
  }

  /**
   * Sets all currencies by combining base and target currencies into one array.
   */
  #setAllCurrencies () {
    this.#allCurrencies = this.#cloner.clone([...this.getTargetCurrencies(), this.getBaseCurrency()])
  }

  /**
   * Gets the unit multipliers.
   *
   * @returns {Array} - list of unit multipliers
   */
  getUnitMultipliers () {
    return this.#cloner.clone(this.#unitMultipliers)
  }

  /**
   * Gets the observation dates.
   *
   * @returns {Array} - a list of all observation dates
   */
  getDates () {
    return this.#cloner.clone(this.#dates)
  }

  /**
   * Gets all currencies.
   *
   * @returns {Array} - a list of all currencies
   */
  getAllCurrencies () {
    return this.#allCurrencies
  }

  /**
   * Gets the currency IDs.
   *
   * @returns {Array} - a list with ids of the currencies, e.g. ['NOK', 'USD', ...]
   */
  getCurrencyIds () {
    return this.#allCurrencies.map(currency => currency.id)
  }

  /**
   * Gets the id of one currency at the given index.
   *
   * @param {number} index - the index position of the currency in the currency list
   * @returns {string} - the id of one currency at the given index
   */
  getOneCurrencyId (index) {
    return this.#allCurrencies[index].id
  }
}

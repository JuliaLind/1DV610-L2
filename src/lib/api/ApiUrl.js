/**
 * Class that builds API URLs for fetching exchange rate data.
 */
export class ApiUrl {
  #baseUrl = 'https://data.norges-bank.no/api/data/EXR/'

  #variableParams = {
    /**
     * Gets the query parameter for number of observations to fetch.
     *
     * @param {number} count - The number of observations to fetch from the end
     * @returns {string} - The nr of observations query parameter
     */
    observations: (count) => 'lastNObservations=' + count,

    /**
     * Gets the query parameter for the from date.
     *
     * @param {string} date - The start date
     * @returns {string} - The start date query parameter
     */
    from: (date) => 'startPeriod=' + date,

    /**
     * Gets the query parameter for the to date.
     *
     * @param {string} date - The end date
     * @returns {string} - The end date query parameter
     */
    to: (date) => 'endPeriod=' + date
  }

  #alwaysParams = 'attributes=UNIT_MULT&locale=en&format=sdmx-json'

  /**
   * Gets the URL for fetching exchange rates.
   *
   * @param {Array<string>} currencies - list of currency codes to fetch rates for
   * @param {object} options - additional query parameters for the request
   * @returns {string} - The exchange rate request URL
   */
  getRateRequestUrl (currencies, options = {}) {
    const currencyPart = this.#getCurrencyPart(currencies)
    const variablePart = this.#getVariableParamsPart(options)

    return `${this.#baseUrl}${currencyPart}${variablePart}&${this.#alwaysParams}`
  }

  /**
   * Gets the currency part of the URL.
   *
   * @param {Array} currencies - the currencies to fetch data for
   * @returns {string} - the currency part of the URL
   */
  #getCurrencyPart (currencies) {
    return `B.${currencies.join('+')}.NOK.SP?`
  }

  /**
   * Gets the variable parameters part of the URL.
   *
   * @param {object} options - the options for the variable part of the url query string
   * @returns {string} - the variable parameters part of the URL
   */
  #getVariableParamsPart (options) {
    return Object.entries(options)
      .map(([key, value]) => this.#variableParams[key](value))
      .join('&')
  }

  /**
   * Gets the URL for fetching currency information.
   *
   * @returns {string} - The currency information request URL
   */
  getCurrencyRequestUrl () {
    return `${this.#baseUrl}?apisrc=qb&detail=nodata&${this.#alwaysParams}`
  }
}

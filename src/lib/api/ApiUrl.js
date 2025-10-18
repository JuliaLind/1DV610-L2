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

  getRateRequestUrl (currencies, options = {}) {
    const currencyPart = `B.${currencies.join('+')}.NOK.SP?`
    const variablePart = Object.entries(options)
      .map(([key, value]) => this.#variableParams[key](value))
      .join('&')

    return `${this.#baseUrl}${currencyPart}${variablePart}&${this.#alwaysParams}`
  }

  getCurrencyRequestUrl () {
    return `${this.#baseUrl}apisrc=qb&detail=nodata${this.#alwaysParams}`
  }

}
export class ApiUrl {
  #baseUrl = 'https://data.norges-bank.no/api/data/EXR/'

  #params = {
    /**
     * Gets the query parameter for number of items to fetch.
     *
     * @param {number} count - The number of observations to fetch from the end
     * @returns {string} - The nr of items query parameter
     */
    items: (count) => 'lastNObservations=' + count,

    /**
     * Gets the query parameter for JSON format.
     *
     * @returns {string} - The JSON format query parameter
     */
    json: () => 'format=sdmx-json',
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

}
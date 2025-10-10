/**
 * Fetches JSON data from a specified API endpoint.
 */
export class JsonFetchService {
  #baseUrl

  /**
   * Sets the base URL for the API requests.
   *
   * @param {string} baseUrl - The base URL to use for API requests.
   */
  setBaseUrl (baseUrl) {
    this.#baseUrl = baseUrl
  }

  /**
   * Makes a GET request to the API endpoint.
   *
   * @param {string} queryString - The query string to include in the request.
   * @returns {Promise<object>} - The JSON response from the API.
   */
  async fetch (queryString) {
    try {
      return await this.#fetchJson(`${this.#baseUrl}?${queryString}`)
    } catch (error) {
      throw new Error('Error fetching data:', error)
    }
  }

  /**
   * Fetches data from a REST API endpoint.
   *
   * @param {string} url - The API endpoint URL.
   * @returns {Promise<object>} - The JSON response from the API.
   */
  async #fetchJson (url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const jsonResponse = await response.json()

    this.#checkStatus(jsonResponse)

    return jsonResponse
  }

  /**
   * Checks the status of the API response for errors.
   *
   * @param {object} response - The API response object.
   * @throws {Error} - If the response contains errors.
   */
  #checkStatus (response) {
    if (!response.errors) {
      return
    }

    throw new Error(response.errors.map(e => e.message).join(', '))
  }
}

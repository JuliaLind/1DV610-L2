/**
 * Service for fetching JSON data from a specified API endpoint.
 */
export class JsonApiService {
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
  async get (queryString) {
    try {
      return await this.#fetch(`${this.#baseUrl}?${queryString}`)
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
  async #fetch (url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    return response.json()
  }
}

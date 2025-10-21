import { Data } from '../data/Data.js'

/**
 * Fetches JSON data from a specified API endpoint.
 */
export class JsonFetchService {
  /**
   * Makes a GET request to the API endpoint.
   *
   * @param {string} url - The API endpoint URL.
   * @returns {Promise<object>} - The JSON response from the API.
   */
  async fetch (url) {
    try {
      const res = await this.#fetchJson(url)

      return new Data(res.data)
    } catch (error) {
      this.#handleError(error)
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

    const error = new Error(response.errors.map(e => e.message).join(', '))
    error.code = response.errors[0].code

    throw error
  }

  /**
   * Handles errors that occur during the fetch process.
   *
   * @param {Error} error - The error that occurred.
   * @throws {Error} - The processed error.
   */
  #handleError (error) {
    if (error.code) {
      throw error
    }
    const newError = new Error('Error fetching data:')
    newError.code = 500
    throw newError
  }
}

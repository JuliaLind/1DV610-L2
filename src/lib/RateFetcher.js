import { JsonFetchService } from './JsonFetchService.js'

/**
 * Service that fetches exchange rates from Norges Bank.
 */
export class RateService {
	#fetchService
	#searchParams = {
		items: (count=1) => 'lastNObservations=' + count,
		json: () => 'format=sdmx-json',
		from: (date) => 'startPeriod=' + date,
		to: (date) => 'endPeriod=' + date,
	}

	/**
	 * Creates an instance of RateService.
	 *
	 * @param {string[]} currencies - The currencies to fetch rates for.
	 * @param {JsonFetchService} fetchService - The fetch service to use.
	 */
	constructor(currencies, fetchService = new JsonFetchService()) {
		const baseUrl = `https://data.norges-bank.no/api/data/EXR/B.${currencies.join('+')}.NOK.SP`

		this.#fetchService = fetchService
		fetchService.setBaseUrl(baseUrl)
	}

	/**
	 * Fetch exchange rates by date.
	 *
	 * @param {string} date - The date to fetch rates for.
	 * @returns {Promise<Object>} - The fetched exchange rates.
	 */
	async fetchByDate(date) {
		const searchParams = `${this.#searchParams.to(date)}&${this.#searchParams.items(1)}&${this.#searchParams.json()}`

		return await this.#fetchService.get(searchParams)

	}

	/**
	 * Fetch exchange rates from the latest available date.
	 *
	 * @returns {Promise<Object>} - The exchange rates from the latest available date.
	 */
	async fetchLatest() {
		const searchParams = `${this.#searchParams.items(1)}&${this.#searchParams.json()}`

		return await this.#fetchService.get(searchParams)
	}

	/**
	 * Fetch exchange rates by period.
	 *
	 * @param {string} startDate - The start date of the period.
	 * @param {string} endDate - The end date of the period.
	 * @returns {Promise<Object>} - The fetched exchange rates for the period.
	 */
	async fetchByPeriod(startDate, endDate) {
		const searchParams = `${this.#searchParams.from(startDate)}&${this.#searchParams.to(endDate)}&${this.#searchParams.json()}`

		return await this.#fetchService.get(searchParams)
	}
}

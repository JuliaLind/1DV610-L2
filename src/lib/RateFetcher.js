import { JsonApiService } from './JsonApiService.js'

export class RateService {
	#apiService

	constructor(currencies) {
		const apiUrl = `https://data.norges-bank.no/api/data/EXR/B.${currencies.join('+')}.NOK.SP`

		this.#apiService = new JsonApiService(apiUrl)
	}

	async fetchByDate(date) {
		return await this.#apiService.get(`endPeriod=${date}&locale=sv&lastNObservations=1&format=sdmx-json`)

	}

	async fetchLatest() {
		return await this.#apiService.get(`lastNObservations=1&format=sdmx-json`)
	}

	async fetchByPeriod(startDate, endDate) {

	}


}

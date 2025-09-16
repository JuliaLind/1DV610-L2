import { ApiService } from './ApiService.js'

export class RateService {
	#apiService

	constructor(currencies) {
		const apiUrl = `https://data.norges-bank.no/api/data/EXR/B.${currencies.join('+')}.NOK.SP`

		this.#apiService = new ApiService(apiUrl)
	}

	async fetchByDate(date) {
		return await this.#apiService.fetch(`endPeriod=${date}&locale=sv&lastNObservations=1&format=sdmx-json`)

	}

	async fetchLatest() {
		const response = await this.#apiService.fetch(`lastNObservations=1&format=sdmx-json`)
	}

	async fetchByPeriod(startDate, endDate) {

	}


}

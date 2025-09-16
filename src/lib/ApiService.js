export class ApiService {
    #baseUrl

    constructor(baseUrl) {
        this.#baseUrl = baseUrl
    }

    async fetch(queryString) {
        try {
            return await this.#getJson(`${this.#baseUrl}?${queryString}`)
        } catch (error) {
            throw new Error('Error fetching data:', error)
        }
    }

    async #getJson(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        return response.json()
    }
}
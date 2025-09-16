export class JsonApiService {
    #baseUrl

    constructor(baseUrl) {
        this.#baseUrl = baseUrl
    }


    async get(queryString) {
        try {
            return await this.#fetch(`${this.#baseUrl}?${queryString}`)
        } catch (error) {
            throw new Error('Error fetching data:', error)
        }
    }

    async #fetch(url) {
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
import RateFetcher from './RateFetcher.js'

export class CurrencyConverter {
    #rateFetcher
    #fromCurrency
    #toCurrencies
    #normalizedRates = null

    /**
     * Creates an instance of CurrencyConverter.
     *
     * @param {object} dependencies - Configuration object for dependencies
     * @param {RateFetcher} dependencies.rateFetcher - Instance of RateFetcher
     */
    constructor(dependencies = {
        rateFetcher: new RateFetcher()
    }) {
        this.#rateFetcher = dependencies.rateFetcher
    }

    setFromCurrency(value) {
        this.#fromCurrency = value
        this.#normalizedRates = null
    }

    setToCurrencies(values) {
        this.#toCurrencies = values
        this.#normalizedRates = null
    }

    async convert(amount) {
        this.#isReady()
        await this.#prep()
        return this.#recalc(amount)
    }

    #isReady () {
        if (!(this.#fromCurrency && this.#toCurrencies?.length > 0)) {
            throw new Error('CurrencyConverter is not fully initialized')
        }
    }

    async #prep() {
        if (this.#normalizedRates) {
            return
        }

        this.#rateFetcher.setCurrencies([this.#fromCurrency, ...this.#toCurrencies])
        const rates = await this.#rateFetcher.fetchLatest()
        this.#normalizedRates = this.#normalizeRates(rates)
    }

    #normalizeRates(rates) {
        const fromRate = rates[this.#fromCurrency][0]
        const normalized = {}
        for (const [currency, [toRate]] of Object.entries(rates)) {
            normalized[currency] = fromRate / toRate
        }
        return normalized
    }

    #recalc(amount) {
        const results = {}
        for (const currency of this.#toCurrencies) {
            results[currency] = this.#normalizedRates[currency] * amount
        }
        return results
    }

}
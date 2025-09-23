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

    /**
     * Sets the base currency for conversion.
     * If the currency is changed, cached rates are cleared.
     *
     * @param {string} value - The currency code to set as the base currency.
     */
    setFromCurrency(value) {
        if (value === this.#fromCurrency) {
            return
        }

        this.#fromCurrency = value
        this.#normalizedRates = null
    }

    /**
     * Sets the target currencies for conversion.
     * If the currencies are changed, cached rates are cleared.
     *
     * @param {string[]} values - The currency codes to set as target currencies.
     */
    setToCurrencies(values) {
        if (JSON.stringify(values.sort()) === JSON.stringify(this.#toCurrencies.sort())) {
            return
        }

        this.#toCurrencies = values
        this.#normalizedRates = null
    }

    /**
     * Converts the specified amount from the base currency to the target currencies.
     *
     * @param {number} amount - The amount to convert.
     * @returns {Promise<object>} - The conversion results.
     */
    async convert(amount) {
        this.#isReady()
        await this.#prep()
        return this.#recalc(amount)
    }

    /**
     * Checks if the converter is fully initialized.
     * Throws an error if not.
     *
     * @throws {Error} - If the converter is not fully initialized.
     */
    #isReady () {
        if (!(this.#fromCurrency && this.#toCurrencies?.length > 0)) {
            throw new Error('CurrencyConverter is not fully initialized')
        }
    }

    /**
     * Prepares the converter by fetching and normalizing rates.
     *
     * @returns {Promise<void>} - A promise that resolves when preparation is complete.
     */
    async #prep() {
        if (this.#normalizedRates) {
            return
        }

        this.#rateFetcher.setCurrencies([this.#fromCurrency, ...this.#toCurrencies])
        const rates = await this.#rateFetcher.fetchLatest()
        this.#normalizedRates = this.#normalizeRates(rates)
    }

    /**
     * Normalizes the fetched exchange rates.
     *
     * @param {object} rates - The fetched exchange rates.
     * @returns {object} - The normalized exchange rates.
     */
    #normalizeRates(rates) {
        const fromRate = rates[this.#fromCurrency][0]
        const normalized = {}
        for (const [currency, [toRate]] of Object.entries(rates)) {
            normalized[currency] = fromRate / toRate
        }
        return normalized
    }
    

    /**
     * Recalculates the conversion results for the specified amount.
     *
     * @param {number} amount - The amount to convert.
     * @returns {object} - The conversion results.
     */
    #recalc(amount) {
        const results = {}
        for (const currency of this.#toCurrencies) {
            results[currency] = this.#normalizedRates[currency] * amount
        }
        return results
    }

}
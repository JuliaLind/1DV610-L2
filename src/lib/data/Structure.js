import { DeepCloner } from './DeepCloner.js'

/**
 * Class representing the structure part 
 * of the Norway BankAPI response.
 */
export class Structure {
    #cloner

    #baseCurrency
    #targetCurrencies
    #allCurrencies

    #unitMultipliers

    #dates

    constructor(data, dependencies) {
        this.#cloner = dependencies?.cloner || new DeepCloner()
        this.#setBaseCurrency(data)
        this.#setTargetCurrencies(data)
        this.#setUnitMultipliers(data)
        this.#setDates(data)
        this.#setAllCurrencies()
    }

    #setTargetCurrencies(data) {
        this.#targetCurrencies = data.dimensions.series.find(dimension => this.#isTargetCurrency(dimension)).values
    }

    #isTargetCurrency(dimension) {
        return dimension.id === 'BASE_CUR'
    }

    getTargetCurrencies() {
        return this.#targetCurrencies.map(currency => this.#cloner.clone(currency))
    }

    #setBaseCurrency(data) {
        this.#baseCurrency = data.dimensions.series.find(dimension => this.#isBaseCurrency(dimension)).values
    }

    #isBaseCurrency(dimension) {
        return dimension.id === 'QUOTE_CUR'
    }

    getBaseCurrency() {
        return this.#cloner.clone(this.#baseCurrency)
    }

    #setUnitMultipliers(data) {
        this.#unitMultipliers = data.attributes.series.find(dimension => this.#isUnitMultipler(dimension)).values
    }

    /**
     * Checks if the attribute is a unit multiplier.
     *
     * @param {object} attribute - The attribute object to check.
     * @returns {boolean} - Whether the attribute is a unit multiplier.
     */
    #isUnitMultipler(attribute) {
        return attribute.id === 'UNIT_MULT'
    }

    getUnitMultipliers() {
        return this.#cloner.clone(this.#unitMultipliers)
    }

    #setDates(data) {
        this.#dates = data.dimensions.observation[0].values.map(dateObject => dateObject.id)
    }

    getDates() {
        return this.#cloner.clone(this.#dates)
    }

    #setAllCurrencies() {
        this.#allCurrencies = this.#cloner.clone([...this.getBaseCurrency(), ...this.getTargetCurrencies()])
    }

    getAllCurrencies() {
        return this.#allCurrencies
    }

    getCurrencyIds() {
        return this.#allCurrencies.map(currency => currency.id)
    }

    getOneCurrencyId(index) {
        return this.#allCurrencies[index].id
    }
}
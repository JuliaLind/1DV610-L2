import { DeepCloner } from './DeepCloner.js'

/**
 * Class representing the dataSet part 
 * of the Norway BankAPI response.
 */
export class DataSet {
    #rateSeries
    #cloner

    constructor(data, dependencies) {
        this.#rateSeries = Object.values(data.series)
        this.#cloner = dependencies?.cloner || new DeepCloner()
    }

    getRateSeries() {
        return this.#rateSeries.map(rate => this.#cloner.clone(rate))
    }

    countSeries() {
        return this.#rateSeries.length
    }
}
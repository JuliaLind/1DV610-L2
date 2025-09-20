export class DataReader {
    #data

    /**
     * Set the data to read from.
     *
     * @param {object} data - The data object to read from
     */
    setData(data) {
        this.#data = data
    }

    /**
     * Get the exchange rates from the data.
     *
     * @returns {Array} rates - Array of rate objects
     */
    getRates () {
        return Object.values(this.#data.dataSets[0].series)
    }

    /**
     * Get the attributes from the data.
     *
     * @returns {Array} attributes - Array of attribute objects
     */
    getAttributes () {
        return this.#data.structure.attributes.series
    }

    /**
     * Get the dates from the data.
     *
     * @returns {Array} dates - Array of date strings
     */
    getDates () {
        return this.#data.structure.dimensions.observation[0].values.map(obj => obj.id)
    }

    /**
     * Get the ids from the data.
     *
     * @returns {Array} ids - Array of rate ids, fo example: ['USD', 'EUR']
     */
    getIds () {
        return this.#data.structure.dimensions.series[1].values.map(obj => obj.id)
    }
}
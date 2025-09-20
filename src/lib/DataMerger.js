export class DataMerger {
    #rates
    #attributes
    #ids
    #dates
    
    setRates(rates) {
        this.#rates = rates
    }

    setAttributes(attributes) {
        this.#attributes = attributes
    }

    setIds(ids) {
        this.#ids = ids
    }

    setDates(dates) {
        this.#dates = dates
    }

    mergeRatesAndDates(rate) {
        const merged = []

        for (const indx in this.#dates) {
            merged.push({
                date: this.#dates[indx],
                value: Number(rate.values[indx][0])
            })
        }

        return merged
    }

    merge() {
        const rates = this.#rates
        const attributes = this.#attributes
        const ids = this.#ids
        const dates = this.#dates

        const merged = []

        for (const rateIndex in rates) {
            const currentRate = rates[rateIndex]

            const exr = {
                id: ids[rateIndex],
                values: []
            }

            let multiplier = 1

            for (const attrIndex in currentRate.attributes) {
                const attrType = attributes[attrIndex].id

                if (attrType === "UNIT_MULT") {
                    multiplier = 10 ** Number(attributes[attrIndex].values[currentRate.attributes[attrIndex]].id)
                    break
                }
            }

            for (const dateIndex in dates) {
                const observation = {
                    date: dates[dateIndex],
                    value: (Number(currentRate.observations[dateIndex][0]) / multiplier).toFixed(4)
                }

                exr.values.push(observation)
            }

            merged.push(exr)
        }

        return merged
    }
}
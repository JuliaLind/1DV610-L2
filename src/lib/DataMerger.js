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
        const dates = this.#dates[indx]

        const merged = []

        for (const rateIndex in rates) {
            const exr = {
                id: ids[rateIndex],
                values: this.mergeRatesAndDates(Object.values(rates[rateIndex].observations))
            }

            let multiplier


            for (const attrIndex in rates[rateIndex].attributes) {
                if (rates[rateIndex][attributes[attrIndex].id] === "MULTIPLIER") {
                    multiplier = 10 ** attributes[attrIndex].values[rates[rateIndex].attributes[attrIndex]]
                    break
                }
            }

            merged.push(exr)
        }

        return merged
    }
}
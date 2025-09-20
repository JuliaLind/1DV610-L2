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

    mergeRatesAndDates(values, dates) {
        const merged = []

        for (const indx in dates) {
            merged.push({
                date: dates[indx],
                value: Number(values[indx][0])
            })
        }

        return merged
    }

    merge() {
        const rates = this.#rates
        const attributes = this.#attributes
        const ids = this.#ids
        const dates = this.#dates

        for (const rateIndx in rates) {
            const exr = rates[rateIndx]
            exr.id = ids[rateIndx]

            for (const attrIndex in exr.attributes) {
                exr[attributes[attrIndex].id] = attributes[attrIndex].values[exr.attributes[attrIndex]]
            }

            exr.observations = this.mergeRatesAndDates(Object.values(exr.observations), dates)
            delete exr.attributes
        }
    }
}
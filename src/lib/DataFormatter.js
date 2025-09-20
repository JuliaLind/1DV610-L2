// temp
import { DataReader } from './DataReader.js'
// import { DataMerger } from './DataMerger.js'

import { readFile } from 'fs/promises'
const raw = await readFile(new URL('../../test/json/period.json', import.meta.url));
const data = JSON.parse(raw)


export class DataFormatter {
    #reader
    #merger

    constructor(reader = new DataReader()) {
        this.#reader = reader
    }

    extractRates(data) {
        this.#reader.setData(data.data)

        const rates = this.#reader.getRates()
        const attributes = this.#reader.getAttributes()
        const ids = this.#reader.getIds()
        const dates = this.#reader.getDates()



        const merged = []

        for (const rateIndex in rates) {
            const currentRate = rates[rateIndex]

            const exr = {
                id: ids[rateIndex],
                values: []
            }

            let multiplier = 1

            for (const attrIndex in currentRate.attributes) {
                const currentAttr = attributes[attrIndex]

                if (currentAttr.id === "UNIT_MULT") {
                    const currentRateMultiplierIndex = currentRate.attributes[attrIndex]
                    multiplier = 10 ** Number(currentAttr.values[currentRateMultiplierIndex].id)
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
            console.log(exr.values)
        }

        return merged

    }
}

const dataFormatter = new DataFormatter()
console.log(dataFormatter.extractRates(data))
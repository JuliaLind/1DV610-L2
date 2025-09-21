// temp
import { DataReader } from './DataReader.js'

import { readFile } from 'fs/promises'
const raw = await readFile(new URL('../../test/json/period.json', import.meta.url));
const data = JSON.parse(raw)


export class DataFormatter {
    #reader

    constructor(reader = new DataReader()) {
        this.#reader = reader
    }


    format(data) {
        this.#reader.setData(data.data)

        const rates = this.#reader.getRates()
        const attributes = this.#reader.getAttributes()
        const ids = this.#reader.getIds()
        const dates = this.#reader.getDates()

        const merged = {}

        for (const rateIndex in rates) {
            const currentRate = rates[rateIndex]
            const currency = ids[rateIndex]

            merged[currency] = []

            let multiplier = 1

            for (const attrIndex in currentRate.attributes) {
                const currentAttr = attributes[attrIndex]
                const attrId = currentAttr.id

                if (attrId === "UNIT_MULT") {
                    const currentRateMultiplierIndex = currentRate.attributes[attrIndex]
                    const powerOf = Number(currentAttr.values[currentRateMultiplierIndex].id)

                    multiplier = 10 ** powerOf
                    continue
                }
            }

            for (const dateIndex in dates) {
                const rateValue = Number(currentRate.observations[dateIndex][0])
                const observation = {
                    date: dates[dateIndex],
                    value: Number((rateValue / multiplier).toFixed(4))
                }

                merged[currency].push(observation)
            }
        }

        return merged
    }
}

const dataFormatter = new DataFormatter()
const formattedData = dataFormatter.format(data)
console.log(formattedData)
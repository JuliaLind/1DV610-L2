// temp
import { DataReader } from './DataReader.js'
import { DataMerger } from './DataMerger.js'

import { readFile } from 'fs/promises'
const raw = await readFile(new URL('../../test/json/period.json', import.meta.url));
const data = JSON.parse(raw)


export class DataFormatter {
    #reader
    #merger

    constructor(config = {
        reader: new DataReader(),
        merger: new DataMerger()
    }) {
        this.#reader = config.reader
        this.#merger = config.merger
    }

    extractRates(data) {
        this.#reader.setData(data.data)
        this.#merger.setRates(this.#reader.getRates(data))
        this.#merger.setAttributes(this.#reader.getAttributes(data))
        this.#merger.setIds(this.#reader.getIds(data))
        this.#merger.setDates(this.#reader.getDates(data))

        const mergedData = this.#merger.merge()



        // const values = data.data.dataSets[0].series
        // const ids = data.data.structure.dimensions.series[1].values
        // const dates = data.data.structure.dimensions.observation[0].values.map(obj => obj.id)
        // const multipliers = data.data.structure.attributes.series[2].values.map(obj => obj.value = 10 ** obj.id)

        // console.log(values)
        // console.log(ids)
        // console.log(dates)
        // console.log(multipliers)
    }
}

const dataFormatter = new DataFormatter()
dataFormatter.extractRates(data)
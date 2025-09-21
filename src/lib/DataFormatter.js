import { DataReader } from './DataReader.js'


/**
 * Formats the data from API into a more usable structure.
 */
export class DataFormatter {
  #reader

  #rates
  #attributes
  #ids
  #dates

  /**
   * Creates an instance of DataFormatter.
   *
   * @param {DataReader} reader - Instance of DataReader
   */
  constructor (reader = new DataReader()) {
    this.#reader = reader
  }

  #extract(data) {
    this.#reader.setData(data.data)

    this.#rates = this.#reader.getRates()
    this.#attributes = this.#reader.getAttributes()
    this.#ids = this.#reader.getIds()
    this.#dates = this.#reader.getDates()
  }

  /**
   * Format the data from the API.
   *
   * @param {Object} data - The data to format
   */
  format (data) {
    this.#extract(data)

    const merged = {}

    for (const rateIndex in this.#rates) {
      const currentRate = this.#rates[rateIndex]
      const currency = this.#ids[rateIndex]

      merged[currency] = []

      let multiplier = 1

      for (const attrIndex in currentRate.attributes) {
        const currentAttr = this.#attributes[attrIndex]
        const attrId = currentAttr.id

        if (attrId === 'UNIT_MULT') {
          const currentRateMultiplierIndex = currentRate.attributes[attrIndex]
          const powerOf = Number(currentAttr.values[currentRateMultiplierIndex].id)

          multiplier = 10 ** powerOf
          continue
        }
      }

      for (const dateIndex in this.#dates) {
        const rateValue = Number(currentRate.observations[dateIndex][0])
        const observation = {
          date: this.#dates[dateIndex],
          value: Number((rateValue / multiplier).toFixed(4))
        }

        merged[currency].push(observation)
      }
    }

    return merged
  }
}

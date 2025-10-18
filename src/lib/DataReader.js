// import { DeepCloner } from './DeepCloner.js'
// import { DataSet } from './DataSet.js'
// import { Structure } from './Structure.js'

// /**
//  * Class reads data from the Norway BankAPI response.
//  */
// export class DataReader {
//   #data
//   #cloner

//   #dataSet
//   #structure

//   /**
//    * Creates an instance of DataReader.
//    *
//    * @param {object} dependencies - Configuration object for dependencies
//    * @param {DeepCloner} dependencies.cloner - Instance of DeepCloner
//    */
//   constructor (dependencies) {
//     this.#data = {}
//     this.#cloner = dependencies?.cloner || new DeepCloner()
//   }

//   /**
//    * Set the data to read from.
//    *
//    * @param {object} data - The data object to read from
//    */
//   setData (data) {
//     this.#data = data.data
//     this.#dataSet = new DataSet(this.#data.dataSets[0], { cloner: this.#cloner })
//     this.#structure = new Structure(this.#data.structure, { cloner: this.#cloner })
//   }

//   /**
//    * Get the exchange rates from the data.
//    *
//    * @returns {Array} rates - Array of rate objects
//    */
//   getRates () {
//     return this.#dataSet.getRateSeries()
//   }

//   /**
//    * Get the unit multipliers from the data.
//    *
//    * @returns {Array} multipliers - Array of unit multipliers
//    */
//   getMultipliers () {
//     return this.#structure.getUnitMultipliers()
//   }



//   /**
//    * Get the dates from the data.
//    *
//    * @returns {Array} dates - Array of date strings
//    */
//   getDates () {
//     return this.#structure.getDates()

//   }

//   /**
//    * Get the ids from the data.
//    *
//    * @returns {Array} ids - Array of currency ids, fo example: ['USD', 'EUR']
//    */
//   getIds () {
//     return this.#dataSet.getRateIds()
//   }

//   /**
//    * Gets currencies from the data.
//    *
//    * @param {string} currencyType - The type of currency to get ('BASE_CUR' or 'QUOTE_CUR')
//    * @returns {object[]} - An array of currency objects
//    */
//   getCurrencies () {
//     return this.#structure.getCurrencyIds()
//   }
// }

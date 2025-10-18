// /* global before */

// import { expect } from 'chai'
// import { DataReader } from '../../src/lib/DataReader.js'
// import { readFile } from 'fs/promises'
// import { attributes } from './mockdata/attributes.js'
// import { multipliers } from './mockdata/multipliers.js'
// import { dates } from './mockdata/dates.js'
// import { ids } from './mockdata/ids.js'
// import { rates } from './mockdata/rates.js'

// describe('DataReader', () => {
//   let data

//   before(async () => {
//     const raw = await readFile(new URL('../json/period.json', import.meta.url))
//     data = JSON.parse(raw)
//   })

//   it('getRates() OK', () => {
//     const sut = new DataReader()
//     sut.setData(data)
//     const res = sut.getRates()

//     expect(res).to.deep.equal(rates)
//   })

//   it('getAttributes() OK', () => {
//     const sut = new DataReader()
//     sut.setData(data)
//     const res = sut.getAttributes()
//     expect(res).to.deep.equal(attributes)
//   })

//   it('getIds() OK', () => {
//     const sut = new DataReader()
//     sut.setData(data)
//     const res = sut.getIds()

//     expect(res).to.deep.equal(ids)
//   })

//   it('getDates() OK', () => {
//     const sut = new DataReader()
//     sut.setData(data)
//     const res = sut.getDates()

//     expect(res).to.deep.equal(dates)
//   })

//   it('getMultipliers() OK', () => {
//     const sut = new DataReader()
//     sut.setData(data)
//     const res = sut.getMultipliers()

//     expect(res).to.deep.equal(multipliers)
//   })
// })

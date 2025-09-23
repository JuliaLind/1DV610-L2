/* global before */

import { expect } from 'chai'
import { DataReader } from '../../src/lib/DataReader.js'
import { readFile } from 'fs/promises'
import { attributes } from './mockdata/attributes.js'
import { dates } from './mockdata/dates.js'
import { ids } from './mockdata/ids.js'
import { rates } from './mockdata/rates.js'

describe('DataReader', () => {
  let data

  before(async () => {
    const raw = await readFile(new URL('../json/period.json', import.meta.url))
    data = JSON.parse(raw)
  })

  it('readRates() OK', () => {
    const sut = new DataReader()
    sut.setData(data)
    const res = sut.getRates()

    expect(res).to.deep.equal(rates)
  })

  it('readAttributes() OK', () => {
    const sut = new DataReader()
    sut.setData(data)
    const res = sut.getAttributes()
    expect(res).to.deep.equal(attributes)
  })

  it('readIds() OK', () => {
    const sut = new DataReader()
    sut.setData(data)
    const res = sut.getIds()

    expect(res).to.deep.equal(ids)
  })

  it('readDates() OK', () => {
    const sut = new DataReader()
    sut.setData(data)
    const res = sut.getDates()

    expect(res).to.deep.equal(dates)
  })
})

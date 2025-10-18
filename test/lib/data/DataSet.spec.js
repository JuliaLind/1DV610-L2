/* global before */

import { expect } from 'chai'
import { DataSet } from '../../../src/lib/data/DataSet.js'
import { readFile } from 'fs/promises'
import { rates } from '../../mockdata/rates.js'

describe('DataSet', () => {
  let data

  before(async () => {
    const raw = await readFile(new URL('../../json/period.json', import.meta.url))
    data = JSON.parse(raw).data.dataSets[0]
  })

  it('getAllRateSeries() OK', () => {
    const sut = new DataSet(data)
    const res = sut.getAllRateSeries()

    expect(res).to.deep.equal(rates)
  })

  it('getOneRateSeries() OK', () => {
    const sut = new DataSet(data)
    const res = sut.getOneRateSeries(0)
    expect(res).to.deep.equal(rates[0])
  })

  it('countSeries() OK', () => {
    const sut = new DataSet(data)
    const res = sut.countSeries()

    expect(res).to.equal(rates.length)
  })
})

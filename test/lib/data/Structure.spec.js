/* global before */

import { expect } from 'chai'
import { Structure } from '../../../src/lib/data/Structure.js'
import { readFile } from 'fs/promises'
import { attributes } from '../../mockdata/attributes.js'
import { multipliers } from '../../mockdata/multipliers.js'
import { dates } from '../../mockdata/dates.js'
import { ids } from '../../mockdata/ids.js'

describe('Structure', () => {
  let data

  before(async () => {
    const raw = await readFile(new URL('../../json/period.json', import.meta.url))
    data = JSON.parse(raw).data.structure
  })

  it('getBaseCurrency() OK', () => {
    const sut = new Structure(data)
    const res = sut.getBaseCurrency()

    expect(res).to.deep.equal({
      "id": "NOK",
      "name": "Norwegian krone"
    })
  })

  it('getTargetCurrencies() OK', () => {
    const sut = new Structure(data)
    const res = sut.getTargetCurrencies()
    expect(res).to.deep.equal([
      {
        "id": "DKK",
        "name": "Danish krone"
      },
      {
        "id": "PLN",
        "name": "Polish zloty"
      },
      {
        "id": "EUR",
        "name": "Euro"
      },
      {
        "id": "SEK",
        "name": "Swedish krona"
      }
    ])
  })

  it('getAllCurrencies() OK', () => {
    const sut = new Structure(data)
    const res = sut.getAllCurrencies()

    expect(res).to.deep.equal(
      [
        {
          "id": "DKK",
          "name": "Danish krone"
        },
        {
          "id": "PLN",
          "name": "Polish zloty"
        },
        {
          "id": "EUR",
          "name": "Euro"
        },
        {
          "id": "SEK",
          "name": "Swedish krona"
        },
        {
          "id": "NOK",
          "name": "Norwegian krone"
        }
      ]
    )
  })

  it('getDates() OK', () => {
    const sut = new Structure(data)
    const res = sut.getDates()
    expect(res).to.deep.equal(dates)
  })

  it('getUnitMultipliers() OK', () => {
    const sut = new Structure(data)
    const res = sut.getUnitMultipliers()
    expect(res).to.deep.equal(multipliers)
  })

  it('getCurrencyIds() OK', () => {
    const sut = new Structure(data)
    const res = sut.getCurrencyIds()
    expect(res).to.deep.equal(ids)
  })

  it('getOneCurrencyId() OK', () => {
    const sut = new Structure(data)
    const res = sut.getOneCurrencyId(2)
    expect(res).to.equal('EUR')
  })
})

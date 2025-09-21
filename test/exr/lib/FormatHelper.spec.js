import { expect } from 'chai'
import { FormatHelper } from '../../../src/exr/lib/FormatHelper.js'
import { rates } from './mockdata/rates.js'
import { attributes } from './mockdata/attributes.js'
import { ids } from './mockdata/ids.js'
import { dates } from './mockdata/dates.js'

describe('FormatHelper', () => {
  it('getCurrency() OK', () => {
    const sut = new FormatHelper()
    sut.setIds(['DKK', 'PLN', 'EUR', 'SEK'])
    const res = sut.getCurrency(2)
    const exp = 'EUR'
    expect(res).to.equal(exp)
  })

  it('formatOneCurrency() OK', () => {
    const sut = new FormatHelper()
    sut.setRates(rates)
    sut.setAttributes(attributes)
    sut.setIds(ids)
    sut.setDates(dates)
    const res = sut.formatOneCurrency(2)
    const exp = {
      '2025-02-20': 11.609,
      '2025-02-21': 11.629,
      '2025-02-24': 11.6355,
      '2025-02-25': 11.6638,
      '2025-02-26': 11.6895
    }
    expect(res).to.deep.equal(exp)
  })
})

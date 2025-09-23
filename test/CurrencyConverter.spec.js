/* global before */

import { expect, use } from 'chai'
import { CurrencyConverter} from '../src/index.js'


import sinon from 'sinon'
import sinonChai from 'sinon-chai'

use(sinonChai)

describe('CurrencyConverter', () => {
  it('convert() OK', async () => {
    const rateFetcher = {
      setCurrencies: sinon.stub(),
     fetchLatest: sinon.stub().resolves({
      PLN: {
        '2025-09-19': 2.7376
      },
      EUR: {
        '2025-09-19': 11.6705
      },
      SEK: {
        '2025-09-19': 1.0542
      }
    })
    }
    const sut = new CurrencyConverter({ rateFetcher })
    sut.setFromCurrency('SEK')
    sut.setToCurrencies(['PLN', 'EUR'])
    const res = await sut.convert(350)

    const exp = {
        PLN: 134.7786382,
        EUR: 31.61561201

    }

    expect(res).to.deep.equal(exp)
  })
})

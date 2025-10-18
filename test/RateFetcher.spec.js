/* global before after */

import { expect, use } from 'chai'
import { RateFetcher } from '../src/index.js'

import { readFile } from 'fs/promises'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { currencies } from './mockdata/currencies.js'

use(sinonChai)

describe('RateFetcher', () => {
  let dataPeriod
  let dataSingleDay
  let currencyData
  let fetchStub

  const apiUrl = {
    getRateRequestUrl: sinon.stub().returns('rateUrl'),
    getCurrencyRequestUrl: sinon.stub().returns('currencyUrl')
  }

  // const fetchConfig = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json'
  //   }
  // }

  before(async () => {
    let raw = await readFile(new URL('./json/period.json', import.meta.url))
    dataPeriod = JSON.parse(raw)
    raw = await readFile(new URL('./json/single-day.json', import.meta.url))
    dataSingleDay = JSON.parse(raw)
    raw = await readFile(new URL('./json/currencies.json', import.meta.url))
    currencyData = JSON.parse(raw)

    fetchStub = sinon.stub(globalThis, 'fetch')
  })

  afterEach(() => {
    fetchStub.resetHistory()
    fetchStub.resetBehavior()
  })

  after(() => {
    fetchStub.restore()
  })

  it('fetchByDate() OK', async () => {
    fetchStub.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(dataSingleDay)
    })

    const exp = {
      DKK: {
        '2025-09-19': 1.5637
      },
      PLN: {
        '2025-09-19': 2.7376
      },
      EUR: {
        '2025-09-19': 11.6705
      },
      SEK: {
        '2025-09-19': 1.0542
      }
    }

    const sut = new RateFetcher({ apiUrl })
    const currencies = ['DKK', 'PLN', 'EUR', 'SEK']
    const date = '2025-09-19'
    const res = await sut.fetchByDate({ currencies, date })

    expect(res).to.deep.equal(exp)
  })

  it('fetchLatest() OK', async () => {
    fetchStub.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(dataSingleDay)
    })

    const exp = {
      DKK: {
        '2025-09-19': 1.5637
      },
      PLN: {
        '2025-09-19': 2.7376
      },
      EUR: {
        '2025-09-19': 11.6705
      },
      SEK: {
        '2025-09-19': 1.0542
      }
    }

    const sut = new RateFetcher({ apiUrl })

    const currencies = ['DKK', 'PLN', 'EUR', 'SEK']
    const res = await sut.fetchLatest({ currencies })

    expect(res).to.deep.equal(exp)
  })

    it('fetchLatest() 5 observations integration OK', async () => {
    fetchStub.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(dataPeriod)
    })
    const exp = {
      DKK: {
        '2025-02-20': 1.5564,
        '2025-02-21': 1.5591,
        '2025-02-24': 1.5597,
        '2025-02-25': 1.5636,
        '2025-02-26': 1.5673
      },
      PLN: {
        '2025-02-20': 2.7903,
        '2025-02-21': 2.7899,
        '2025-02-24': 2.8075,
        '2025-02-25': 2.8178,
        '2025-02-26': 2.8208
      },
      EUR: {
        '2025-02-20': 11.609,
        '2025-02-21': 11.629,
        '2025-02-24': 11.6355,
        '2025-02-25': 11.6638,
        '2025-02-26': 11.6895
      },
      SEK: {
        '2025-02-20': 1.0397,
        '2025-02-21': 1.0437,
        '2025-02-24': 1.0433,
        '2025-02-25': 1.0465,
        '2025-02-26': 1.049
      }
    }

    const sut = new RateFetcher()

    const currencies = ['DKK', 'PLN', 'EUR', 'SEK']

    const res = await sut.fetchLatest({ currencies }, 5)

    expect(res).to.deep.equal(exp)
  })

  

  it('fetchByPeriod() OK', async () => {
    fetchStub.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(dataPeriod)
    })
    const exp = {
      DKK: {
        '2025-02-20': 1.5564,
        '2025-02-21': 1.5591,
        '2025-02-24': 1.5597,
        '2025-02-25': 1.5636,
        '2025-02-26': 1.5673
      },
      PLN: {
        '2025-02-20': 2.7903,
        '2025-02-21': 2.7899,
        '2025-02-24': 2.8075,
        '2025-02-25': 2.8178,
        '2025-02-26': 2.8208
      },
      EUR: {
        '2025-02-20': 11.609,
        '2025-02-21': 11.629,
        '2025-02-24': 11.6355,
        '2025-02-25': 11.6638,
        '2025-02-26': 11.6895
      },
      SEK: {
        '2025-02-20': 1.0397,
        '2025-02-21': 1.0437,
        '2025-02-24': 1.0433,
        '2025-02-25': 1.0465,
        '2025-02-26': 1.049
      }
    }

    const sut = new RateFetcher({ apiUrl })

    const currencies = ['DKK', 'PLN', 'EUR', 'SEK']
    const startDate = '2025-02-20'
    const endDate = '2025-02-26'
    const res = await sut.fetchByPeriod({ currencies, startDate, endDate })

    expect(res).to.deep.equal(exp)
  })

  it('getAvailableCurrencies() integration test', async () => {
    fetchStub.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(currencyData)
    })

    const sut = new RateFetcher({ apiUrl })
    const res = await sut.getAvailableCurrencies()

    expect(res).to.deep.equal(currencies)
  })
})

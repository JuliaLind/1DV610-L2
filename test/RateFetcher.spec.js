/* global before */

import { expect, use } from 'chai'
import { RateFetcher } from '../src/index.js'

import { readFile } from 'fs/promises'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { currencies } from './lib/mockdata/currencies.js'

use(sinonChai)

describe('RateFetcher', () => {
  const baseUrl = 'https://data.norges-bank.no/api/data/EXR/B.DKK+PLN+EUR+SEK.NOK.SP?attributes=UNIT_MULT&locale=en&'
  let dataPeriod
  let dataSingleDay
  let currencyData
  before(async () => {
    let raw = await readFile(new URL('./json/period.json', import.meta.url))
    dataPeriod = JSON.parse(raw)
    raw = await readFile(new URL('./json/single-day.json', import.meta.url))
    dataSingleDay = JSON.parse(raw)
    raw = await readFile(new URL('./json/currencies.json', import.meta.url))
    currencyData = JSON.parse(raw)
  })

  it('fetchByDate() OK', async () => {
    const fetchService = {
      setBaseUrl: sinon.stub(),
      fetch: sinon.stub().resolves(dataSingleDay)
    }

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

    const dataFormatter = {
      format: sinon.stub().returns(exp)
    }
    const sut = new RateFetcher({ fetchService, dataFormatter })
    sut.setCurrencies(['DKK', 'PLN', 'EUR', 'SEK'])
    const res = await sut.fetchByDate('2025-09-19')

    expect(res).to.deep.equal(exp)

    const queryString = 'endPeriod=2025-09-19&lastNObservations=1&format=sdmx-json'
    expect(fetchService.fetch).to.have.been.calledOnceWith(queryString)
    expect(dataFormatter.format).to.have.been.calledOnceWith(dataSingleDay)
  })

  it('fetchLatest() OK', async () => {
    const fetchService = {
      setBaseUrl: sinon.stub(),
      fetch: sinon.stub().resolves(dataSingleDay)
    }

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

    const dataFormatter = {
      format: sinon.stub().returns(exp)
    }
    const sut = new RateFetcher({ fetchService, dataFormatter })

    sut.setCurrencies(['DKK', 'PLN', 'EUR', 'SEK'])
    const res = await sut.fetchLatest()

    expect(res).to.deep.equal(exp)

    expect(fetchService.setBaseUrl).to.have.been.calledOnceWith(baseUrl)

    const queryString = 'lastNObservations=1&format=sdmx-json'
    expect(fetchService.fetch).to.have.been.calledOnceWith(queryString)
    expect(dataFormatter.format).to.have.been.calledOnceWith(dataSingleDay)
  })

  it('fetchLatest() integration test', async () => {
    const fetchService = {
      setBaseUrl: sinon.stub(),
      fetch: sinon.stub().resolves(dataSingleDay)
    }

    const sut = new RateFetcher({ fetchService })

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

    const res = await sut.fetchLatest()

    expect(res).to.deep.equal(exp)
  })

  it('fetchByPeriod() OK', async () => {
    const fetchService = {
      setBaseUrl: sinon.stub(),
      fetch: sinon.stub().resolves(dataPeriod)
    }

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

    const dataFormatter = {
      format: sinon.stub().returns(exp)
    }
    const sut = new RateFetcher({ fetchService, dataFormatter })

    sut.setCurrencies(['DKK', 'PLN', 'EUR', 'SEK'])
    const res = await sut.fetchByPeriod('2025-02-20', '2025-02-26')

    expect(res).to.deep.equal(exp)

    expect(fetchService.setBaseUrl).to.have.been.calledOnceWith(baseUrl)

    const queryString = 'startPeriod=2025-02-20&endPeriod=2025-02-26&format=sdmx-json'
    expect(fetchService.fetch).to.have.been.calledOnceWith(queryString)
    expect(dataFormatter.format).to.have.been.calledOnceWith(dataPeriod)
  })

  it('getAvailableCurrencies() OK', async () => {
    const baseDataFetcher = {
      getCurrencies: sinon.stub().resolves([...currencies])
    }

    const sut = new RateFetcher({ baseDataFetcher })
    const res = await sut.getAvailableCurrencies()
    expect(res).to.deep.equal(currencies)
    expect(baseDataFetcher.getCurrencies).to.have.been.calledOnce
  })

  it('getAvailableCurrencies() integration test', async () => {
    const fetchService = {
      setBaseUrl: sinon.stub(),
      fetch: sinon.stub().resolves(currencyData)
    }
    const sut = new RateFetcher({ fetchService })
    const res = await sut.getAvailableCurrencies()

    expect(res).to.deep.equal(currencies)
  })
})

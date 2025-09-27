/* global afterEach */

import { expect, use } from 'chai'
import { QuoteConverter } from '../src/index.js'

import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'

use(sinonChai)
use(chaiAsPromised)

describe('QuoteConverter', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('convert() OK', async () => {
    const rates = {
      PLN: {
        '2025-01-02': 2.7407,
        '2025-01-03': 2.7415,
        '2025-01-06': 2.754,
        '2025-01-07': 2.7566,
        '2025-01-08': 2.7448,
        '2025-01-09': 2.7527,
        '2025-01-10': 2.756
      },
      EUR: {
        '2025-01-02': 11.7173,
        '2025-01-03': 11.713,
        '2025-01-06': 11.7095,
        '2025-01-07': 11.7385,
        '2025-01-08': 11.738,
        '2025-01-09': 11.7605,
        '2025-01-10': 11.757
      }
    }

    const rateFetcher = {
      setCurrencies: sinon.stub(),
      fetchByPeriod: sinon.stub().resolves(rates)
    }
    const sut = new QuoteConverter({ fetcher: rateFetcher })
    sut.setCurrencies(['EUR', 'PLN'])

    const quotes = {
      '2025-01-10': 332.4,
      '2025-01-09': 334.8,
      '2025-01-08': 332,
      '2025-01-07': 334.8,
      '2025-01-06': 331,
      '2025-01-03': 332,
      '2025-01-02': 334.4
    }
    const res = await sut.convert(quotes)

    const exp = {
      '2025-01-10': { NOK: 332.4, EUR: 28.27, PLN: 120.61 },
      '2025-01-09': { NOK: 334.8, EUR: 28.47, PLN: 121.63 },
      '2025-01-08': { NOK: 332, EUR: 28.28, PLN: 120.96 },
      '2025-01-07': { NOK: 334.8, EUR: 28.52, PLN: 121.45 },
      '2025-01-06': { NOK: 331, EUR: 28.27, PLN: 120.19 },
      '2025-01-03': { NOK: 332, EUR: 28.34, PLN: 121.1 },
      '2025-01-02': { NOK: 334.4, EUR: 28.54, PLN: 122.01 }
    }

    expect(res).to.deep.equal(exp)
    expect(rateFetcher.setCurrencies).to.have.been.calledOnceWithExactly(['EUR', 'PLN'])
    expect(rateFetcher.fetchByPeriod).to.have.been.calledOnceWithExactly('2025-01-02', '2025-01-10')
  })

  it('convert() currencies not OK', () => {
    const rateFetcher = {
      setCurrencies: sinon.stub(),
      fetchByPeriod: sinon.stub().resolves()
    }

    const quotes = {
      '2025-01-10': 332.4,
      '2025-01-09': 334.8,
      '2025-01-08': 332
    }

    const sut = new QuoteConverter({ fetcher: rateFetcher })
    expect(sut.convert(quotes)).to.be.rejectedWith('QuoteConverter is not fully initialized')
    expect(rateFetcher.setCurrencies).to.not.have.been.called
    expect(rateFetcher.fetchByPeriod).to.not.have.been.called
  })
})

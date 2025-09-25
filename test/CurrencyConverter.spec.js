/* global afterEach */

import { expect, use } from 'chai'
import { CurrencyConverter } from '../src/index.js'

import sinon from 'sinon'
import sinonChai from 'sinon-chai'

use(sinonChai)

describe('CurrencyConverter', () => {
  afterEach(() => {
    sinon.restore()
  })

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

    const rateNormalizer = {
      setFromCurrency: sinon.stub(),
      setToCurrencies: sinon.stub(),
      normalize: sinon.stub(),
      reset: sinon.stub(),
      getNormalizedRates: sinon.stub().returns({
        PLN: 2.5968,
        EUR: 11.0689
      }),
      hasCachedRates: sinon.stub().returns(false)
    }

    const sut = new CurrencyConverter({ fetcher: rateFetcher, normalizer: rateNormalizer })
    sut.setFromCurrency('SEK')
    sut.setToCurrencies(['PLN', 'EUR'])
    const res = await sut.convert(350)

    const exp = {
      PLN: 134.78,
      EUR: 31.62

    }

    expect(res).to.deep.equal(exp)
  })

  describe('setFromCurrency()', () => {
    it('new fromCurrency is different from current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
      sut.setFromCurrency('EUR')
      sut.setFromCurrency('USD')

      expect(sut.getFromCurrency()).to.equal('USD')
      expect(rateNormalizer.reset).to.have.been.calledOnce
    })

    it('new fromCurrency is same as current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
      sut.setFromCurrency('EUR')
      sut.setFromCurrency('EUR')
      expect(sut.getFromCurrency()).to.equal('EUR')
      expect(rateNormalizer.reset).to.not.have.been.called
    })
  })

  describe('setToCurrencies()', () => {
    it('new toCurrencies are different from current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })

      sut.setToCurrencies(['USD', 'EUR'])
      sut.setToCurrencies(['USD', 'PLN'])

      expect(sut.getToCurrencies()).to.deep.equal(['USD', 'PLN'])
      expect(rateNormalizer.reset).to.have.been.calledOnce
    })

    it('new toCurrencies are same as current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })

      sut.setToCurrencies(['USD', 'EUR'])
      sut.setToCurrencies(['USD', 'EUR'])

      expect(sut.getToCurrencies()).to.deep.equal(['USD', 'EUR'])
      expect(rateNormalizer.reset).to.not.have.been.called
    })

    it('new toCurrencies are same as current, but different order', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })

      sut.setToCurrencies(['USD', 'EUR'])
      sut.setToCurrencies(['EUR', 'USD'])

      expect(sut.getToCurrencies()).to.deep.equal(['EUR', 'USD'])
      expect(rateNormalizer.reset).to.not.have.been.called
    })
  })

  it('clearCurrencies() OK', () => {
    const ratefetcher = sinon.stub()
    const rateNormalizer = {
      reset: sinon.stub()
    }
    const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
    sut.setFromCurrency('DKK')
    sut.setToCurrencies(['USD', 'EUR'])
    sut.clear()

    expect(sut.getFromCurrency()).to.be.null
    expect(sut.getToCurrencies()).to.deep.equal([])
    expect(rateNormalizer.reset).to.have.been.calledOnce
  })
})

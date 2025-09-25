/* global afterEach */

import { expect, use } from 'chai'
import { CurrencyConverter } from '../src/index.js'

import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiAsPromised from "chai-as-promised"

use(sinonChai)
use(chaiAsPromised)

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

  describe('convert()', () => {
    it('throws error when fromCurrency is not set', async () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub(),
        hasCachedRates: sinon.stub().returns(false)
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
      sut.setToCurrencies(['USD', 'EUR'])
      await expect(sut.convert(100)).to.be.rejectedWith('CurrencyConverter is not fully initialized')
    })

    it('throws error when toCurrencies is not set', async () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub(),
        hasCachedRates: sinon.stub().returns(false)
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
      sut.setFromCurrency('USD')
      await expect(sut.convert(100)).to.be.rejectedWith('CurrencyConverter is not fully initialized')
    })

    it ('fetcher is not called when rates are cached', async () => {
      const rateFetcher = {
        setCurrencies: sinon.stub(),
        fetchLatest: sinon.stub().resolves()
      }

      const normalizer = {
        hasCachedRates: sinon.stub().returns(true),
        getNormalizedRates: sinon.stub().returns({
          PLN: 2.5968,
          EUR: 11.0689
        })
      }

      const sut = new CurrencyConverter({ fetcher: rateFetcher, normalizer })
      sut.setFromCurrency('USD')
      sut.setToCurrencies(['PLN', 'EUR'])
      await sut.convert(100)

      expect(rateFetcher.fetchLatest).to.not.have.been.called
    })
  })



})

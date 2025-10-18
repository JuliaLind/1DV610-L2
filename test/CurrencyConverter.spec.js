/* global afterEach, before */

import { expect, use } from 'chai'
import { CurrencyConverter} from '../src/index.js'
import { readFile } from 'fs/promises'

import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'

use(sinonChai)
use(chaiAsPromised)

describe('CurrencyConverter', () => {
  let data
  let globalFetch

  before(async () => {
    const raw = await readFile(new URL('./json/single-day.json', import.meta.url))
    data = JSON.parse(raw)
    globalFetch = sinon.stub(globalThis, 'fetch')
    globalFetch.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(data)
    })
  })

  afterEach(() => {
    sinon.restore()
  })

  it('convert() OK', async () => {
    const sut = new CurrencyConverter()
    sut.setBaseCurrency('SEK')
    sut.setTargetCurrencies(['PLN', 'EUR'])
    const res = await sut.convert(350)

    const exp = {
      PLN: 134.78,
      EUR: 31.62

    }

    expect(res).to.deep.equal(exp)
  })

  describe('setBaseCurrency()', () => {
    it('new fromCurrency is different from current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
      sut.setBaseCurrency('EUR')
      sut.setBaseCurrency('USD')

      expect(sut.getBaseCurrency()).to.equal('USD')
      expect(rateNormalizer.reset).to.have.been.calledOnce
    })

    it('new fromCurrency is same as current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
      sut.setBaseCurrency('EUR')
      sut.setBaseCurrency('EUR')
      expect(sut.getBaseCurrency()).to.equal('EUR')
      expect(rateNormalizer.reset).to.not.have.been.called
    })
  })

  describe('setTargetCurrencies()', () => {
    it('new toCurrencies are different from current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })

      sut.setTargetCurrencies(['USD', 'EUR'])
      sut.setTargetCurrencies(['USD', 'PLN'])

      expect(sut.getTargetCurrencies()).to.deep.equal(['USD', 'PLN'])
      expect(rateNormalizer.reset).to.have.been.calledOnce
    })

    it('new toCurrencies are same as current', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })

      sut.setTargetCurrencies(['USD', 'EUR'])
      sut.setTargetCurrencies(['USD', 'EUR'])

      expect(sut.getTargetCurrencies()).to.deep.equal(['USD', 'EUR'])
      expect(rateNormalizer.reset).to.not.have.been.called
    })

    it('new toCurrencies are same as current, but different order', () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub()
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })

      sut.setTargetCurrencies(['USD', 'EUR'])
      sut.setTargetCurrencies(['EUR', 'USD'])

      expect(sut.getTargetCurrencies()).to.deep.equal(['EUR', 'USD'])
      expect(rateNormalizer.reset).to.not.have.been.called
    })
  })

  it('reset() OK', () => {
    const ratefetcher = sinon.stub()
    const rateNormalizer = {
      reset: sinon.stub()
    }
    const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
    sut.setBaseCurrency('DKK')
    sut.setTargetCurrencies(['USD', 'EUR'])
    sut.reset()

    expect(sut.getBaseCurrency()).to.be.null
    expect(sut.getTargetCurrencies()).to.deep.equal([])
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
      sut.setTargetCurrencies(['USD', 'EUR'])
      await expect(sut.convert(100)).to.be.rejectedWith('CurrencyConverter is not fully initialized')
    })

    it('throws error when toCurrencies is not set', async () => {
      const ratefetcher = sinon.stub()
      const rateNormalizer = {
        reset: sinon.stub(),
        hasCachedRates: sinon.stub().returns(false)
      }
      const sut = new CurrencyConverter({ fetcher: ratefetcher, normalizer: rateNormalizer })
      sut.setBaseCurrency('USD')
      await expect(sut.convert(100)).to.be.rejectedWith('CurrencyConverter is not fully initialized')
    })

    it('fetcher is not called when rates are cached', async () => {
      const rateFetcher = {
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
      sut.setBaseCurrency('USD')
      sut.setTargetCurrencies(['PLN', 'EUR'])
      await sut.convert(100)

      expect(rateFetcher.fetchLatest).to.not.have.been.called
    })
  })
})

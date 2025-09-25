import { expect } from 'chai'
import { RateNormalizer } from '../../src/lib/RateNormalizer.js'


describe('RateNormalizer', () => {
  const rates = {
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

  it('set/get fromCurrency OK', () => {
    const sut = new RateNormalizer()
    sut.setFromCurrency('EUR')
    const res = sut.getFromCurrency()
    const exp = 'EUR'
    expect(res).to.equal(exp)
  })

  it('set/get toCurrencies OK', () => {
    const sut = new RateNormalizer()
    sut.setToCurrencies(['DKK', 'PLN', 'USD'])
    const res = sut.getToCurrencies()
    const exp = ['DKK', 'PLN', 'USD']
    expect(res).to.deep.equal(exp)
  })

  it('hasCachedRates() returns false when no rates are set', () => {
    const sut = new RateNormalizer()
    let res = sut.hasCachedRates()

    expect(res).to.be.false
  })

  it('hasCachedRates() returns true when rates are set', () => {
    const sut = new RateNormalizer()
    sut.setFromCurrency('EUR')
    sut.setToCurrencies(['DKK', 'PLN', 'SEK'])
    sut.normalize(rates)
    let res = sut.hasCachedRates()

    expect(res).to.be.true
  })

  it('reset() clears cached rates', () => {
    const sut = new RateNormalizer()
    sut.setFromCurrency('EUR')
    sut.setToCurrencies(['DKK', 'PLN', 'SEK'])
    sut.normalize(rates)
    let res = sut.hasCachedRates()

    expect(res).to.be.true
    sut.reset()
    res = sut.hasCachedRates()
    expect(res).to.be.false
  })

  it('normalize OK', () => {
    const sut = new RateNormalizer()
    sut.setFromCurrency('EUR')
    sut.setToCurrencies(['DKK', 'PLN', 'SEK', 'NOK'])
    sut.normalize(rates)
    const res = sut.getNormalizedRates()
    const exp = {
      "DKK": 0.1340,
      "PLN": 0.2346,
      "SEK": 0.0903,
      "NOK": 0.0857
    }
    expect(res).to.deep.equal(exp)
  })
})

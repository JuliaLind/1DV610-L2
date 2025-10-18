import { expect } from 'chai'
import { Currency } from '../../../src/lib/data/Currency.js'

describe('Currency', () => {
  describe('getId', () => {
    it('should return the currency ID', () => {
      const currency = new Currency({ id: 'EUR' })
      expect(currency.getId()).to.equal('EUR')
    })
  })

  describe('getRates', () => {
    it('should return rates that have been matched with dates and unit multiplier adjusted', () => {
      const data = {
        id: 'DKK',
        observations: {
          0: [
            '155.64'
          ],
          1: [
            '155.91'
          ],
          2: [
            '155.97'
          ],
          3: [
            '156.36'
          ],
          4: [
            '156.73'
          ]
        },
        attributes: [0],
        dates: [
          '2025-02-20',
          '2025-02-21',
          '2025-02-24',
          '2025-02-25',
          '2025-02-26'
        ],
        multipliers: [
          {
            id: '2',
            name: 'Hundreds'
          },
          {
            id: '0',
            name: 'Units'
          }
        ]
      }

      const currency = new Currency(data)
      expect(currency.getRates()).to.deep.equal(
        {
          '2025-02-20': 1.5564,
          '2025-02-21': 1.5591,
          '2025-02-24': 1.5597,
          '2025-02-25': 1.5636,
          '2025-02-26': 1.5673
        }
      )
    })
  })
})

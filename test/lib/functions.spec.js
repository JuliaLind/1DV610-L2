import { expect } from 'chai'
import { round, arraysAreEqual } from '../../src/lib/functions.js'

describe('functions', () => {
  describe('round()', () => {
    const values = [
      { input: [1.005], expected: 1.01 },
      { input: [1.004], expected: 1.00 },
      { input: [1.004, 3], expected: 1.004 },
      { input: [1.0049, 3], expected: 1.005 }
    ]

    values.forEach(({ input, expected }) => {
      it(`round(${input.join(', ')}) should return ${expected}`, () => {
        expect(round(...input)).to.equal(expected)
      })
    })
  })

  // describe('arraysAreEqual()', () => {
  //   it('["PLN", "USD"], ["PLN", "USD"] should be true', () => {
  //     expect(arraysAreEqual(['PLN', 'USD'], ['PLN', 'USD'])).to.be.true
  //   })

  //   it('["PLN", "EUR"], ["EUR", "PLN"] should be true', () => {
  //     expect(arraysAreEqual(['PLN', 'EUR'], ['EUR', 'PLN'])).to.be.true
  //   })

  //   it('["PLN", "EUR"], ["EUR", "USD"] should be false', () => {
  //     expect(arraysAreEqual(['PLN', 'EUR'], ['EUR', 'USD'])).to.be.false
  //   })
  // })
})

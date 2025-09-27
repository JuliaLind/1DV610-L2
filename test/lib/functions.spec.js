import { expect } from 'chai'
import { round } from '../../src/lib/functions.js'

describe('functions', () => {
    const values = [
        { input: [1.005], expected: 1.01 },
        { input: [1.004], expected: 1.00 },
        { input: [1.004, 3], expected: 1.004 },
        { input: [1.0049, 3], expected: 1.005 }
    ]

    it ('round() OK', () => {
      values.forEach(({ input, expected }) => {
        expect(round(...input)).to.equal(expected)
      })
    })

})
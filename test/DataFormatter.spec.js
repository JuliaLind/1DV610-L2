/* global before */

import { expect } from 'chai'
import { DataFormatter } from '../src/lib/DataFormatter.js'
import { readFile } from 'fs/promises'

describe('DataFormatter', () => {
  let data

  before(async () => {
    const raw = await readFile(new URL('./json/period.json', import.meta.url))
    data = JSON.parse(raw)
  })

  describe('format', () => {
    it('should format data correctly', () => {
      const formatter = new DataFormatter()
      const formatted = formatter.format(data)
      const exp = {
        DKK: [
            { date: '2025-02-20', value: 1.5564 },
            { date: '2025-02-21', value: 1.5591 },
            { date: '2025-02-24', value: 1.5597 },
            { date: '2025-02-25', value: 1.5636 },
            { date: '2025-02-26', value: 1.5673 }
        ],
        PLN: [
            { date: '2025-02-20', value: 2.7903 },
            { date: '2025-02-21', value: 2.7899 },
            { date: '2025-02-24', value: 2.8075 },
            { date: '2025-02-25', value: 2.8178 },
            { date: '2025-02-26', value: 2.8208 }
        ],
        EUR: [
            { date: '2025-02-20', value: 11.609 },
            { date: '2025-02-21', value: 11.629 },
            { date: '2025-02-24', value: 11.6355 },
            { date: '2025-02-25', value: 11.6638 },
            { date: '2025-02-26', value: 11.6895 }
        ],
        SEK: [
            { date: '2025-02-20', value: 1.0397 },
            { date: '2025-02-21', value: 1.0437 },
            { date: '2025-02-24', value: 1.0433 },
            { date: '2025-02-25', value: 1.0465 },
            { date: '2025-02-26', value: 1.049 }
        ]
    }

      expect(formatted).to.deep.equal(exp)
    })
  })
})

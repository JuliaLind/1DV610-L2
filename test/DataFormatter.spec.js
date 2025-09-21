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

      expect(formatted).to.deep.equal(exp)
    })
  })
})

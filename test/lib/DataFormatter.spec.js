/* global before */

import { expect, use } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { DataFormatter } from '../../src/lib/DataFormatter.js'
import { readFile } from 'fs/promises'
import { rates } from './mockdata/rates.js'
import { multipliers } from './mockdata/multipliers.js'
import { ids } from './mockdata/ids.js'
import { dates } from './mockdata/dates.js'

use(sinonChai)

describe('DataFormatter', () => {
  let dataPeriod
  let dataSingleDay

  before(async () => {
    let raw = await readFile(new URL('../json/period.json', import.meta.url))
    dataPeriod = JSON.parse(raw)
    raw = await readFile(new URL('../json/single-day.json', import.meta.url))
    dataSingleDay = JSON.parse(raw)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('format()', () => {
    it('data contains 4 different currencies and a period of 5 days, OK', () => {
      const sut = new DataFormatter()
      const res = sut.format(dataPeriod)
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

      expect(res).to.deep.equal(exp)
    })

    it('data contains 4 different currencies and a single day, OK', () => {
      const sut = new DataFormatter()
      const res = sut.format(dataSingleDay)
      const exp = {
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

      expect(res).to.deep.equal(exp)
    })

    it('with mocked DataReader and FormatHelper, OK', () => {
      const exrDkk = {
        '2025-02-20': 1.5564,
        '2025-02-21': 1.5591,
        '2025-02-24': 1.5597,
        '2025-02-25': 1.5636,
        '2025-02-26': 1.5673
      }

      const exrPln = {
        '2025-02-20': 2.7903,
        '2025-02-21': 2.7899,
        '2025-02-24': 2.8075,
        '2025-02-25': 2.8178,
        '2025-02-26': 2.8208
      }

      const exrEur = {
        '2025-02-20': 11.609,
        '2025-02-21': 11.629,
        '2025-02-24': 11.6355,
        '2025-02-25': 11.6638,
        '2025-02-26': 11.6895
      }

      const exrSek = {
        '2025-02-20': 1.0397,
        '2025-02-21': 1.0437,
        '2025-02-24': 1.0433,
        '2025-02-25': 1.0465,
        '2025-02-26': 1.049
      }

      const reader = {
        setData: sinon.stub(),
        getRates: sinon.stub().returns(rates),
        getMultipliers: sinon.stub().returns(multipliers),
        getIds: sinon.stub().returns(ids),
        getDates: sinon.stub().returns(dates)
      }


      const sut = new DataFormatter({
        reader
      })
      const res = sut.format(dataPeriod)

      expect(reader.setData).to.have.been.calledOnceWith(dataPeriod)
      expect(reader.getRates).to.have.been.calledOnce
      expect(reader.getMultipliers).to.have.been.calledOnce
      expect(reader.getIds).to.have.been.calledOnce
      expect(reader.getDates).to.have.been.calledOnce
      expect(res).to.deep.equal({
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
      })
    })
  })
})

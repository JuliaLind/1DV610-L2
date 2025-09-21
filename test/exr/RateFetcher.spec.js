/* global before */

import { expect, use } from 'chai'
import { RateFetcher } from '../../src/exr/RateFetcher.js'
import { readFile } from 'fs/promises'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

use(sinonChai)


describe('RateFetcher', () => {
    let dataPeriod
    let dataSingleDay
    before(async () => {
        let raw = await readFile(new URL('../json/period.json', import.meta.url))
        dataPeriod = JSON.parse(raw)
        raw = await readFile(new URL('../json/single-day.json', import.meta.url))
        dataSingleDay = JSON.parse(raw)
    })

    it('fetchByDate() OK', async () => {
        const fetchService = {
            setBaseUrl: sinon.stub(),
            get: sinon.stub().resolves(dataSingleDay)
        }

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

        const dataFormatter = {
            format: sinon.stub().returns(exp)
        }
        const sut = new RateFetcher(['DKK', 'PLN', 'EUR', 'SEK'], { fetchService, dataFormatter })
        const res = await sut.fetchByDate('2025-09-19')

        expect(res).to.deep.equal(exp)

        const baseUrl = `https://data.norges-bank.no/api/data/EXR/B.DKK+PLN+EUR+SEK.NOK.SP`
        expect(fetchService.setBaseUrl).to.have.been.calledOnceWith(baseUrl)

        const queryString = 'endPeriod=2025-09-19&lastNObservations=1&format=sdmx-json'
        expect(fetchService.get).to.have.been.calledOnceWith(queryString)
        expect(dataFormatter.format).to.have.been.calledOnceWith(dataSingleDay)
    })

})

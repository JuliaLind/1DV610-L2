/* global before, after */

import { expect, use } from 'chai'
import { JsonFetchService } from '../../../src/lib/api/JsonFetchService.js'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { formattedRates } from '../../mockdata/formatted-rates.js'
import { readFile } from 'fs/promises'

use(sinonChai)

describe('JsonFetchService', () => {
  let fetchStub
  let dataPeriod

  const url = 'fullurl.com/api/somequerystring'
  const fetchConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }

  before(async () => {
    fetchStub = sinon.stub(globalThis, 'fetch')
    let raw = await readFile(new URL('../../json/period.json', import.meta.url))
    dataPeriod = JSON.parse(raw)
  })

  after(() => {
    fetchStub.restore()
  })

  it('fetch() OK', async () => {
    const sut = new JsonFetchService()


    fetchStub.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(dataPeriod)
    })

    const res = await sut.fetch(url)
    expect(res).to.be.an.instanceOf(Object)
    expect(res.getRates()).to.deep.equal(formattedRates)

    expect(fetchStub).to.have.been.calledOnceWith(url, fetchConfig)
  })

  it('fetch() with fetch error, Not OK', async () => {
    const sut = new JsonFetchService()

    const exception = new Error('some error')
    fetchStub.rejects(exception)

    expect(sut.fetch(url)).to.be.rejectedWith(exception.message)
  })

  it('fetch() with 404 response, Not OK', async () => {
    const sut = new JsonFetchService()

    const errorMsg = 'No data for data query against the dataflow: urn:sdmx:org.sdmx.infomodel.datastructure.Dataflow=NB:EXR(1.0)'

    fetchStub.resolves({
      /**
       * Mocked fetch response with 404 error.
       *
       * @returns {Promise<object>} - promise containing the fake error object
       */
      json: () => Promise.resolve({
        errors: [
          {
            code: 404,
            message: errorMsg
          }
        ]
      })
    })

    expect(sut.fetch(url)).to.be.rejectedWith(errorMsg)
  })
})

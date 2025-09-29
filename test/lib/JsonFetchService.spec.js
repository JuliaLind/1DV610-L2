/* global before, after */

import { expect, use } from 'chai'
import { JsonFetchService } from '../../src/lib/JsonFetchService.js'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

use(sinonChai)

describe('JsonFetchService', () => {
  let fetchStub
  before(() => {
    fetchStub = sinon.stub(globalThis, 'fetch')
  })

  after(() => {
    fetchStub.restore()
  })

  it('get() OK', async () => {
    const sut = new JsonFetchService()

    const fakeUrl = 'myfakeurl'
    const queryString = 'param1=value1&param2=value2'
    const fakeData = {
      id: 'someid'
    }

    fetchStub.resolves({
      /**
       * Mocked fetch response.
       *
       * @returns {Promise<object>} - promise containing the fake data object
       */
      json: () => Promise.resolve(fakeData)
    })

    sut.setBaseUrl(fakeUrl)
    const res = await sut.get(queryString)
    expect(res).to.deep.equal(fakeData)

    expect(fetchStub).to.have.been.calledOnceWith(`${fakeUrl}?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
  })

  it('get() with fetch error, Not OK', async () => {
    const sut = new JsonFetchService()

    const fakeUrl = 'myfakeurl'
    const queryString = 'param1=value1&param2=value2'
    const exception = new Error('some error')
    fetchStub.rejects(exception)

    sut.setBaseUrl(fakeUrl)
    expect(sut.get(queryString)).to.be.rejectedWith(exception.message)
  })

  it('get() with 404 response, Not OK', async () => {
    const sut = new JsonFetchService()

    const fakeUrl = 'myfakeurl'
    const queryString = 'param1=value1&param2=value2'

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
            message: 'No data for data query against the dataflow: urn:sdmx:org.sdmx.infomodel.datastructure.Dataflow=NB:EXR(1.0)'
          }
        ]
      })
    })

    sut.setBaseUrl(fakeUrl)
    expect(sut.get(queryString)).to.be.rejectedWith('No data for data query against the dataflow: urn:sdmx:org.sdmx.infomodel.datastructure.Dataflow=NB:EXR(1.0)')
  })
})

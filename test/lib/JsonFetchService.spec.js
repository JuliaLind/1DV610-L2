import { expect, use } from 'chai'
import { JsonFetchService } from '../../src/lib/JsonFetchService.js'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

use(sinonChai)


describe('JsonFetchService', () => {
    it('get OK', async () => {
        const sut = new JsonFetchService()

        const fakeUrl = 'myfakeurl'
        const queryString = 'param1=value1&param2=value2'
        const fakeData = {
            id: 'someid',
        }

        sinon.stub(globalThis, 'fetch').resolves({
            json: () => Promise.resolve(fakeData)
        })

        sut.setBaseUrl(fakeUrl)
        const res = await sut.get(queryString)
        expect(res).to.deep.equal(fakeData)

        expect(globalThis.fetch).to.have.been.calledOnceWith(`${fakeUrl}?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
    })
})

/* global before */

import { expect, use } from 'chai'
import { readFile } from 'fs/promises'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { BaseDataFetcher } from '../../src/lib/BaseDataFetcher.js'
import { JsonFetchService } from '../../src/lib/JsonFetchService.js'
import { DeepCloner } from '../../src/index.js'
import { DataReader } from '../../src/lib/DataReader.js'

import { currencies } from './mockdata/currencies.js'

use(sinonChai)

describe('BaseDataFetcher', () => {
  let sut
  let data
  const fetchService = new JsonFetchService()

  const cloner = new DeepCloner()
  const reader = new DataReader()
  let currenciesCopy

  before(async () => {
    data = await readFile(new URL('../json/currencies.json', import.meta.url))
    sut = new BaseDataFetcher(
      {
        fetchService,
        cloner,
        reader
      }
    )
    sinon.stub(fetchService, 'setBaseUrl')
    sinon.stub(fetchService, 'fetch')
    sinon.stub(cloner, 'clone')
    sinon.stub(reader, 'setData')
    sinon.stub(reader, 'getCurrencies').returns([...currencies])
  })

  afterEach(() => {
    sinon.restore()
  })

  beforeEach(() => {
    currenciesCopy = [...currencies]
    fetchService.fetch.resolves(data)
    cloner.clone.returns(currenciesCopy)
    reader.getCurrencies.returns(currenciesCopy)
  })

  describe('getCurrencies', () => {
    it('should fetch available currencies', async () => {
      const response = await sut.getCurrencies()
      const baseUrl = 'https://data.norges-bank.no/api/data/EXR/?'
      const currencyUrl = 'apisrc=qb&format=sdmx-json&detail=nodata&attributes=FALSE'

      expect(response).to.deep.equal(currenciesCopy)
      expect(fetchService.setBaseUrl).to.have.been.calledOnceWith(baseUrl)
      expect(fetchService.fetch).to.have.been.calledOnceWith(currencyUrl)
      expect(cloner.clone).to.have.been.calledOnceWith(currenciesCopy)
      expect(reader.setData).to.have.been.calledOnceWith(data)
      expect(reader.getCurrencies).to.have.been.calledWith('BASE_CUR')
      expect(reader.getCurrencies).to.have.been.calledWith('QUOTE_CUR')
    })
  })
})

import { expect } from 'chai'
import { ApiUrl } from '../../../src/lib/api/ApiUrl.js'

describe('ApiUrl', () => {
  const sut = new ApiUrl()

  it('getRateRequestUrl() 5 observations OK', () => {
    const url = sut.getRateRequestUrl(['USD', 'EUR'], { observations: 5 })

    expect(url).to.include('lastNObservations=5')
  })
})

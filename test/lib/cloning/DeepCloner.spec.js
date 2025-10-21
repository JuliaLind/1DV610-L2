import { expect } from 'chai'
import { DeepCloner } from '../../../src/lib/cloning/DeepCloner.js'

describe('DeepCloner', () => {
  const primitiveTypes = [42, 'hello', true, null, undefined]

  primitiveTypes.forEach(value => {
    it(`Clone primitive type: ${String(value)} OK`, () => {
      const sut = new DeepCloner()

      expect(sut.clone(value)).to.equal(value)
    })
  })

  it('clone() OK, Date object', () => {
    const sut = new DeepCloner()
    const date = new Date('2023-10-01T12:00:00Z')
    const copy = sut.clone(date)
    expect(copy).to.deep.equal(date)
    expect(copy).to.not.equal(date) // Ensure it's a different instance
  })

  it('clone() OK object with nested elements', () => {
    const sut = new DeepCloner()
    const objKey = {
      nestedKey: 'nestedValue'
    }
    const objValue = [
      { id: 1, name: 'Item 1' }
    ]

    const original = {
      someNr: 5,
      someObj: {
        someOtherNr: 4,
        anArr: [5, 6, 8]
      },
      aSet: new Set([1, 2, 3]),
      aMap: new Map([
        [objKey, 'value1'],
        ['key2', objValue]
      ]),
      name: 'Original'
    }

    const clone = sut.clone(original)

    expect(clone).to.deep.equal(original)
    expect(clone).to.not.equal(original)
    expect(clone.someObj).to.not.equal(original.someObj)
    expect(clone.someObj.anArr).to.not.equal(original.someObj.anArr)
    expect(clone.aSet).to.not.equal(original.aSet)
    expect(clone.aMap).to.not.equal(original.aMap)
    expect(clone.aMap.get(objKey)).to.equal('value1') // keys should not be deep cloned
    expect(clone.aMap.get('key2')).to.deep.equal(objValue)
    expect(clone.aMap.get('key2')).to.not.equal(objValue)
  })
})

import { expect } from 'chai'
import { TypeChecker } from '../../src/lib/TypeChecker.js'

describe('TypeChecker', () => {
  const sut = new TypeChecker()

  const primitives = [42, 'hello', true, null, undefined]

  primitives.forEach((value) => {
    it(`isPrimitive() OK for primitive value: ${value}`, () => {
      expect(sut.isPrimitive(value)).to.equal(true)
    })
  })

  const nonPrimitives = [{}, [], new Date(), new Set(), () => { }]
  nonPrimitives.forEach((value) => {
    it(`isPrimitive() not OK for non-primitive value: ${value}`, () => {
      expect(sut.isPrimitive(value)).to.equal(false)
    })
  })

  const nullishValues = [null, undefined]
  nullishValues.forEach((value) => {
    it(`isNullOrUndefined() OK for nullish value: ${value}`, () => {
      expect(sut.isNullOrUndefined(value)).to.equal(true)
    })
  })

  const nonNullishValues = [42, 'hello', true, {}, [], new Date(), new Set(), () => { }]
  nonNullishValues.forEach((value) => {
    it(`isNullOrUndefined() not OK for non-nullish value: ${value}`, () => {
      expect(sut.isNullOrUndefined(value)).to.equal(false)
    })
  })

  it('isDate() OK', () => {
    expect(sut.isDate(new Date())).to.equal(true)
  })

  const nonDateValues = ['2023-10-01', {}, null, undefined]
  nonDateValues.forEach((value) => {
    it(`isDate() not OK for non-Date value: ${value}`, () => {
      expect(sut.isDate(value)).to.equal(false)
    })
  })

  const arrays = [[], [1, 2, 3], new Array()] // eslint-disable-line no-array-constructor
  arrays.forEach((value) => {
    it(`isArray() OK for array value: ${value}`, () => {
      expect(sut.isArray(value)).to.equal(true)
    })
  })

  const nonArrayValues = [{}, 'not an array', null, undefined, 42]
  nonArrayValues.forEach((value) => {
    it(`isArray() not OK for non-array value: ${value}`, () => {
      expect(sut.isArray(value)).to.equal(false)
    })
  })

  const functions = [() => { }, function () { }, async function () { }]
  functions.forEach((value) => {
    it(`isFunction() OK for function value: ${value}`, () => {
      expect(sut.isFunction(value)).to.equal(true)
    })
  })

  const nonFunctionValues = [{}, [], null, undefined, 42, 'not a function']
  nonFunctionValues.forEach((value) => {
    it(`isFunction() not OK for non-function value: ${value}`, () => {
      expect(sut.isFunction(value)).to.equal(false)
    })
  })

  const sets = [new Set(), new Set([1, 2, 3])]
  sets.forEach((value) => {
    it(`isSet() OK for Set value: ${value}`, () => {
      expect(sut.isSet(value)).to.equal(true)
    })
  })

  const nonSetValues = [{}, [], null, undefined, 42, 'not a set']
  nonSetValues.forEach((value) => {
    it(`isSet() not OK for non-Set value: ${value}`, () => {
      expect(sut.isSet(value)).to.equal(false)
    })
  })

  const maps = [new Map(), new Map([['a', 1], ['b', 2]])]
  maps.forEach((value) => {
    it(`isMap() OK for Map value: ${value}`, () => {
      expect(sut.isMap(value)).to.equal(true)
    })
  })

  const nonMapValues = [{}, [], null, undefined, 42, 'not a map']
  nonMapValues.forEach((value) => {
    it(`isMap() not OK for non-Map value: ${value}`, () => {
      expect(sut.isMap(value)).to.equal(false)
    })
  })
})

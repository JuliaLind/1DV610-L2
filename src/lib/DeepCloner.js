import { TypeChecker } from './TypeChecker.js'

/**
 * Class for deep cloning objects.
 */
export class DeepCloner {
    #typeChecker

    constructor(
        dependencies = {
            typeChecker: new TypeChecker()
        }
    ) {
        this.#typeChecker = dependencies.typeChecker
    }

    /**
     * Deep clones any object or array and its nested elements.
     * Custom classes are converted to plain objects.
     *
     * @param {any} any - The value to clone.
     * @returns {any} - The cloned value.
     */
    clone(any) {
        if (this.#typeChecker.isPrimitive(any) || this.#typeChecker.isFunction(any)) {
            return any
        }

        if (this.#typeChecker.isDate(any)) {
            return this.#cloneDate(any)
        }

        if (this.#typeChecker.isSet(any)) {
            return this.#cloneSet(any)
        }

        if (any instanceof Map) {
            return this.#cloneMap(any)
        }

        return this.#typeChecker.isArray(any) ? this.#cloneArr(any) : this.#cloneObj(any)
    }

    /**
     * Clones a Date object.
     *
     * @param {Date} date - The date to clone.
     * @returns {Date} - The cloned date.
     */
    #cloneDate(date) {
        return new Date(date.getTime())
    }

    /**
     * Clones a Set object.
     *
     * @param {Set} set - The set to clone.
     * @returns {Set} - The cloned set.
     */
    #cloneSet(set) {
        const clone = new Set()
        for (const item of set) {
            clone.add(this.clone(item))
        }
        return clone
    }

    /**
     * Clones a Map object.
     *
     * @param {Map} map - The map to clone.
     * @returns {Map} - The cloned map.
     */
    #cloneMap(map) {
        const clone = new Map()
        for (const [key, value] of map) {
            clone.set(key, this.clone(value))
        }
        return clone
    }

    /**
     * Deep clones an array and its nested elements.
     *
     * @param {any[]} arr - The array to clone.
     * @returns {any[]} - The cloned array.
     */
    #cloneArr(arr) {
        const clone = []

        for (const item of arr) {
            clone.push(this.clone(item))
        }

        return clone
    }

    /**
     * Deep clones an object and its nested elements.
     *
     * @param {object} obj - The object to clone.
     * @returns {object} - The cloned object.
     */
    #cloneObj(obj) {
        const clone = {}

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = this.clone(obj[key])
            }
        }
        return clone
    }

}

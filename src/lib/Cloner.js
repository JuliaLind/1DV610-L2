export class Cloner {
    /**
     * Deep clones any object or array and its nested elements.
     *
     * @param {any} any - The value to clone.
     * @returns {any} - The cloned value.
     */
    deepClone(any) {
        if (any === null || typeof any !== 'object') {
            return any
        }

        return Array.isArray(any) ? this.#deepCloneArr(any) : this.#deepCloneObj(any)
    }

    /**
     * Deep clones an array and its nested elements.
     *
     * @param {any[]} arr - The array to clone.
     * @returns {any[]} - The cloned array.
     */
    #deepCloneArr(arr) {
        const clone = []

        for (const item of arr) {
            clone.push(this.deepClone(item))
        }

        return clone
    }

    /**
     * Deep clones an object and its nested elements.
     *
     * @param {object} obj - The object to clone.
     * @returns {object} - The cloned object.
     */
    #deepCloneObj(obj) {
        const clone = {}

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = this.deepClone(obj[key])
            }
        }
        return clone
    }

}

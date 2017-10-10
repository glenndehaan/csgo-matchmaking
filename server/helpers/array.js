/**
 * Find index in array of objects
 *
 * @param data
 * @param property
 * @param value
 * @return {number | boolean}
 */
function findIndexInData(data, property, value) {
    for (let i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return i;
        }
    }

    return false;
}

/**
 * Find object in array of objects
 *
 * @param data
 * @param property
 * @param value
 * @return {number | boolean}
 */
function findObjectInData(data, property, value) {
    for (let i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return data[i];
        }
    }

    return false;
}

module.exports = {findIndexInData, findObjectInData};

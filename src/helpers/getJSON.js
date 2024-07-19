import { createRequire } from 'node:module'

/**
 * Function to use require to bring JSON data.
 * @param {string} path It's the path that file must follow to find the file. The origin is this function's file.
 * @returns {object} movies
 */
function getJSON(path) {
    const require = createRequire(import.meta.url) // import.meta.url indicates to file path
    const data = require(path)

    return data
}

export default getJSON

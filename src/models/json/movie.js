import getJSON from '../helpers/getJSON.js'
import crypto from 'node:crypto'
const movies = getJSON('../public/data/movies.json')

export class MovieModel {
    static async getAll({ genre, title, year }) {

        console.log("Model", genre, title, year)
        let response = movies
        if (genre) {
            response = movies.filter(
                movie => movie.genre.map(e => e.toLowerCase()).includes(genre.toLowerCase())
            )
        }
        if (title)
            response = movies.filter(
                movie => movie.title.toLowerCase().includes(title)
            )
        if (year)
            response = movies.filter(
                movie => movie.year == year
            )

        return response
    }

    static async getById({ id }) {
        const result = movies.find(movie => movie.id === id)

        return result
    }

    static async create(values) {
        const newMovie = {
            id: crypto.randomUUID(),
            ...values
        }

        movies.push(newMovie)
        return newMovie
    }

    static async update(id, values) {
        const index = movies.findIndex(movie => movie.id === id)
        if (index === -1)
            return false

        const updateMovie = {
            ...movies[index],
            ...values.data
        }

        movies[index] = updateMovie
        return true
    }

    static async delete({ id }) {
        const index = movies.findIndex(movie => movie.id === id)
        if (index === -1)
            return false

        movies.splice(index, 1)
        return true
    }
}
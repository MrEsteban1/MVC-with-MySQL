import { MovieModel } from "../models/sql/movie.js";
import { movieSchema } from "../schemas/movies.js"

export class MovieController {
    static async getAll(req, res) {
        try {
            const responseMovies = await MovieModel.getAll(req.query)

            return res.status(200).send(responseMovies)
        } catch (error) {
            return res.status(500).json({ message: 'Apologies, action can not be complete right now', description: error.message })
        }

    }

    static async getById(req, res) {
        try {
            const movie = await MovieModel.getById(req.params)

            if (movie)
                return res.status(200).json(movie)
            else
                return res.status(404).json({ message: 'Movie not found.' })
        } catch (error) {
            return res.status(500).json({ message: 'Apologies, action can not be complete right now', description: error.message })
        }

    }

    static async create(req, res) {
        const bodyValidation = movieSchema.safeParse(req.body) // Validates data from body.

        if (bodyValidation.error)
            return res.status(400).json({
                message: 'The movie could not be added.',
                error: JSON.parse(bodyValidation.error.message)
            })
        try {
            const newMovie = await MovieModel.create(bodyValidation.data)

            globalThis.console.log(newMovie)
            return res.status(201).json({ message: 'Movie created.', data: newMovie })
        } catch (error) {
            return res.status(500).json({ message: 'Apologies, create action can not be complete right now.', description: error.message || 'Server error.' })
        }



    }

    static async update(req, res) {
        const { id } = req.params

        const bodyValidation = movieSchema.partial().safeParse(req.body)

        if (!bodyValidation.success)
            return res.status(400).json({
                message: 'Movie values must be correct.',
                error: JSON.parse(bodyValidation.error.message)
            })

        try {
            const result = await MovieModel.update(id, bodyValidation.data)
            if (!result)
                return res.status(404).json({ message: 'Movie not found.' })

            return res.status(200).json({ message: 'Movie updated.', data: result })
        } catch (error) {
            return res.status(500).json({ message: 'Apologies, create action can not be complete right now.', description: error.message || 'Server error.' })
        }


    }

    static async delete(req, res) {
        try {
            const result = await MovieModel.delete(req.params)
            if (!result)
                return res.status(404).json({ message: 'Movie not found.' })

            return res.status(200).json({ message: 'Movie eliminated.' })
        } catch (error) {
            return res.status(500).json({ message: 'Apologies, create action can not be complete right now.', description: error.message || 'Server error.' })
        }


    }
}
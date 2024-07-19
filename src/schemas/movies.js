import zod from 'zod'

const movieGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']

export const movieSchema = zod.object({
    title: zod.string({
        required_error: 'Movie title is required.',
        invalid_type_error: 'Movie title must be a string'
    }),
    year: zod.number().int().positive().min(1900).max(2024),
    director: zod.string(),
    duration: zod.number().int().positive(),
    rate: zod.number().min(0).max(10),
    genre: zod.array(zod.enum(movieGenres))
}
)
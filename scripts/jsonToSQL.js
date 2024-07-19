import path from 'node:path'
import getJSON from './helpers/getJSON.js'
import fs from 'node:fs'

// Preparing VALUES for insert in movie table
const movies = getJSON('../public/data/movies.json')
const createInsert = ({ title, year, director, duration, poster, rate }) =>
    `(UUID_TO_BIN(UUID()), "${title}", ${year}, "${director}", ${duration}, "${poster}", ${rate}),`

const inserts = movies.map(createInsert).join('\n')
console.log(inserts)
fs.writeFileSync(path.join('.', 'sql/movie_inserts.sql'), inserts, 'utf-8')


// Preparing VALUES for insert in movie_genre table
let genre_inserts = []
for (let movie of movies) {
    const selectTitle = `((SELECT id FROM movie WHERE title='${movie.title}'))`
    const createInsert = (genre) => `${selectTitle},(SELECT id FROM movie WHERE name='${genre}'),`

    const inserts = movie.genre.map(createInsert)

    genre_inserts = [...genre_inserts, ...inserts]
}

fs.writeFileSync(path.join('.', 'sql/genre_movie_inserts.sql'), genre_inserts.join('\n'), 'utf-8')

console.log(genre_inserts.join('\n'))




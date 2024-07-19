import express, { json } from 'express'
import "dotenv/config.js"
import { movieRouter } from './src/routes/movies.js';
import { handleCors } from './src/middlewares/handleCors.js';

const PORT = process.env.PORT || 3000
const app = express()

// Disable data of header that inform express implementation. Recommended in terms of security.
app.disable('x-powered-by')
// Middleware that allows parse json body.
app.use(express.json())
// Allows requests from other host
app.use(handleCors())
app.use(json())
app.use('/movies', movieRouter)

app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`)
})
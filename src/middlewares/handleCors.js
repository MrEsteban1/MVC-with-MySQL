import cors from 'cors'
const ACEPTED_ORIGINS = [
    'http://localhost:3000/',
    'http://localhost:8080/',
]
export function handleCors({ acceptedOrigins = ACEPTED_ORIGINS } = {}) {
    return cors({
        origin: (origin, callback) => {
            if (!origin || acceptedOrigins.includes(origin))
                return callback(null, true)

            return callback(new Error('Cors error: not allowed'))
        }
    })
}
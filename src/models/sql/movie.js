import getJSON from '../../helpers/getJSON.js'
import mysql from 'mysql2/promise'

const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DATABAE || 'moviesdb'
}

// const connection = await mysql.createConnection(config)

export class MovieModel {
    static connection = null
    static async getConnection() {
        try {
            if (this.connection) {
                return this.connection
            }

            const connection = await mysql.createConnection(config)
            this.connection = connection
            return this.connection
        } catch (error) {
            error.message = 'Connection to db is not working.'
            throw error
        }

    }
    static async getAll({ genre, title, year }) {
        const connection = await this.getConnection()
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id
            FROM movie`
        )

        return movies
    }

    static async getById({ id }) {
        const connection = await this.getConnection()
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id
            FROM movie WHERE BIN_TO_UUID(id) = '${id}'`
        )

        console.log(movies, id)

        return movies[0]
    }

    static async create(values) {
        const connection = await this.getConnection()
        const { title, year, director, duration, poster, rate } = values
        const [result] = await connection.query('SELECT UUID() as uuid')

        const response = await connection.query(
            `INSERT INTO movie (id,title, year, director, duration, poster, rate) VALUES
             (UUID_TO_BIN(?),?,?,?,?,?,?)`,
            [result[0].uuid, title, year, director, duration, poster, rate]
        )

        console.log(response)
        return { id: result[0].uuid, title: title }
    }

    static async update(id, values,) {
        const connection = await this.getConnection()
        const setClauses = Object.keys(values).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(values);

        console.log(setClauses)
        const response = await connection.query(
            `UPDATE movie SET ${setClauses} WHERE BIN_TO_UUID(id) = '${id}'`, [...updateValues]
        )

        console.log('Respuesta:', response)

        return '1 Row updated'
    }

    static async delete({ id }) {
        const connection = await this.getConnection()
        const response = await connection.query(
            `DELETE FROM movie WHERE BIN_TO_UUID(id)= '${id}'`
        )

        console.log(response)

        return '1 Row deleted.'
    }
}
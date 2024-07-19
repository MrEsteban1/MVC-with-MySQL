import { Router } from "express";
import getJSON from '../helpers/getJSON.js'
import { MovieController } from "../controllers/movies.js";

const movies = getJSON('../public/data/movies.json')
export const movieRouter = Router()

movieRouter.get('/', MovieController.getAll)

movieRouter.get('/:id', MovieController.getById)

movieRouter.post('/', MovieController.create)

movieRouter.patch('/:id', MovieController.update)

movieRouter.delete('/:id', MovieController.delete)

export default movieRouter
import * as express from 'express';
import AuthMiddleware from "../middlewares/AuthMiddleware";

export default class TodoController {
    public path = '/todo';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        // use auth middlware
        this.router.use((new AuthMiddleware()).verifyAuth)

        this.router.get(this.path, this.getTodos);
        this.router.get(`${this.path}/:id`, this.getTodo);
    }

    getTodos = (request: express.Request, response: express.Response) => {
        response.send('All Todo');
    }

    getTodo = (request: express.Request, response: express.Response) => {
        response.send(`Single Todo ${request.params.id}`);
    }
}
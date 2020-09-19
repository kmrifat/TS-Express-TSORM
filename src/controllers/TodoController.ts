import * as express from 'express';
import AuthMiddleware from "../middlewares/AuthMiddleware";
import {Todo} from "../entity/Todo";
import {getRepository} from "typeorm";

const {todoValidationRule, validate} = require('../validator')

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
        this.router.post(this.path, todoValidationRule(), this.saveTodo)
        this.router.put(`${this.path}/:id`, this.updateTodo)
    }

    saveTodo = (request: express.Request, response: express.Response) => {
        const todo = new Todo();
        todo.title = request.body.title;
        todo.status = false;
        getRepository(Todo).manager.save(todo);
        return response.status(201).json(todo);
    }

    getTodos = async (request: express.Request, response: express.Response) => {
        const todos = await getRepository(Todo).find({
            order : {
                id : 'DESC'
            }
        });
        // console.log(todos);
        response.send(todos);
    }

    updateTodo = async (request: express.Request, response: express.Response) => {
        const todo = await getRepository(Todo).update(request.body.id, {
            title: request.body.title,
            status: request.body.status
        })
        response.send(todo);
    }

    getTodo = (request: express.Request, response: express.Response) => {
        response.send(`Single Todo ${request.params.id}`);
    }
}
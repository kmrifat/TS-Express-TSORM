import * as express from 'express';
import {getConnection, getRepository} from "typeorm";
import {User} from "../entity/User";

const bcrypt = require('bcrypt')

export default class AuthController {
    public path = '/oauth';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(`${this.path}/login`, this.authenticate);
        this.router.post(`${this.path}/registration`, this.registration);
    }

    authenticate = async (request: express.Request, response: express.Response) => {
        const user = await getRepository(User).findOne({email: request.body.email});
        if (typeof user != 'undefined') {
            let match = bcrypt.compareSync(request.body.password, user.password);
            if (match) {
                return response.json(user)
            } else {
                return response.status(403).json({'message': 'Credentials does not match'});
            }
        } else {
            return response.status(422).json({'message': 'Credentials does not match'});
        }
    }

    registration = async (request: express.Request, response: express.Response) => {
        const user = new User();
        user.firstName = request.body.firstName;
        user.lastName = request.body.lastName;
        user.email = request.body.email;
        user.age = request.body.age;
        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(request.body.password, salt, (err, hash) => {
                console.log(hash);
                user.password = hash;
                getRepository(User).manager.save(user);
            })
        })

        return response.json(user);
    }
}
import * as express from 'express';

const jwt = require('jsonwebtoken');

export default class AuthMiddleware {
    public verifyAuth = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let token = request.header('Authorization');
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length).trimLeft();
            }
            let decode = jwt.verify(token, 'thisisasecret');
            // console.log(decode);
            next();
        } catch (error) {
            response.status(403).json({message: 'Invalid token'})
        }
    }

    public generateToken(user) {
        return jwt.sign({sub: user}, "thisisasecret", {expiresIn: '7d'})
    }
}
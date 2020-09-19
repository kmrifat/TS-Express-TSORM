import * as express from "express";
import {validationResult} from 'express-validator';

import todoValidationRule from "./TodoValidation";

const validate = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const errors = validationResult(request)
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return response.status(422).json({
        errors: extractedErrors,
    })
}


module.exports = {
    validate,
    todoValidationRule
}
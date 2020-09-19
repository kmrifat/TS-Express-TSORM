const {body} = require('express-validator')

const todoValidationRule = () => {
    return [
        body('title').exists().isEmpty().withMessage('Title is required')
    ]
}

export default todoValidationRule;
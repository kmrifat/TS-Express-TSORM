import * as express from 'express';

class ProductController {
    public path = '/product';
    public router = express.Router()

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getProducts);
        this.router.get(`${this.path}/:id`, this.getProduct);
    }

    getProducts = (request: express.Request, response: express.Response) => {
        response.send('All Products');
    }

    getProduct = (request: express.Request, response: express.Response) => {
        response.send(`Single products Edit ${request.params.id}`);
    }
}

export default ProductController;
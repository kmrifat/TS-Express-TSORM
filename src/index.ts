import "reflect-metadata";
import {createConnection} from "typeorm";
import App from "./App";
import ProductController from "./controllers/ProductController";
import AuthController from "./controllers/AuthController";

createConnection().then(async connection => {

    const app = new App([
        new ProductController(),
        new AuthController()
    ], 5000);

    app.listen();

    console.log('Express live on port 5000');

}).catch(error => console.log(error));

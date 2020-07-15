import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {

    public app: express.Application
    public port: number;

    /**
     * initialize express, middleware and controller
     * @param controllers
     * @param port
     */
    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    /**
     * initialize middleware
     */
    private initializeMiddlewares() {
        this.app.use(bodyParser.json())
    }

    /**
     * initialize controllers
     * @param controllers
     */
    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    /**
     * app listen
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        })
    }

}

export default App;
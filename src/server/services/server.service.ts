import { CircularMiddleware } from './../middlewares/circular.middleware';
import { Container, Service } from "typedi";
import { createExpressServer } from "routing-controllers";
import { useContainer } from "routing-controllers";

/**
 * Main server entry-point
 */
@Service()
export class Server {
    constructor() {
        useContainer(Container);
        createExpressServer({
            controllers: [
                __dirname + "/../controllers/**/**.ts"
            ],
            middlewares: [CircularMiddleware],
        }).listen(3000); // register controllers routes in our express application
        console.log(__dirname + "/../controllers/**.controller.ts");
        console.log(`Server ready on :3000`);
    }
}
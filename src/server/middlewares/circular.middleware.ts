import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Response, Request } from "request";

@Middleware({ type: "after" })
export class CircularMiddleware implements ExpressMiddlewareInterface {

    use(request: Request, response: Response, next: (err?: any) => any): void {
        console.log("mid", response.body);
        next();
    }

}
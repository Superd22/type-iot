import { JsonController, Get } from "routing-controllers";

@JsonController()
export class MainController {
    @Get("/")
    public getStatus() {
        return "OK";
    }
}
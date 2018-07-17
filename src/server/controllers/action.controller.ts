import { JsonController, Get, Param, OnUndefined, Post, Body } from "routing-controllers";
import { Inject } from "typedi";
import { RoomService } from "../../iot/services/room.service";
import { ActionService } from "../../iot/services/action.service";

@JsonController("/action/:actionId")
export class ActionController {

    @Inject()
    protected _actionService: ActionService;

    @Get()
    @OnUndefined(404)
    public getAction(@Param("actionId") actionId: string) {
        const action = this._actionService.get(actionId);
        if (!action) return;

        return {
            id: action.id, name: action.name, description: action.description,
            availableTargets: action.availableTargets.map((item) => { return { id: item.id, name: item.name, type: item.type } })
        }
    }

    @Post(`/trigger`)
    @OnUndefined(404)
    public async trigger(@Param("actionId") actionId: string, @Body() body: { params?: any, targets?: string[] }) {
        const action = this._actionService.get(actionId);
        if (!action) return;

        return action.trigger(body.params, body.targets).completion.toPromise();
    }
}
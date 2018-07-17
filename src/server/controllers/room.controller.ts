import { JsonController, Get, Param, OnUndefined } from "routing-controllers";
import { Inject } from "typedi";
import { RoomService } from "../../iot/services/room.service";

@JsonController("/room/:roomId")
export class RoomController {

    @Inject()
    protected _roomService: RoomService;

    @Get(`/`)
    @OnUndefined(404)
    public getItemInRoom(@Param("roomId") roomId: string) {
        const room = this._roomService.getRoom(roomId);
        if (!room) return;
        return room.items.map(item => { return { id: item.id, name: item.name, type: item.type, actions: item.actions.map(action => { return { id: action.id, name: action.name, description: action.description } }) } });
    }
}
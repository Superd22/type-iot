import { RoomService } from './../../iot/services/room.service';
import { JsonController, Get } from "routing-controllers";
import { Inject } from 'typedi';
import * as CircularJSON from "circular-json";

@JsonController("/rooms")
export class RoomsController {

    @Inject()
    protected _roomService: RoomService;

    @Get()
    public async getRooms() {
        return this._roomService.rooms.map(room => { return { id: room.id, name: room.name, itemsNumber: room.items.length } });
    }


}
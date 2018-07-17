import { RoomImplementation } from './../interfaces/room/room.class';
import { Service } from "typedi";
import { Room } from "../interfaces/room/room.interface";

@Service()
export class RoomService {

    public get rooms() { return new Array<Room>(...this._registeredRooms.values()); }
    protected _registeredRooms: Map<string, Room> = new Map<string, Room>();


    /**
     * Create a room and registers it for later use
     * @param roomName the name of the room to create
     */
    public createRoom(roomName: string): Room {
        const room = new RoomImplementation(roomName);
        this._registeredRooms.set(room.id, room);

        return room;
    }

    public getRoom(roomId: string) {
        return this._registeredRooms.get(roomId);
    }


}
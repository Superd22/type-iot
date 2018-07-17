import "reflect-metadata";
import { FanThing } from './fan/fan.thing';
import { ShutterThing, ShutterMoveDirection } from './shutter/shutter.thing';
import { Container } from 'typedi';
import { RoomService } from '../src/iot/services/room.service';
import { ShutterItem } from './shutter/shutter.item';
import { FanItem } from './fan/fan.item';
import { Server } from '../src/server/services/server.service';


const roomService = Container.get(RoomService);

const david = roomService.createRoom("david");
const victor = roomService.createRoom("victor");
const guest = roomService.createRoom("guest");

const fanThing = new FanThing();
const shutterThing = new ShutterThing();

shutterThing.addItem(new ShutterItem(shutterThing, `1`, david));
shutterThing.addItem(new ShutterItem(shutterThing, `2`, david));
shutterThing.addItem(new ShutterItem(shutterThing, `3`, victor));
shutterThing.addItem(new ShutterItem(shutterThing, `4`, guest));

fanThing.addItem(new FanItem(fanThing, `fan-item`, david));

console.log(fanThing, shutterThing);

// fanThing.actions.get.trigger().completion.subscribe((data) => console.log(data));
// shutterThing.actions.move.trigger([ShutterMoveDirection.UP], [shutterThing.items[0]]).completion.subscribe((data) => {
//     console.log("worked", data);
// });

const server = Container.get(Server);
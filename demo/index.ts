import { FanThing } from './fan/fan.thing';

const fanThing = new FanThing();

console.log(fanThing.actions[0]);

fanThing.actions[0].trigger().completion.subscribe((data) => console.log(data));
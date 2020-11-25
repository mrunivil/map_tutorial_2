import { Shape } from "./shape";
import { Floor } from "./floor";

export class Layer {
  readonly name?: string;
  readonly width?: number;
  readonly height?: number;
  readonly floor: Floor = new Floor({ width: 10, height: 10 });
  readonly shapes: Shape[];
  constructor(obj: Partial<Layer>) {
    Object.assign(this, obj);
    this.shapes = obj.shapes || [];
  }
}

import { Shape } from "./shape";

export class Floor {
  readonly width: number = 1;
  readonly height: number = 1;
  readonly shapes: Shape[];
  constructor(obj: Partial<Floor>) {
    Object.assign(this, obj);
    this.shapes = obj.shapes || [];
  }
}

import { Shape } from "./shape";

export class Floor {
  readonly width?: number;
  readonly height?: number;
  readonly shapes: Shape[];
  constructor(obj: Partial<Floor>) {
    Object.assign(this, obj);
    this.shapes = obj.shapes || [];
  }
}

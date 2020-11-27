import { Vector } from "./vector";

export class ViewPort {
  readonly position!: Vector;
  readonly zoom: number = 1;
  constructor(obj: Partial<ViewPort>) {
    Object.assign(this, obj);
    this.zoom = obj.zoom || 1;
  }
}

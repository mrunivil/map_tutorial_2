export enum ShapeType {
  "floor",
  "room"
}
export class Shape {
  readonly name: string = "default";
  readonly x: number = 0;
  readonly y: number = 0;
  readonly width: number = 1;
  readonly height: number = 1;
  readonly type: ShapeType = ShapeType.floor;
  readonly color: string = "#1ecbe1";
  readonly selected: boolean = false;
  constructor(obj?: Partial<Shape>) {
    Object.assign(this, obj);
  }
}

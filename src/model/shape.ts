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
  readonly color: string = "#daeecd";
  readonly selected: boolean = false;
  readonly canAdd: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  } = { top: true, right: true, bottom: true, left: true };
  constructor(obj?: Partial<Shape>) {
    Object.assign(this, obj);
  }
}

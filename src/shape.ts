export class Shape {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly color: string = "#1ecbe1";
  constructor(obj: Partial<Shape>) {
    Object.assign(this, obj);
  }
}

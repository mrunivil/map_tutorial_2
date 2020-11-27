import { Vector } from "./vector";

export class Dimension {
  readonly xMin!: number;
  readonly xMax!: number;
  readonly yMin!: number;
  readonly yMax!: number;
  constructor(obj: Partial<Dimension>) {
    Object.assign(this, obj);
  }
  get width(): number {
    return this.xMax - this.xMin;
  }
  get height(): number {
    return this.yMax - this.yMin;
  }
  static detectCollisionDimension(d1: Dimension, d2: Dimension): boolean {
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    //  rect1.x                < rect2.x + rect2.width  &&
    //  rect1.x + rect1.width  > rect2.x                &&
    //  rect1.y                < rect2.y + rect2.height &&
    //  rect1.y + rect1.height > rect2.y
    // -> collision detected!
    return (
      d1.xMax > d2.xMin &&
      d1.xMin < d2.xMax &&
      d1.yMax > d2.yMin &&
      d1.yMin < d2.yMax
    );
  }
  static detectCollisionDimensions(
    d1: Dimension,
    ...dimensions: Dimension[]
  ): boolean {
    return dimensions.some((d2) => Dimension.detectCollisionDimension(d1, d2));
  }
  static detectCollisionVector(v1: Vector, d1: Dimension): boolean {
    return d1.xMax > v1.x && d1.xMin < v1.x && d1.yMax > v1.y && d1.yMin < v1.y;
  }
}

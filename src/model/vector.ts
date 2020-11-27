export class Vector {
  readonly x: number = 0;
  readonly y: number = 0;
  constructor(obj?: Partial<Vector>) {
    Object.assign(this, obj);
  }
  static normalize(v1: Vector) {
    return Vector.magnitude(v1);
  }
  static add(v1: Vector, v2: Vector) {
    return new Vector({ x: v1.x + v2.x, y: v1.y + v2.y });
  }
  static subtract(v1: Vector, v2: Vector) {
    return new Vector({ x: v1.x - v2.x, y: v1.y - v2.y });
  }
  static multiply(v1: Vector, v2: Vector) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static magnitude(v1: Vector) {
    return Math.hypot(v1.x, v1.y);
  }
  static angleBetween(v1: Vector, v2: Vector) {
    const m = (v2.y - v1.y) / (v2.x - v1.x);
    return Math.atan(m);
  }
  static distanceBetween(v1: Vector, v2: Vector) {
    return Math.hypot(v2.x - v1.x, v2.y - v1.y);
  }
}

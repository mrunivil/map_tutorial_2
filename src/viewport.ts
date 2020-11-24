export class ViewPort {
  readonly x?: number;
  readonly y?: number;
  readonly zoom: number;
  constructor(obj: Partial<ViewPort>) {
    Object.assign(this, obj);
    this.zoom = obj.zoom || 1;
  }
}

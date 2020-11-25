import { Layer } from "./layer";
export class WifiMap {
  readonly layers: Map<string, Layer> = new Map();
  constructor(obj?: Partial<WifiMap>) {
    if (obj) {
      Object.assign(this, obj);
      this.layers = this.layers ? this.layers : new Map();
    } else {
      this.layers = new Map();
    }
  }
}

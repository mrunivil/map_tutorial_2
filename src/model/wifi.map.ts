import { AppState } from "../state/app.state";
import { Dimension } from "./dimension";
import { Layer } from "./layer";
import { Vector } from "./vector";
import { ViewModel } from "./view.model";
export class WifiMap {
  readonly layers: Map<string, Layer> = new Map();
  readonly dimension: Dimension = new Dimension({
    xMin: 0,
    xMax: AppState.MAP_WIDTH,
    yMin: 0,
    yMax: AppState.MAP_HEIGHT
  });
  constructor(obj?: Partial<WifiMap>) {
    if (obj) {
      Object.assign(this, obj);
      this.layers = this.layers ? this.layers : new Map();
    } else {
      this.layers = new Map();
    }
  }
}
export class WifiMapViewModel implements ViewModel {
  constructor(
    readonly position: Vector,
    readonly dimension: Dimension,
    readonly map: WifiMap
  ) {}

  static fromModel(model: WifiMap) {
    return new WifiMapViewModel(
      new Vector({ x: 0, y: 0 }),
      new Dimension({
        xMin: 0,
        xMax: model.dimension.width * AppState.CELL_SIZE,
        yMin: 0,
        yMax: model.dimension.height * AppState.CELL_SIZE
      }),
      model
    );
  }
}

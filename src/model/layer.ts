import { AppState } from "../state/app.state";
import { Dimension } from "./dimension";
import { Shape } from "./shape";
import { Vector } from "./vector";
import { ViewModel } from "./view.model";

export class Layer {
  readonly dimension: Dimension = new Dimension({
    xMin: 0,
    xMax: AppState.MAP_WIDTH,
    yMin: 0,
    yMax: AppState.MAP_HEIGHT
  });
  readonly name!: string;
  readonly shapes: Map<string, Shape>;
  constructor(obj: Partial<Layer>) {
    Object.assign(this, obj);
    this.shapes = obj.shapes || new Map();
  }
}

export class LayerViewModel implements ViewModel {
  constructor(
    readonly position: Vector,
    readonly dimension: Dimension,
    readonly layer: Layer
  ) {}
  static fromModel(model: Layer) {
    return new LayerViewModel(
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

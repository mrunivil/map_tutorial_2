import { Layer } from "../model/layer";
import { Shape } from "../model/shape";
import { WifiMap } from "../model/wifi.map";

export abstract class UpdateShapeUseCase {
  static execute(shape: Shape, layer: Layer, map: WifiMap): WifiMap {
    layer.shapes.set(shape.name, shape);
    map.layers.set(layer.name, layer);
    return map;
  }
}

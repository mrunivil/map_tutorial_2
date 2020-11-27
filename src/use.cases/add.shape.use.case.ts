import { Layer } from "../model/layer";
import { Shape } from "../model/shape";
import { WifiMap } from "../model/wifi.map";
import { detectCollision } from "../utility";
export abstract class AddShapeUseCase {
  static execute(shape: Shape, layer: Layer, map: WifiMap): WifiMap {
    // check if shape can be added to layer
    const collisionDetected = detectCollision(shape, layer);
    if (!collisionDetected) {
      layer.shapes.set(shape.name, shape);
      map.layers.set(layer.name, layer);
      return map;
    } else {
      throw new Error(`can not add shape at ${shape.x}:${shape.y}`);
    }
  }
}

import { Layer } from "../model/layer";
import { WifiMap } from "../model/wifi.map";

export abstract class RemoveLayerUseCase {
  static execute(layer: Layer, map: WifiMap): WifiMap {
    map.layers.delete(layer.name);
    return map;
  }
}

import { Layer } from "../model/layer";
import { WifiMap } from "../model/wifi.map";

export abstract class AddLayerUseCase {
  static execute(layer: Layer, map: WifiMap): Layer {
    map.layers.set(layer.name, layer);
    return layer;
  }
}

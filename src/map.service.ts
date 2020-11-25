import { Layer } from "./model/layer";
import { WifiMap } from "./model/wifi.map";
import { LayerService } from "./layer.service";
import { Shape } from "./model/shape";
import { ShapeService } from "./shape.service";

export abstract class MapService {
  static currentLayer: Layer;
  static currentLayerName: string;
  static maxLayers: number = 0;
  static currentIndex: number = 0;

  static toHTML(map: WifiMap) {}

  static createNewMap() {
    return new WifiMap();
  }

  static addLayer(name: string, map: WifiMap): WifiMap {
    map.layers.set(name, LayerService.createNewLayer(name));
    this.maxLayers++;
    this.assignCurrentLayer(map);
    return map;
  }

  static addShape(map: WifiMap, shape?: Shape): WifiMap {
    LayerService.addShape(
      ShapeService.createNewShape(shape),
      this.currentLayer
    );
    map.layers.set(this.currentLayerName, this.currentLayer);
    return map;
  }

  static removeLayer(name: string, map: WifiMap): WifiMap {
    map.layers.delete(name);
    this.maxLayers--;
    this.assignCurrentLayer(map);
    return map;
  }

  static nextLayer(map: WifiMap): WifiMap {
    if (this.hasNextLayer()) {
      this.currentIndex++;
      this.assignCurrentLayer(map);
    }
  }
  static hasNextLayer() {
    return this.currentIndex < this.maxLayers;
  }
  static previousLayer(map: WifiMap): WifiMap {
    if (this.hasPreviousLayer()) {
      this.currentIndex--;
      this.assignCurrentLayer(map);
    }
  }
  static hasPreviousLayer() {
    return this.currentIndex > -1;
  }
  private static assignCurrentLayer(map: WifiMap) {
    this.currentLayer = Array.from(map.layers.values())[this.currentIndex];
    this.currentLayerName =
      Array.from(map.layers.keys())[this.currentIndex] || "None";
  }
}

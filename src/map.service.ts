import { Layer } from "./model/layer";
import { WifiMap } from "./model/wifi.map";
import { LayerService } from "./layer.service";
import { Shape } from "./model/shape";
import { ShapeService } from "./shape.service";
import { FloorService } from "./floor.service";
import { CELL_SIZE, MAP_HEIGHT, MAP_WIDTH } from ".";

export abstract class MapService {
  static map: WifiMap;
  static currentLayer: Layer;
  static currentLayerName: string;
  static maxLayers: number = 0;
  static currentIndex: number = 0;

  static HORIZONTAL_PADDING: number = 0;
  static VERTICAL_PADDING: number = 0;

  static TOTAL_MAP_WIDTH: number = 0;
  static TOTAL_MAP_HEIGHT: number = 0;

  static toHTML(
    map: WifiMap,
    boardEl: HTMLElement,
    targetEl: HTMLDivElement
  ): HTMLDivElement {
    MapService.TOTAL_MAP_WIDTH = MAP_WIDTH * CELL_SIZE;
    MapService.TOTAL_MAP_HEIGHT = MAP_HEIGHT * CELL_SIZE;

    MapService.HORIZONTAL_PADDING =
      (boardEl.clientWidth - MapService.TOTAL_MAP_WIDTH) / 2;
    MapService.VERTICAL_PADDING =
      (boardEl.clientHeight - MapService.TOTAL_MAP_HEIGHT) / 2;

    targetEl.id = "map";
    targetEl.style.width = `${MapService.TOTAL_MAP_WIDTH}px`;
    targetEl.style.height = `${MapService.TOTAL_MAP_HEIGHT}px`;
    targetEl.style.position = "absolute";
    targetEl.style.left = `${MapService.HORIZONTAL_PADDING}px`;
    targetEl.style.top = `${MapService.VERTICAL_PADDING}px`;

    const floorEl = document.querySelector("#floor") as HTMLDivElement;
    if (!floorEl) {
      targetEl.appendChild(
        FloorService.toHTML(
          MapService.currentLayer.floor,
          FloorService.generateFloorElement()
        )
      );
    } else {
      FloorService.toHTML(MapService.currentLayer.floor, floorEl);
    }
    const roomsEl = document.querySelector(
      `#${MapService.currentLayerName}`
    ) as HTMLDivElement;
    if (!roomsEl) {
      targetEl.appendChild(
        LayerService.toHTML(
          MapService.currentLayer,
          LayerService.generateLayerElement(MapService.currentLayerName)
        )
      );
    } else {
      LayerService.toHTML(MapService.currentLayer, roomsEl);
    }
    return targetEl;
  }

  static createNewMap() {
    this.map = new WifiMap();
  }

  static addLayer(name: string): WifiMap {
    this.map.layers.set(name, LayerService.createNewLayer(name));
    MapService.maxLayers++;
    MapService.assignCurrentLayer();
    return this.map;
  }

  static updateLayer() {
    this.map.layers.set(MapService.currentLayerName, MapService.currentLayer);
  }

  static addShape(shape?: Shape): WifiMap {
    LayerService.addShape(
      ShapeService.createNewShape(shape),
      MapService.currentLayer
    );
    this.map.layers.set(MapService.currentLayerName, MapService.currentLayer);
    return this.map;
  }

  static removeLayer(name: string): WifiMap {
    this.map.layers.delete(name);
    MapService.maxLayers--;
    MapService.assignCurrentLayer();
    return this.map;
  }

  static nextLayer(): WifiMap {
    if (MapService.hasNextLayer()) {
      MapService.currentIndex++;
      MapService.assignCurrentLayer();
    }
    return this.map;
  }
  static hasNextLayer() {
    return MapService.currentIndex < MapService.maxLayers;
  }
  static previousLayer(): WifiMap {
    if (MapService.hasPreviousLayer()) {
      MapService.currentIndex--;
      MapService.assignCurrentLayer();
    }
    return this.map;
  }
  static hasPreviousLayer() {
    return MapService.currentIndex > -1;
  }
  private static assignCurrentLayer() {
    MapService.currentLayer = Array.from(this.map.layers.values())[
      MapService.currentIndex
    ];
    MapService.currentLayerName =
      Array.from(this.map.layers.keys())[MapService.currentIndex] || "None";
  }
}

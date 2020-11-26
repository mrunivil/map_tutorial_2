import { CELL_SIZE, draw, MAP_HEIGHT, MAP_WIDTH } from ".";
import { FloorService } from "./floor.service";
import { LayerService } from "./layer.service";
import { Layer } from "./model/layer";
import { MenuState, Shape, ShapeState } from "./model/shape";
import { WifiMap } from "./model/wifi.map";

export abstract class MapService {
  private static id = 0;
  static ID = () => {
    MapService.id++;
    return MapService.id;
  };
  static map: WifiMap;
  static currentShape: Shape;
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

  static addShape(shape: Shape) {
    if (LayerService.canAddShape(shape, MapService.currentLayer)) {
      const newShape = {
        ...shape,
        name: `room_${MapService.ID()}`,
        canAdd: {
          top: LayerService.canAddShapeTop(shape, MapService.currentLayer),
          right: LayerService.canAddShapeRight(shape, MapService.currentLayer),
          bottom: LayerService.canAddShapeBottom(
            shape,
            MapService.currentLayer
          ),
          left: LayerService.canAddShapeLeft(shape, MapService.currentLayer)
        }
      };
      MapService.currentLayer.shapes.set(newShape.name, newShape);
      this.assignCurrentLayer();
      for (let key of Array.from(MapService.currentLayer.shapes.keys())) {
        let currentShape = MapService.currentLayer.shapes.get(key) as Shape;
        const currentLayer = MapService.currentLayer;
        currentShape = {
          ...currentShape,
          canAdd: {
            top: LayerService.canAddShapeTop(currentShape, currentLayer),
            right: LayerService.canAddShapeRight(currentShape, currentLayer),
            bottom: LayerService.canAddShapeBottom(currentShape, currentLayer),
            left: LayerService.canAddShapeLeft(currentShape, currentLayer)
          }
        };
        MapService.currentLayer.shapes.set(currentShape.name, currentShape);
      }

      draw();
    }
  }
  static selectShape(shape: Shape) {
    this.clearSelection();
    this.updateCurrentShape({
      ...shape,
      menuState: MenuState.menuOpened,
      shapeState: ShapeState.selected
    });
  }

  static updateCurrentShape(shape: Shape) {
    this.currentShape = {
      ...shape
    };
    this.currentLayer.shapes.set(this.currentShape.name, this.currentShape);
    this.assignCurrentLayer();
    draw();
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
  static clearSelection() {
    for (let key of Array.from(MapService.currentLayer.shapes.keys())) {
      const shape = {
        ...MapService.currentLayer.shapes.get(key),
        shapeState: ShapeState.default,
        menuState: MenuState.menuHidden
      } as Shape;
      MapService.currentLayer.shapes.set(key, shape);
      draw();
    }
  }
}

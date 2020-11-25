import { FloorService } from "./floor.service";
import { Layer } from "./model/layer";
import { Shape } from "./model/shape";
import { detectCollision } from "./utility";
export abstract class LayerService {
  static readonly width = 10;
  static readonly height = 10;

  static createNewLayer(name: string) {
    return new Layer({
      height: this.height,
      width: this.width,
      name,
      shapes: [],
      floor: FloorService.createNewFloor()
    });
  }

  static toHTML(layer: Layer) {}

  static addShape(shape: Shape, layer: Layer): Layer {
    if (this.canAddShape(shape, layer))
      return { ...layer, shapes: [...layer.shapes, shape] };
    return layer;
  }
  static removeShape(shape: Shape, layer: Layer) {}
  static canAddShape(shape: Shape, layer: Layer): boolean {
    return !detectCollision(shape, layer);
  }
  static canAddShapeTop(shape: Shape, layer: Layer) {}
  static canAddShapeRight(shape: Shape, layer: Layer) {}
  static canAddShapeBottom(shape: Shape, layer: Layer) {}
  static canAddShapeLeft(shape: Shape, layer: Layer) {}
  // static generateLayer(layer: Layer) {
  //   const floorDiv = this.generateLayerDiv(layer);
  //   return floorDiv;
  // }

  // static generateShape(layer: Layer, shape: Shape): Layer {
  //   return new Layer({ ...layer, shapes: [...layer.shapes, shape] });
  // }

  // private static generateLayerDiv(layer: Layer) {
  //   const floorDiv = document.createElement("div");
  //   const layerWidth = (layer.floor.width || 0) * this.cellSize;
  //   const layerHeight = (layer.floor.height || 0) * this.cellSize;
  //   const left = MAP_WIDTH / 2 - layerWidth / 2;
  //   const top = MAP_HEIGHT / 2 - layerHeight / 2;
  //   floorDiv.classList.add("layer", "floor");
  //   floorDiv.style.width = `${layerWidth}`;
  //   floorDiv.style.height = `${layerHeight}`;
  //   floorDiv.style.position = "absolute";
  //   floorDiv.style.left = `${left}px`;
  //   floorDiv.style.top = `${top}px`;
  //   for (let i = 0; i < layer.floor.shapes.length; i++) {
  //     const shape = document.createElement("div");
  //     shape.style.width = `${LayerService.cellSize}px`;
  //     shape.style.height = `${LayerService.cellSize}px`;
  //     shape.classList.add("floorShape");
  //     shape.style.position = "absolute";
  //     shape.style.left = `${
  //       (layer.floor.shapes[i].x || 0) * LayerService.cellSize
  //     }px`;
  //     shape.style.top = `${
  //       (layer.floor.shapes[i].y || 0) * LayerService.cellSize
  //     }px`;
  //     floorDiv.appendChild(shape);
  //   }
  //   for (const shape of ShapeService.generateShapeDivs(layer.shapes)) {
  //     floorDiv.appendChild(shape);
  //   }

  //   return floorDiv;
  // }

  // static generateFloor(layer: Layer) {
  //   const floorShapes = [];
  //   for (
  //     let i = 0;
  //     i < (layer.floor.width || 0) * (layer.floor.height || 0);
  //     i++
  //   ) {
  //     const row = Math.floor(i / (layer.floor.height || 1));
  //     const col = (i - row) % (layer.floor.width || 1);
  //     floorShapes.push(
  //       new Shape({
  //         height: 1,
  //         width: 1,
  //         x: col,
  //         y: row,
  //         color: "#bceff6"
  //       })
  //     );
  //   }
  //   return { ...layer.floor, shapes: floorShapes };
  // }
}

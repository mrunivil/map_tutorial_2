import { MAP_HEIGHT, MAP_WIDTH } from ".";
import { Layer } from "./layer";
import { Shape } from "./shape";
export abstract class LayerService {
  static readonly gridSize = 32;

  static generateLayer(layer: Layer) {
    const floorDiv = this.generateLayerDiv(layer);
    return floorDiv;
  }

  static generateShape(layer: Layer, shape: Shape): Layer {
    return new Layer({ ...layer, shapes: [...layer.shapes, shape] });
  }

  private static generateLayerDiv(layer: Layer) {
    const floorDiv = document.createElement("div");
    const layerWidth = (layer.floor.width || 0) * this.gridSize;
    const layerHeight = (layer.floor.height || 0) * this.gridSize;
    const left = MAP_WIDTH / 2 - layerWidth / 2;
    const top = MAP_HEIGHT / 2 - layerHeight / 2;
    floorDiv.classList.add("layer", "floor");
    floorDiv.style.width = `${layerWidth}`;
    floorDiv.style.height = `${layerHeight}`;
    floorDiv.style.position = "absolute";
    floorDiv.style.left = `${left}px`;
    floorDiv.style.top = `${top}px`;
    for (let i = 0; i < layer.floor.shapes.length; i++) {
      const shape = document.createElement("div");
      shape.style.width = `${LayerService.gridSize}px`;
      shape.style.height = `${LayerService.gridSize}px`;
      shape.classList.add("floorShape");
      shape.style.position = "absolute";
      shape.style.left = `${
        (layer.floor.shapes[i].x || 0) * LayerService.gridSize
      }px`;
      shape.style.top = `${
        (layer.floor.shapes[i].y || 0) * LayerService.gridSize
      }px`;
      floorDiv.appendChild(shape);
    }
    for (let i = 0; i < layer.shapes.length; i++) {
      const shape = document.createElement("div");
      shape.style.width = `${
        LayerService.gridSize * (layer.shapes[i].width || 1)
      }px`;
      shape.style.height = `${
        LayerService.gridSize * (layer.shapes[i].width || 1)
      }px`;
      shape.classList.add("shape");
      shape.style.backgroundColor = layer.shapes[i].color;
      shape.style.position = "absolute";
      shape.style.left = `${
        (layer.shapes[i].x || 0) * LayerService.gridSize
      }px`;
      shape.style.top = `${(layer.shapes[i].y || 0) * LayerService.gridSize}px`;
      floorDiv.appendChild(shape);
    }
    return floorDiv;
  }

  static generateFloor(layer: Layer) {
    const floorShapes = [];
    for (
      let i = 0;
      i < (layer.floor.width || 0) * (layer.floor.height || 0);
      i++
    ) {
      const row = Math.floor(i / (layer.floor.height || 1));
      const col = (i - row) % (layer.floor.width || 1);
      floorShapes.push(
        new Shape({
          height: 1,
          width: 1,
          x: col,
          y: row,
          color: "#bceff6"
        })
      );
    }
    return { ...layer.floor, shapes: floorShapes };
  }

  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
      const ret = new Image();
      ret.onload = () => {
        res(ret);
      };
      ret.src = src;
    });
  }
}

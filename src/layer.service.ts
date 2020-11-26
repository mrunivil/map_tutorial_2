import { draw } from ".";
import { ControlsService } from "./controls.service";
import { FloorService } from "./floor.service";
import { MapService } from "./map.service";
import { Layer } from "./model/layer";
import { MenuState, Shape, ShapeState } from "./model/shape";
import { ShapeService } from "./shape.service";
import { detectCollision } from "./utility";
export abstract class LayerService {
  static readonly width = 10;
  static readonly height = 10;

  static createNewLayer(name: string) {
    return new Layer({
      height: this.height,
      width: this.width,
      name,
      shapes: new Map(),
      floor: FloorService.createNewFloor()
    });
  }

  static toHTML(layer: Layer, targetEl: HTMLDivElement): HTMLDivElement {
    layer.shapes.forEach((shape) => {
      let shapeEl = document.querySelector(`#${shape.name}`) as HTMLElement;
      if (!shapeEl) {
        shapeEl = ShapeService.generateShapeElement(shape);
        targetEl.appendChild(ShapeService.toHTML(shape, shapeEl));
      } else {
        shapeEl = ShapeService.toHTML(shape, shapeEl);
      }
    });
    return targetEl;
  }

  static generateLayerElement(id: string) {
    const targetEl = document.createElement("div");
    ControlsService.registerClickListener(targetEl, () => {
      MapService.clearSelection();
    });
    targetEl.id = MapService.currentLayerName;
    targetEl.style.width = `${MapService.TOTAL_MAP_WIDTH}px`;
    targetEl.style.height = `${MapService.TOTAL_MAP_HEIGHT}px`;
    targetEl.style.position = "absolute";
    return targetEl;
  }
  static removeShape(shape: Shape, layer: Layer) {}
  static canAddShape(shape: Shape, layer: Layer): boolean {
    return !detectCollision(shape, layer);
  }
  static canAddShapeTop(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, y: shape.y - 2 }, layer);
  }
  static canAddShapeRight(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, x: shape.x + 2 }, layer);
  }
  static canAddShapeBottom(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, y: shape.y + 2 }, layer);
  }
  static canAddShapeLeft(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, x: shape.x - 2 }, layer);
  }
}

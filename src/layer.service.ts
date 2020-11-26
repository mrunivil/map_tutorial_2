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
      this.clearSelection();
    });
    targetEl.id = MapService.currentLayerName;
    targetEl.style.width = `${MapService.TOTAL_MAP_WIDTH}px`;
    targetEl.style.height = `${MapService.TOTAL_MAP_HEIGHT}px`;
    targetEl.style.position = "absolute";
    return targetEl;
  }

  static addShape(shape: Shape, layer: Layer): void {
    if (this.canAddShape(shape, layer))
      MapService.currentLayer.shapes.set(shape.name, {
        ...shape,
        canAdd: {
          top: this.canAddShapeTop(shape, layer),
          right: this.canAddShapeRight(shape, layer),
          bottom: this.canAddShapeBottom(shape, layer),
          left: this.canAddShapeLeft(shape, layer)
        }
      });
  }
  static removeShape(shape: Shape, layer: Layer) {}
  static canAddShape(shape: Shape, layer: Layer): boolean {
    return !detectCollision(shape, layer);
  }
  static canAddShapeTop(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, y: shape.y - 2 }, layer);
  }
  static canAddShapeRight(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, x: shape.y + 2 }, layer);
  }
  static canAddShapeBottom(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, y: shape.y + 2 }, layer);
  }
  static canAddShapeLeft(shape: Shape, layer: Layer) {
    return !detectCollision({ ...shape, x: shape.y - 2 }, layer);
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

import { CELL_SIZE } from ".";
import { Shape } from "./model/shape";
export abstract class ShapeService {
  static createNewShape(obj?: Partial<Shape>) {
    return new Shape(obj);
  }

  static toHTML(shape: Shape, targetEl: HTMLDivElement): HTMLDivElement {
    targetEl.style.left = `${shape.x * CELL_SIZE}`;
    targetEl.style.top = `${shape.y * CELL_SIZE}`;
    return targetEl;
  }

  static generateShapeElement(id: string) {
    const targetEl = document.createElement("div") as HTMLDivElement;
    targetEl.id = id;
    targetEl.style.width = `${CELL_SIZE}px`;
    targetEl.style.height = `${CELL_SIZE}px`;
    targetEl.style.position = "absolute";
    return targetEl;
  }

  // static generateShapeDivs(shapes: Shape[]): HTMLDivElement[] {
  //   const ret: HTMLDivElement[] = [];
  //   for (let i = 0; i < shapes.length; i++) {
  //     const shape = document.createElement("div");
  //     shape.style.width = `${LayerService.cellSize * (shapes[i].width || 1)}px`;
  //     shape.style.height = `${
  //       LayerService.cellSize * (shapes[i].width || 1)
  //     }px`;
  //     shape.classList.add("shape");
  //     shape.style.backgroundColor = shapes[i].color;
  //     shape.style.position = "absolute";
  //     shape.style.left = `${
  //       ((shapes[i].x || 0) - 1) * LayerService.cellSize
  //     }px`;
  //     shape.style.top = `${((shapes[i].y || 0) - 1) * LayerService.cellSize}px`;
  //     ret.push(shape);
  //   }
  //   return ret;
  // }
  // static removeShape(shape: Shape, layer: Layer): Layer {
  //   layer.shapes.splice(layer.shapes.indexOf(shape), 1);
  //   return {
  //     ...layer
  //   };
  // }
  // static addShape(shape: Shape, layer: Layer): Layer {
  //   return { ...layer, shapes: [...layer.shapes, shape] };
  // }
  // static canAddShapeTop(shape: Shape, layer: Layer): boolean {
  //   return false;
  // }
  // static canAddShapeRight(shape: Shape, layer: Layer): boolean {
  //   return false;
  // }
  // static canAddShapeBottom(shape: Shape, layer: Layer): boolean {
  //   return false;
  // }
  // static canAddShapeLeft(shape: Shape, layer: Layer): boolean {
  //   return false;
  // }
}

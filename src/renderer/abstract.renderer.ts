import { Shape } from "../model/shape";
import { CELL_SIZE } from "..";
export abstract class AbstractRenderer {
  renderShape(shape: Shape, targetEl: HTMLElement): HTMLElement {
    targetEl.style.left = `${shape.x * CELL_SIZE}`;
    targetEl.style.top = `${shape.y * CELL_SIZE}`;
    targetEl.style.width = `${shape.width * CELL_SIZE}px`;
    targetEl.style.height = `${shape.height * CELL_SIZE}px`;
    targetEl.style.backgroundColor = shape.color;
    return targetEl;
  }
}

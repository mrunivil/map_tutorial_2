import { debug } from "..";
import { Shape } from "../model/shape";
import { AbstractRenderer } from "./abstract.renderer";

export class FloorShapeRenderer extends AbstractRenderer {
  renderShape(shape: Shape, targetEl: HTMLElement) {
    super.renderShape(shape, targetEl);
    if (debug) {
      targetEl.innerText = shape.name;
    }
    return targetEl;
  }
}

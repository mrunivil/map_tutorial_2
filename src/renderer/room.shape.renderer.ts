import { MenuState, Shape, ShapeState } from "../model/shape";
import { hexToHSL } from "../utility";
import { AbstractRenderer } from "./abstract.renderer";
export class RoomShapeRenderer extends AbstractRenderer {
  renderShape(shape: Shape, targetEl: HTMLElement): HTMLElement {
    super.renderShape(shape, targetEl);

    const addTop = document.querySelector(
      `#${shape.name}.adding>.adding.top`
    ) as HTMLElement;
    if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";
    const addBottom = document.querySelector(
      `#${shape.name}.adding>.adding.top`
    ) as HTMLElement;
    if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";
    const addLeft = document.querySelector(
      `#${shape.name}.adding>.adding.top`
    ) as HTMLElement;
    if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";
    const addRight = document.querySelector(
      `#${shape.name}.adding>.adding.top`
    ) as HTMLElement;
    if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";

    for (let state in ShapeState) {
      targetEl.classList.remove(state);
    }
    targetEl.classList.add(shape.shapeState.toString());
    for (let state in MenuState) {
      targetEl.classList.remove(state);
    }
    targetEl.classList.add(shape.menuState.toString());

    if (shape.shapeState === ShapeState.default) {
      targetEl.style.border = "none";
    } else {
      targetEl.style.border = `2px solid ${hexToHSL(shape.color, {
        brightness: -0.25
      })}`;
    }
    return targetEl;
  }
}

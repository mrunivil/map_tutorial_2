import { MenuState, Shape, ShapeState } from "../model/shape";
import { hexToHSL } from "../utility";
import { AbstractRenderer } from "./abstract.renderer";
export class RoomShapeRenderer extends AbstractRenderer {
  renderShape(shape: Shape, targetEl: HTMLElement): HTMLElement {
    super.renderShape(shape, targetEl);

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

    // targetEl.classList.remove("selected");
    // if (shape.shapeState === ShapeState.selected) {
    //   targetEl.classList.add("selected");
    //   targetEl.style.backgroundColor = hexToHSL(shape.color, {
    //     brightness: 0.1
    //   });
    //   targetEl.style.border = `2px solid ${hexToHSL(shape.color, {
    //     brightness: -0.25
    //   })}`;
    // } else {
    //   targetEl.style.border = "none";
    // }

    // let controls = document.querySelectorAll(".room .room-control");
    // controls.forEach((c) => {
    //   (c as HTMLElement).style.display = "none";
    // });
    // controls = document.querySelectorAll(".room.adding .room-control");
    // controls.forEach((c) => {
    //   (c as HTMLElement).style.display = "block";
    // });
    return targetEl;
  }
}

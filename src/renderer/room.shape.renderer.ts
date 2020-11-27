import { Shape } from "../model/shape";
import { ViewModel } from "../model/view.model";
import { AbstractRenderer } from "./abstract.renderer";
export class RoomShapeRenderer extends AbstractRenderer {
  render(model: ViewModel): void {
    throw new Error("Method not implemented.");
  }

  renderShape(shape: Shape, targetEl: HTMLElement): HTMLElement {
    // targetEl.style.left = `${shape.x * CELL_SIZE}`;
    // targetEl.style.top = `${shape.y * CELL_SIZE}`;
    // targetEl.style.width = `${shape.width * CELL_SIZE}px`;
    // targetEl.style.height = `${shape.height * CELL_SIZE}px`;
    // targetEl.style.backgroundColor = shape.color;

    // const addTop = document.querySelector(
    //   `#${shape.name}.adding>.adding.top`
    // ) as HTMLElement;
    // if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";
    // const addBottom = document.querySelector(
    //   `#${shape.name}.adding>.adding.bottom`
    // ) as HTMLElement;
    // if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";
    // const addLeft = document.querySelector(
    //   `#${shape.name}.adding>.adding.left`
    // ) as HTMLElement;
    // if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";
    // const addRight = document.querySelector(
    //   `#${shape.name}.adding>.adding.right`
    // ) as HTMLElement;
    // if (addTop) addTop.style.display = shape.canAdd.top ? "block" : "none";

    // for (let state in ShapeState) {
    //   targetEl.classList.remove(state);
    // }
    // targetEl.classList.add(shape.shapeState.toString());
    // for (let state in MenuState) {
    //   targetEl.classList.remove(state);
    // }
    // targetEl.classList.add(shape.menuState.toString());

    // if (shape.shapeState === ShapeState.default) {
    //   targetEl.style.border = "none";
    // } else {
    //   targetEl.style.border = `2px solid ${hexToHSL(shape.color, {
    //     brightness: -0.25
    //   })}`;
    // }
    return targetEl;
  }
}

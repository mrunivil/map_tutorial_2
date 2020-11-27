import { ViewModel } from "../model/view.model";
import { AbstractRenderer } from "./abstract.renderer";
import { ShapeViewModel } from "../model/shape";
import { CELL_SIZE } from "..";

export class ShapeRenderer extends AbstractRenderer {
  render(model: ViewModel): void {
    const view = model as ShapeViewModel;
    const layerEl = document.querySelector(`#current_layer`) as HTMLElement;
    let shapeEl = document.querySelector(
      `#shape_${view.shape.id}`
    ) as HTMLElement;

    if (!shapeEl) {
      shapeEl = document.createElement("div") as HTMLElement;
      shapeEl.id = `shape_${view.shape.id}`;
      shapeEl.classList.add("shape");
      shapeEl.dataset.name = view.shape.name;
      shapeEl.style.position = "absolute";
      layerEl.appendChild(shapeEl);
    }

    shapeEl.style.top = `${view.shape.dimension.yMin * CELL_SIZE}`;
    shapeEl.style.left = `${view.shape.dimension.xMin * CELL_SIZE}`;
    shapeEl.style.height = `${
      view.shape.dimension.xMax * CELL_SIZE -
      view.shape.dimension.yMin * CELL_SIZE
    }px`;
    shapeEl.style.width = `${
      view.shape.dimension.xMax * CELL_SIZE -
      view.shape.dimension.xMin * CELL_SIZE
    }px`;

    shapeEl.style.backgroundColor = view.shape.color || "#0066a1";
  }
}

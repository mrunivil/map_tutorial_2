import { Shape } from "./model/shape";
import { MapService } from "./map.service";
import { draw } from "./index";
export abstract class ControlsService {
  static registerClickListener(targetEl: HTMLElement, callback: Function) {
    console.log("registered click listener");
    targetEl.addEventListener("click", () => callback());
  }
  static handleClick(shape: Shape, evt: Event): void {
    MapService.currentLayer.shapes.set(shape.name, {
      ...shape,
      selected: !shape.selected
    });
    MapService.updateLayer();
    evt.stopImmediatePropagation();
    draw();
  }
}

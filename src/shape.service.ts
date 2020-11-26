import { draw } from ".";
import { ControlsService } from "./controls.service";
import { MapService } from "./map.service";
import { Shape, ShapeType } from "./model/shape";
import { RoomShapeRenderer } from "./renderer/room.shape.renderer";
export abstract class ShapeService {
  private static renderer = new RoomShapeRenderer();

  static createNewShape(obj?: Partial<Shape>) {
    return new Shape(obj);
  }

  static toHTML(shape: Shape, targetEl: HTMLElement): HTMLElement {
    if (shape.type === ShapeType.room) {
      return this.renderer.renderShape(shape, targetEl);
    }
    return targetEl;
  }

  static generateShapeElement(shape: Shape) {
    const targetEl = document.createElement("div") as HTMLDivElement;
    targetEl.id = shape.name;
    targetEl.style.position = "absolute";
    if (shape.type === ShapeType.room) {
      targetEl.classList.add("room");
      this.generateControls(targetEl);
      ControlsService.registerClickListener(targetEl, (evt: Event) => {
        MapService.currentLayer.shapes.set(shape.name, {
          ...shape,
          selected: !shape.selected
        });
        MapService.updateLayer();
        evt.stopImmediatePropagation();
        draw();
      });
    }
    return targetEl;
  }

  private static generateControls(targetEl: HTMLElement) {
    const addTop = document.createElement("div");
    const addBottom = document.createElement("div");
    const addRight = document.createElement("div");
    const addLeft = document.createElement("div");
    const img = new Image();
    img.onload = () => {
      addTop.style.backgroundImage = `url("${img.src}")`;
      addBottom.style.backgroundImage = `url("${img.src}")`;
      addRight.style.backgroundImage = `url("${img.src}")`;
      addLeft.style.backgroundImage = `url("${img.src}")`;
    };
    img.src = "./assets/add.top.svg";
    addTop.classList.add("room-control", "top");
    addBottom.classList.add("room-control", "bottom");
    addRight.classList.add("room-control", "right");
    addLeft.classList.add("room-control", "left");
    targetEl.appendChild(addTop);
    targetEl.appendChild(addBottom);
    targetEl.appendChild(addRight);
    targetEl.appendChild(addLeft);
  }
}

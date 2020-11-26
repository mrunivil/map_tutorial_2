import { draw } from ".";
import { ControlsService } from "./controls.service";
import { MapService } from "./map.service";
import { MenuState, Shape, ShapeState, ShapeType } from "./model/shape";
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
      this.generateControls(shape, targetEl);
      ControlsService.registerClickListener(targetEl, (evt: Event) => {
        MapService.selectShape(shape);
        evt.stopImmediatePropagation();
      });
    }
    return targetEl;
  }

  private static generateControls(shape: Shape, targetEl: HTMLElement) {
    this.generateControlsAdding(shape, targetEl);
    this.generateControlsSelected(shape, targetEl);
  }
  private static generateControlsSelected(shape: Shape, targetEl: HTMLElement) {
    const menuControl = document.createElement("div");
    const menuOptions = document.createElement("div");
    menuOptions.classList.add("room-control", "menu-options");
    menuControl.classList.add("room-control", "menu-control");
    ControlsService.registerClickListener(menuControl, (evt: Event) => {
      debugger;
      if (shape.menuState === MenuState.menuHidden) {
        MapService.currentLayer.shapes.set(shape.name, {
          ...shape,
          menuState: MenuState.menuVisible
        });
      } else {
        MapService.currentLayer.shapes.set(shape.name, {
          ...shape,
          menuState: MenuState.menuHidden
        });
      }
      MapService.updateLayer();
      evt.stopImmediatePropagation();
      draw();
    });
    targetEl.appendChild(menuControl);
  }
  private static generateControlsAdding(shape: Shape, targetEl: HTMLElement) {
    const addTop = document.createElement("div");
    const addBottom = document.createElement("div");
    const addRight = document.createElement("div");
    const addLeft = document.createElement("div");
    addTop.classList.add("room-control", "adding", "top");
    addBottom.classList.add("room-control", "adding", "bottom");
    addRight.classList.add("room-control", "adding", "right");
    addLeft.classList.add("room-control", "adding", "left");
    targetEl.appendChild(addTop);
    targetEl.appendChild(addBottom);
    targetEl.appendChild(addRight);
    targetEl.appendChild(addLeft);
  }
}

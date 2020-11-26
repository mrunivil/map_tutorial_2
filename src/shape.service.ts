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
      });
    }
    return targetEl;
  }

  private static generateControls(shape: Shape, targetEl: HTMLElement) {
    this.generateControlsAdding(shape, targetEl);
    this.generateControlsSelected(shape, targetEl);
  }
  private static generateControlsSelected(shape: Shape, targetEl: HTMLElement) {
    const menuEl = document.createElement("div");
    menuEl.classList.add("menu");
    const menuControlEl = document.createElement("div");
    menuControlEl.classList.add("menu-control", "room-control");
    const menuOptionsEl = document.createElement("div");
    menuOptionsEl.classList.add("menu-options");
    const addShapeMenuOptionEl = document.createElement("div");
    addShapeMenuOptionEl.classList.add("menu-option", "room-control");
    addShapeMenuOptionEl.style.backgroundImage = 'url("./assets/add.top.svg")';
    menuOptionsEl.appendChild(addShapeMenuOptionEl);
    menuEl.append(menuOptionsEl, menuControlEl);
    targetEl.append(menuEl);

    ControlsService.registerClickListener(
      addShapeMenuOptionEl,
      (evt: Event) => {
        MapService.updateCurrentShape({
          ...MapService.currentShape,
          shapeState: ShapeState.adding,
          menuState: MenuState.menuHidden
        });
      }
    );

    ControlsService.registerClickListener(menuControlEl, (evt: Event) => {
      if (MapService.currentShape.menuState === MenuState.menuOpened) {
        MapService.updateCurrentShape({
          ...MapService.currentShape,
          menuState: MenuState.menuVisible
        });
      } else {
        MapService.updateCurrentShape({
          ...MapService.currentShape,
          menuState: MenuState.menuOpened
        });
      }
    });
    return targetEl;
  }
  private static generateControlsAdding(shape: Shape, targetEl: HTMLElement) {
    const addTop = document.createElement("div");
    ControlsService.registerClickListener(addTop, (evt: Event) => {
      MapService.addShape({ ...shape, height: 2, width: 2, y: shape.y - 2 });
    });
    const addBottom = document.createElement("div");
    const addRight = document.createElement("div");
    const addLeft = document.createElement("div");
    addTop.classList.add("room-control", "menu-option", "adding", "top");
    addBottom.classList.add("room-control", "menu-option", "adding", "bottom");
    addRight.classList.add("room-control", "menu-option", "adding", "right");
    addLeft.classList.add("room-control", "menu-option", "adding", "left");
    targetEl.appendChild(addTop);
    targetEl.appendChild(addBottom);
    targetEl.appendChild(addRight);
    targetEl.appendChild(addLeft);
  }
}

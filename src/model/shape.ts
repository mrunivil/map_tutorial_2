import { Dimension } from "./dimension";
import { Vector } from "./vector";
import { ViewModel } from "./view.model";
export enum ShapeType {
  "floor",
  "room"
}
export enum ShapeState {
  "default" = "default",
  "selected" = "selected",
  "adding" = "adding",
  "moving" = "moving",
  "deleting" = "deleting",
  "resizing" = "resizing"
}
export enum MenuState {
  "menuHidden" = "menuHidden",
  "menuVisible" = "menuVisible",
  "menuOpened" = "menuOpened"
}
export class Shape {
  readonly name: string = "default";
  readonly x: number = 0;
  readonly y: number = 0;
  readonly width: number = 1;
  readonly height: number = 1;
  readonly color: string = "#daeecd";
  constructor(obj?: Partial<Shape>) {
    Object.assign(this, obj);
  }
}
export class ShapeViewModel implements ViewModel {
  readonly position!: Vector;
  readonly dimension!: Dimension;
  readonly shape!: Shape;
  readonly shapeState: ShapeState = ShapeState.default;
  readonly menuState: MenuState = MenuState.menuHidden;
  readonly canAdd: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  } = { top: true, right: true, bottom: true, left: true };
  constructor(obj: Partial<ShapeViewModel>) {
    Object.assign(this, obj);
  }
}

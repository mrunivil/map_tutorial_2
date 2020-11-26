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
  readonly type: ShapeType = ShapeType.floor;
  readonly color: string = "#daeecd";
  readonly shapeState: ShapeState = ShapeState.default;
  readonly menuState: MenuState = MenuState.menuHidden;
  readonly canAdd: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  } = { top: true, right: true, bottom: true, left: true };
  constructor(obj?: Partial<Shape>) {
    Object.assign(this, obj);
  }
}

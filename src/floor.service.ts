import { Floor } from "./model/floor";
import { MAP_WIDTH, MAP_HEIGHT } from "./index";
import { ShapeService } from "./shape.service";
import { MapService } from "./map.service";
import { FloorShapeRenderer } from "./renderer/floor.shape.renderer";
export abstract class FloorService {
  private static renderer = new FloorShapeRenderer();

  static createNewFloor() {
    const floor = new Floor({
      width: MAP_WIDTH,
      height: MAP_HEIGHT,
      shapes: []
    });
    for (let i = 0; i < (floor.width || 1) * (floor.height || 1); i++) {
      const row = Math.floor(i / floor.width);
      const col = i - floor.width * row;
      floor.shapes.push(
        ShapeService.createNewShape({
          name: `floor_${i}`,
          x: col,
          y: row
        })
      );
    }
    return floor;
  }
  static toHTML(floor: Floor, targetEl: HTMLDivElement): HTMLDivElement {
    for (let s of floor.shapes) {
      let shapeEl = document.querySelector(`#${s.name}`) as HTMLDivElement;
      if (!shapeEl) {
        const html = this.renderer.renderShape(
          s,
          ShapeService.generateShapeElement(s)
        );
        html.classList.add("floor-shape");
        targetEl.appendChild(html);
      } else {
        ShapeService.toHTML(s, shapeEl);
      }
    }
    return targetEl;
  }
  static generateFloorElement() {
    const targetEl = document.createElement("div");
    targetEl.id = "floor";
    targetEl.style.width = `${MapService.TOTAL_MAP_WIDTH}px`;
    targetEl.style.height = `${MapService.TOTAL_MAP_HEIGHT}px`;
    targetEl.style.position = "absolute";
    return targetEl;
  }
}

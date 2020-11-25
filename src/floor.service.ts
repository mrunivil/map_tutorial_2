import { Floor } from "./model/floor";
import { MAP_WIDTH, MAP_HEIGHT } from "./index";
import { ShapeService } from "./shape.service";
import { MapService } from "./map.service";
export abstract class FloorService {
  static createNewFloor() {
    const floor = new Floor({
      width: MAP_WIDTH,
      height: MAP_HEIGHT,
      shapes: []
    });
    for (let i = 0; i < (floor.width || 1) * (floor.height || 1); i++) {
      const row = Math.floor(i / (floor.height || 1));
      const col = (i - row) % (floor.width || 1);
      floor.shapes.push(
        ShapeService.createNewShape({
          x: col,
          y: row
        })
      );
    }
    return floor;
  }
  static toHTML(floor: Floor, targetEl: HTMLDivElement): HTMLDivElement {
    targetEl.id = "floor";
    targetEl.style.width = `${MapService.TOTAL_MAP_WIDTH}px`;
    targetEl.style.height = `${MapService.TOTAL_MAP_HEIGHT}px`;
    return targetEl;
  }
}

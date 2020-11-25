import { Floor } from "./model/floor";
import { MAP_WIDTH, MAP_HEIGHT } from "./index";
import { ShapeService } from "./shape.service";
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
  static toHTML(floor: Floor) {}
}

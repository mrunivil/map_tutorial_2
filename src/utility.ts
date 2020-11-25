import { Shape } from "./model/shape";
import { Layer } from "./model/layer";
function checkHorizontalCollision(s1: Shape, s2: Shape): boolean {
  return (
    ((s1.x || 0) <= (s2.x || 0) &&
      (s1.x || 0) + (s1.width || 0) >= (s2.x || 0)) ||
    ((s1.x || 0) >= (s2.x || 0) && (s2.x || 0) + (s2.width || 0) >= (s1.x || 0))
  );
}
function checkVerticalCollision(s1: Shape, s2: Shape): boolean {
  return (
    ((s1.y || 0) <= (s2.y || 0) &&
      (s1.y || 0) + (s1.height || 0) >= (s2.y || 0)) ||
    ((s1.y || 0) >= (s2.y || 0) &&
      (s2.y || 0) + (s2.height || 0) >= (s1.y || 0))
  );
}
export function detectCollision(shape: Shape, layer: Layer) {
  const shapes = Array.from(layer.shapes.values());
  let collision = false;
  for (let s of shapes) {
    collision =
      checkHorizontalCollision(shape, s) && checkVerticalCollision(shape, s);
    if (collision) break;
  }
  return collision;
}

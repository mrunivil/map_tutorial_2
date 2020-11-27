import { Shape } from "./model/shape";
import { Layer } from "./model/layer";
import { MAP_HEIGHT, MAP_WIDTH } from ".";
function checkHorizontalCollision(s1: Shape, s2: Shape): boolean {
  return (
    s1.x === s2.x ||
    ((s1.x || 0) < (s2.x || 0) &&
      (s1.x || 0) + (s1.width || 0) > (s2.x || 0)) ||
    ((s1.x || 0) > (s2.x || 0) && (s2.x || 0) + (s2.width || 0) > (s1.x || 0))
  );
}
function checkVerticalCollision(s1: Shape, s2: Shape): boolean {
  return (
    s1.y === s2.y ||
    ((s1.y || 0) < (s2.y || 0) &&
      (s1.y || 0) + (s1.height || 0) > (s2.y || 0)) ||
    ((s1.y || 0) > (s2.y || 0) && (s2.y || 0) + (s2.height || 0) > (s1.y || 0))
  );
}
export function detectCollision(shape: Shape, layer: Layer) {
  const shapes = Array.from(layer.shapes.values());
  let collision = false;
  for (let s of shapes) {
    if (s.name !== shape.name) {
      collision =
        checkHorizontalCollision(shape, s) && checkVerticalCollision(shape, s);
    }
    if (collision) break;
  }
  collision = collision || shape.x < 0 || shape.y < 0;
  collision =
    collision ||
    shape.x + shape.width > MAP_WIDTH ||
    shape.y + shape.height > MAP_HEIGHT;
  return collision;
}
export function hexToHSL(
  color: string,
  tint?: { brightness?: number; saturation?: number }
) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    color
  ) as Array<string>;

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);
  h = Math.round(h * 360);

  if (tint) {
    s = s + s * (tint.saturation || 0);
    l = l + l * (tint.brightness || 0);
  }

  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

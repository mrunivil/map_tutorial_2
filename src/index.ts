import { Floor } from "./floor";
import { Layer } from "./layer";
import { LayerService } from "./layer.service";
import { Shape } from "./shape";
import { ViewPort } from "./viewport";
import { ViewportService } from "./viewport.service";

export const MAP_WIDTH = 450;
export const MAP_HEIGHT = 800;

let viewPort = new ViewPort({ x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 });
const layers: Layer[] = [];

function draw() {
  const map = document.querySelector("#map") as HTMLDivElement;

  const currentCamera = document.querySelector("#camera");
  if (currentCamera) {
    map.removeChild(currentCamera);
  }
  const currentLayer = document.querySelector(".layer");
  if (currentLayer) {
    map.removeChild(currentLayer);
  }
  for (let layer of layers) {
    map.appendChild(LayerService.generateLayer(layer));
  }
  const camera = ViewportService.generateViewport(viewPort);
  map.appendChild(camera);
}
function addNewShape(shape: Shape) {
  LayerService.generateShape(layers[0], shape);
  draw();
}
function previousLayer() {}
function nextLayer() {}
function addLayer() {
  const newLayer = new Layer({
    name: "Basement",
    floor: new Floor({ width: 10, height: 10 }),
    width: 10,
    height: 10,
    shapes: []
  });
  layers.push({ ...newLayer, floor: LayerService.generateFloor(newLayer) });
  draw();
}
function zoomIn() {
  viewPort = ViewportService.zoomIn(viewPort);
  draw();
}
function zoomOut() {
  viewPort = ViewportService.zoomOut(viewPort);
  draw();
}
function scrollLeft() {
  viewPort = ViewportService.moveLeft(viewPort);
  draw();
}
function scrollUp() {
  viewPort = ViewportService.moveUp(viewPort);
  draw();
}
function scrollRight() {
  viewPort = ViewportService.moveRight(viewPort);
  draw();
}
function scrollDown() {
  viewPort = ViewportService.moveDown(viewPort);
  draw();
}

(() => {
  const map = document.querySelector("#map") as HTMLDivElement;
  map.style.width = `${MAP_WIDTH}px`;
  map.style.height = `${MAP_HEIGHT}px`;
  addLayer();
  (document.querySelector(
    "#btn_zoom_in"
  ) as HTMLButtonElement).addEventListener("click", () => {
    zoomIn();
  });
  (document.querySelector(
    "#btn_zoom_out"
  ) as HTMLButtonElement).addEventListener("click", () => {
    zoomOut();
  });
  (document.querySelector(
    "#btn_scroll_up"
  ) as HTMLButtonElement).addEventListener("click", () => {
    scrollUp();
  });
  (document.querySelector(
    "#btn_scroll_down"
  ) as HTMLButtonElement).addEventListener("click", () => {
    scrollDown();
  });
  (document.querySelector(
    "#btn_scroll_right"
  ) as HTMLButtonElement).addEventListener("click", () => {
    scrollRight();
  });
  (document.querySelector(
    "#btn_scroll_left"
  ) as HTMLButtonElement).addEventListener("click", () => {
    scrollLeft();
  });
  (document.querySelector(
    "#btn_log_model"
  ) as HTMLButtonElement).addEventListener("click", () => {
    console.log(layers, viewPort);
  });

  draw();
})();

import { LayerService } from "./layer.service";
import { MapService } from "./map.service";
import { ShapeService } from "./shape.service";
import { Shape } from "./model/shape";
import { WifiMap } from "./model/wifi.map";

export const MAP_WIDTH = 9;
export const MAP_HEIGHT = 16;

let map: WifiMap;

// let viewPort = new ViewPort({ x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 });
// const layers: Map<string, Layer> = new Map();
// let selectedLayer: Layer;

function cleanUp(map: HTMLDivElement) {
  // const currentCamera = document.querySelector("#camera");
  // if (currentCamera) {
  //   map.removeChild(currentCamera);
  // }
  // document.querySelectorAll(".layer").forEach((layer) => {
  //   map.removeChild(layer);
  // });
}
function draw() {
  if (map) {
    const labelCurrentLayer = document.querySelector(
      "#currentLayer"
    ) as HTMLParagraphElement;
    labelCurrentLayer.innerHTML = MapService.currentLayer.name || "no";
    // do the magic
  }
  // const map = document.querySelector("#map") as HTMLDivElement;

  // cleanUp(map);
  // for (let layer of Array.from(layers.values())) {
  //   map.appendChild(LayerService.generateLayer(layer));
  // }
  // const camera = ViewportService.generateViewport(viewPort);
  // map.appendChild(camera);
}
function createNewMap() {
  map = MapService.createNewMap();
  map = MapService.addLayer("Basement", map);
  debugger;
  map = MapService.addShape(map);
  draw();
}
function removeShape(shape: Shape) {
  draw();
}
function addNewShape(shape: Shape) {
  draw();
}
function previousLayer() {}
function nextLayer() {}
function addLayer() {
  draw();
}
function zoomIn() {
  // viewPort = ViewportService.zoomIn(viewPort);
  draw();
}
function zoomOut() {
  // viewPort = ViewportService.zoomOut(viewPort);
  draw();
}
function scrollLeft() {
  // viewPort = ViewportService.moveLeft(viewPort);
  draw();
}
function scrollUp() {
  // viewPort = ViewportService.moveUp(viewPort);
  draw();
}
function scrollRight() {
  // viewPort = ViewportService.moveRight(viewPort);
  draw();
}
function scrollDown() {
  // viewPort = ViewportService.moveDown(viewPort);
  draw();
}

(() => {
  // const map = document.querySelector("#map") as HTMLDivElement;
  // map.style.width = `${MAP_WIDTH}px`;
  // map.style.height = `${MAP_HEIGHT}px`;
  // addLayer();
  // addNewShape(
  //   new Shape({
  //     x: 5,
  //     y: 5,
  //     width: 2,
  //     height: 2,
  //     color: "red"
  //   })
  // );

  // setTimeout(() => {
  //   console.log("removing shape");
  //   removeShape(selectedLayer.shapes[0]);
  // }, 2500);

  // (document.querySelector(
  //   "#btn_zoom_in"
  // ) as HTMLButtonElement).addEventListener("click", () => {
  //   zoomIn();
  // });
  // (document.querySelector(
  //   "#btn_zoom_out"
  // ) as HTMLButtonElement).addEventListener("click", () => {
  //   zoomOut();
  // });
  // (document.querySelector(
  //   "#btn_scroll_up"
  // ) as HTMLButtonElement).addEventListener("click", () => {
  //   scrollUp();
  // });
  // (document.querySelector(
  //   "#btn_scroll_down"
  // ) as HTMLButtonElement).addEventListener("click", () => {
  //   scrollDown();
  // });
  // (document.querySelector(
  //   "#btn_scroll_right"
  // ) as HTMLButtonElement).addEventListener("click", () => {
  //   scrollRight();
  // });
  // (document.querySelector(
  //   "#btn_scroll_left"
  // ) as HTMLButtonElement).addEventListener("click", () => {
  //   scrollLeft();
  // });
  (document.querySelector(
    "#btn_new_map"
  ) as HTMLButtonElement).addEventListener("click", () => {
    createNewMap();
  });
  (document.querySelector(
    "#btn_log_model"
  ) as HTMLButtonElement).addEventListener("click", () => {
    console.log(map);
  });

  draw();
})();

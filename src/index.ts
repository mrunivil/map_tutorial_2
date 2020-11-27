import { MapRenderer } from "./renderer/map.renderer";
import { AppState } from "./state/app.state";

export const MAP_WIDTH = 9;
export const MAP_HEIGHT = 16;
export const CELL_SIZE = 32;

export const debug = true;

let boardEl: HTMLDivElement | null;

const mapRenderer = new MapRenderer();

export function draw() {
  if (AppState.currentMap) {
    mapRenderer.render(AppState.currentMap);
  }

  const labelCurrentLayer = document.querySelector(
    "#currentLayer"
  ) as HTMLParagraphElement;
  labelCurrentLayer.innerHTML = AppState.currentLayer
    ? AppState.currentLayer.layer.name
    : "no";
  // if (MapService.map) {
  //   if (!boardEl) {
  //     boardEl = document.querySelector("#board") as HTMLDivElement;
  //     document.body.appendChild(boardEl);
  //   }
  //   const mapEl = document.querySelector("#map") as HTMLDivElement;
  //   if (mapEl) {
  //     MapService.toHTML(MapService.map, boardEl, mapEl);
  //   } else {
  //     boardEl.appendChild(
  //       MapService.toHTML(
  //         MapService.map,
  //         boardEl,
  //         document.createElement("div")
  //       )
  //     );
  //   }
  // }
}
function createNewMap() {
  AppState.createNewMap();
  draw();
  // MapService.createNewMap();
  // MapService.addLayer("Basement");
  // MapService.addShape(
  //   new Shape({
  //     color: "#ce9ded",
  //     width: 2,
  //     height: 2,
  //     type: ShapeType.room,
  //     x: Math.floor(MAP_WIDTH / 2 - 1),
  //     y: MAP_HEIGHT / 2 - 1
  //   })
  // );
}
function addNewLayer() {
  if (!AppState.currentMap) {
    alert("Bitte erst einen neuen Grundriss erstellen");
  } else {
    const layerName = window.prompt("Name of Your new Layer");
    AppState.addNewLayer(layerName || "kein name");
    draw();
  }
}
function create(selector?: string) {
  if (selector) {
    boardEl = document.querySelector(selector);
  }
  window.onresize = () => {
    draw();
  };
  draw();
}
(() => {
  (document.querySelector(
    "#btn_new_map"
  ) as HTMLButtonElement).addEventListener("click", () => {
    createNewMap();
  });
  (document.querySelector(
    "#btn_add_layer"
  ) as HTMLButtonElement).addEventListener("click", () => {
    addNewLayer();
  });
  (document.querySelector(
    "#btn_log_model"
  ) as HTMLButtonElement).addEventListener("click", () => {
    console.dir(AppState.currentMap);
  });
  create("#board");
})();

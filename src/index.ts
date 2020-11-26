import { LayerService } from "./layer.service";
import { MapService } from "./map.service";
import { Shape, ShapeType } from "./model/shape";

export const MAP_WIDTH = 9;
export const MAP_HEIGHT = 16;
export const CELL_SIZE = 32;

export const debug = true;

let boardEl: HTMLDivElement | null;

export function draw() {
  if (MapService.map) {
    const labelCurrentLayer = document.querySelector(
      "#currentLayer"
    ) as HTMLParagraphElement;
    labelCurrentLayer.innerHTML = MapService.currentLayer.name || "no";
    if (!boardEl) {
      boardEl = document.querySelector("#board") as HTMLDivElement;
      document.body.appendChild(boardEl);
    }

    const mapEl = document.querySelector("#map") as HTMLDivElement;
    if (mapEl) {
      MapService.toHTML(MapService.map, boardEl, mapEl);
    } else {
      boardEl.appendChild(
        MapService.toHTML(
          MapService.map,
          boardEl,
          document.createElement("div")
        )
      );
    }
  }
}
function createNewMap() {
  MapService.createNewMap();
  MapService.addLayer("Basement");
  MapService.addShape(
    new Shape({
      color: "#ce9ded",
      width: 2,
      height: 2,
      type: ShapeType.room,
      x: Math.floor(MAP_WIDTH / 2 - 1),
      y: MAP_HEIGHT / 2 - 1
    })
  );
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
    "#btn_log_model"
  ) as HTMLButtonElement).addEventListener("click", () => {
    console.log(MapService.map);
  });
  create("#board");
})();

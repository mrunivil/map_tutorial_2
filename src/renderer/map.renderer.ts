import { ViewModel } from "../model/view.model";
import { WifiMapViewModel } from "../model/wifi.map";
import { AbstractRenderer } from "./abstract.renderer";
import { LayerRenderer } from "./layer.renderer";
export class MapRenderer extends AbstractRenderer {
  readonly layerRenderer = new LayerRenderer();
  render(model: ViewModel): void {
    const view = model as WifiMapViewModel;
    let mapEl = document.querySelector("#map") as HTMLElement;
    if (!mapEl) {
      mapEl = document.createElement("div") as HTMLElement;
      mapEl.id = "map";
      mapEl.classList.add("map");
      mapEl.style.position = "absolute";
      (document.querySelector("#board") as HTMLElement).appendChild(mapEl);
    }
    mapEl.style.left = `${model.position.x}`;
    mapEl.style.top = `${model.position.y}`;
    mapEl.style.width = `${view.dimension.width}`;
    mapEl.style.height = `${view.dimension.height}`;
  }
}

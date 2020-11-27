import { ViewModel } from "../model/view.model";
import { AbstractRenderer } from "./abstract.renderer";
export class LayerRenderer extends AbstractRenderer {
  render(model: ViewModel): void {
    throw new Error("Method not implemented.");
  }
}

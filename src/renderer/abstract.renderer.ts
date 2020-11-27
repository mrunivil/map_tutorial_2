import { ViewModel } from "../model/view.model";

export abstract class AbstractRenderer {
  abstract render(model: ViewModel): void;
}

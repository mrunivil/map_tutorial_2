import { Vector } from "./vector";
import { Dimension } from "./dimension";
export interface ViewModel {
  readonly position: Vector;
  readonly dimension: Dimension;
}

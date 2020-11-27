import { Layer, LayerViewModel } from "../model/layer";
import { ShapeViewModel } from "../model/shape";
import { WifiMapViewModel } from "../model/wifi.map";
import { AddLayerUseCase, CreateMapUseCase } from "../use.cases";
export abstract class AppState {
  static readonly MAP_WIDTH = 100;
  static readonly MAP_HEIGHT = 100;
  static readonly CELL_SIZE = 32;

  static currentMap: WifiMapViewModel;
  static currentLayer: LayerViewModel;
  static currentShape: ShapeViewModel;

  static createNewMap() {
    this.currentMap = WifiMapViewModel.fromModel(CreateMapUseCase.execute());
  }

  static addNewLayer(name: string) {
    this.currentLayer = LayerViewModel.fromModel(
      AddLayerUseCase.execute(new Layer({ name }), this.currentMap.map)
    );
  }
}

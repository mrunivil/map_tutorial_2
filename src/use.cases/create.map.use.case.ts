import { WifiMap } from "../model/wifi.map";
export abstract class CreateMapUseCase {
  static execute(): WifiMap {
    return new WifiMap();
  }
}

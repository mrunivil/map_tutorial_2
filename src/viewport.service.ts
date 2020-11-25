import { MAP_HEIGHT, MAP_WIDTH } from ".";
import { ViewPort } from "./model/viewport";
export abstract class ViewportService {
  private static readonly cameraSpeed = 25;
  private static readonly viewPortWidth = 90;
  private static readonly viewPortHeight = 160;

  static zoomIn(viewPort: ViewPort): ViewPort {
    return new ViewPort({
      ...viewPort,
      zoom: Math.min(viewPort.zoom + 0.25, 1.5)
    });
  }
  static zoomOut(viewPort: ViewPort): ViewPort {
    return new ViewPort({
      ...viewPort,
      zoom: Math.max(viewPort.zoom - 0.25, 0.5)
    });
  }
  static moveUp(viewport: ViewPort): ViewPort {
    const viewPortHeight = ViewportService.viewPortHeight * (1 / viewport.zoom);
    return new ViewPort({
      ...viewport,
      y: Math.max(
        (viewport.y || 0) - ViewportService.cameraSpeed,
        viewPortHeight / 2
      )
    });
  }
  static moveDown(viewport: ViewPort): ViewPort {
    const viewPortHeight = ViewportService.viewPortHeight * (1 / viewport.zoom);
    return new ViewPort({
      ...viewport,
      y: Math.min(
        (viewport.y || 0) + ViewportService.cameraSpeed,
        MAP_HEIGHT - viewPortHeight / 2
      )
    });
  }
  static moveRight(viewport: ViewPort): ViewPort {
    const viewPortWidth = ViewportService.viewPortWidth * (1 / viewport.zoom);
    return new ViewPort({
      ...viewport,
      x: Math.min(
        (viewport.x || 0) + ViewportService.cameraSpeed,
        MAP_WIDTH - viewPortWidth / 2
      )
    });
  }
  static moveLeft(viewport: ViewPort): ViewPort {
    const viewPortWidth = ViewportService.viewPortWidth * (1 / viewport.zoom);
    return new ViewPort({
      ...viewport,
      x: Math.max(
        (viewport.x || 0) - ViewportService.cameraSpeed,
        viewPortWidth / 2
      )
    });
  }
  static generateViewport(viewport: ViewPort): HTMLDivElement {
    const viewPortWidth = ViewportService.viewPortWidth * (1 / viewport.zoom);
    const viewPortHeight = ViewportService.viewPortHeight * (1 / viewport.zoom);
    const camera = document.createElement("div");
    camera.style.width = `${viewPortWidth}px`;
    camera.style.height = `${viewPortHeight}px`;
    camera.style.position = "absolute";
    camera.id = "camera";
    camera.style.left = `${(viewport.x || 0) - viewPortWidth / 2}px`;
    camera.style.top = `${(viewport.y || 0) - viewPortHeight / 2}px`;
    return camera;
  }
}

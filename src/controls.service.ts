export abstract class ControlsService {
  static registerClickListener(targetEl: HTMLElement, callback: Function) {
    targetEl.addEventListener("click", (evt) => {
      evt.stopImmediatePropagation();
      callback(evt);
    });
  }
}

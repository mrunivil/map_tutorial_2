export abstract class ControlsService {
  static registerClickListener(targetEl: HTMLElement, callback: Function) {
    console.log("registered click listener");
    targetEl.addEventListener("click", (evt) => callback(evt));
  }
}

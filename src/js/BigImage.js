"use strict";
import {Popup} from './Popup';
export class BigImage extends Popup {
  open() {
    this.popup.querySelector(
      ".popup__conteiner"
    ).style.backgroundImage = `url(${event.target.dataset.url})`;
    super.open();
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }
}

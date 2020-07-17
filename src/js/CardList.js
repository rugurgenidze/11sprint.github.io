"use strict";

export class CardList {
  constructor(container, create) {
    this.container = container;
    this.create = create;
  }

  addCard(element) {
    const marker = this.create(element);
    this.container.appendChild(marker);
  }

  render(cards) {
   cards.forEach((card)=> {
     this.addCard(card);
   })
  }
}

import {Product} from "./product";

export class Supply {
  constructor(id: number = 0, slackId: string = "", quantity: number = 0, product: Product = null) {
    this.id = id;
    this.slackId = slackId;
    this.quantity = quantity;
    this.product = product;
  }

  id: number = 0;
  slackId: string = "";
  product: Product = null;
  quantity: number = 0;
}

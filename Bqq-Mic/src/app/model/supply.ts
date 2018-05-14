import {Product} from "./product";

export class Supply {
  constructor(id: number = 0, slackId: string = "", quantity: number = 0, product: Product = null) {
    this.Id = id;
    this.SlackId = slackId;
    this.Quantity = quantity;
    this.Product = product;
  }

  Id: number;
  SlackId: string;
  Product: Product;
  Quantity: number;
}

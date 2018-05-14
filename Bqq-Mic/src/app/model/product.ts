export class Product {
  constructor(name: string = "", category: string = "", quantity: number = 0, unit: string = "") {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.unit = unit;
  }

  id: number = 0;
  name: string = "";
  category: string = "";
  quantity: number = 0;
  unit : string = "";
}

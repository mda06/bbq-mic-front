export class Product {
  constructor(id: number = 0, name: string = "", category: string = "", quantity: number = 0, unit: string = "") {
    this.id = id;
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

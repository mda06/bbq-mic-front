export class Product {
  constructor(id: number = 0, name: string = "", category: string = "", quantity: number = 0, unit: string = "") {
    this.Id = id;
    this.Name = name;
    this.Category = category;
    this.Quantity = quantity;
    this.Unit = unit;
  }

  Id: number = 0;
  Name: string = "";
  Category: string = "";
  Quantity: number = 0;
  Unit : string = "";
}

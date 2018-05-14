import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Product} from "../model/product";

@Injectable()
export class ProductService {

  private getProductsUrl = "/api/product";
  private getProductQtUrl = "/api/product/quantity";

  constructor() { }

  getProducts(): Observable<Array<Product>> {
    return Observable.create(obs => {
      let arr = [
        new Product(1, "Merguez", "Viandes", 0, "g"),
        new Product(2, "Poulet", "Viandes", 300, "g"),
        new Product(3, "Vin", "Boissons", 3, "l"),
        new Product(4, "Coca", "Boissons", 5, "l"),
        new Product(5, "BBQ", "Outils", 2, "nb"),
        new Product(6, "Mayo", "Sauces", 0, "g"),
        new Product(7, "Ketchup", "Sauces", 300, "g"),
        new Product(8, "Chips", "Snacks", 5, "nb"),
        new Product(9, "Salade", "Légumes", 3, "nb"),
      ];
      obs.next(arr);
      obs.complete();
    });
  }

  getProductCurrentQuantity(product: Product): Observable<number> {
    return Observable.create(obs => {
      obs.next(Math.floor(Math.random() * product.quantity));
      obs.complete();
    });
  }

}

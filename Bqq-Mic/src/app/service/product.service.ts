import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Product} from "../model/product";

@Injectable()
export class ProductService {

  private getProductsUrl = "/api/product";

  constructor() { }

  getProducts(): Observable<Array<Product>> {
    return Observable.create(obs => {
      let arr = [
        new Product("Merguez", "Viandes", 300, "g"),
        new Product("Poulet", "Viandes", 300, "g"),
        new Product("Vin", "Boissons", 3, "l"),
        new Product("Coca", "Boissons", 5, "l"),
        new Product("BBQ", "Outils", 2, "nb"),
        new Product("Mayo", "Sauces", 100, "g"),
        new Product("Ketchup", "Sauces", 300, "g"),
        new Product("Chips", "Snacks", 5, "packets"),
        new Product("Salade", "Légumes", 3, "nb"),
      ];
      obs.next(arr);
      obs.complete();
    });
  }

}

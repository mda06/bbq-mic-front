import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Product} from "../model/product";
import {Supply} from "../model/supply";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductService {

  private baseUrl = "http://mic-bqq.azurewebsites.net";
  private getProductsUrl = "/api/product";
  private getProductQtUrl = "/api/product/quantity";
  private deleteSupplyUrl = "/api/supply/delete";
  private addSupplyUrl = "/api/supply/add";
  private updateSupplyUrl = "/api/supply/update";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    //return this.http.get<Array<Product>>(this.baseUrl + this.getProducts());
    return Observable.create(obs => {
      let arr = [
        new Product(1, "Merguez", "Viandes", 0, "g"),
        new Product(2, "Poulet", "Viandes", 0, "g"),
        new Product(3, "Vin", "Boissons", 3, "l"),
        new Product(4, "Coca", "Boissons", 5, "l"),
        new Product(5, "BBQ", "Outils", 2, "nb"),
        new Product(6, "Mayo", "Sauces", 1, "nb"),
        new Product(7, "Ketchup", "Sauces", 1, "nb"),
        new Product(8, "Chips", "Snacks", 5, "nb"),
        new Product(9, "Salade", "Légumes", 3, "nb"),
      ];
      obs.next(arr);
      obs.complete();
    });
  }

  getProductCurrentQuantity(product: Product): Observable<number> {
    //return this.http.get<number>(this.baseUrl + this.getProductQtUrl);
    return Observable.create(obs => {
      obs.next(Math.floor(Math.random() * product.quantity));
      obs.complete();
    });
  }

  addSupply(slackId: string, productId: number, quantity: number): Observable<Supply> {
    //return this.http.post<Supply>(this.addSupplyUrl, {slackId: slackId, productId: productId, quantity: quantity});
    return Observable.create(obs => {
      obs.next(new Supply(Math.floor(Math.random() * 1000), slackId, quantity, new Product(productId)));
      obs.complete();
    });
  }

  updateSupply(supply: Supply): Observable<Supply> {
    //return this.http.put<Supply>(this.updateSupplyUrl, supply);
    return Observable.create(obs => {
      obs.next(new Supply(Math.floor(Math.random() * 1000), supply.slackId, supply.quantity, supply.product));
      obs.complete();
    });
  }

  deleteSupply(supply: Supply): Observable<boolean> {
    //return this.http.delete<boolean>(this.deleteSupplyUrl + "/" + supply.id);
    return Observable.create(obs => {
      obs.next(true);
      obs.complete();
    });
  }

}

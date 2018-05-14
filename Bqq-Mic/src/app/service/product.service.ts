import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Product} from "../model/product";
import {Supply} from "../model/supply";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductService {

  private baseUrl = "http://mic-bbq.azurewebsites.net";
  private getProductsUrl = "/api/Products";
  private getProductQtUrl = "/api/totalQt";
  private deleteSupplyUrl = "/api/supplies";
  private addSupplyUrl = "/api/supplies";
  private updateSupplyUrl = "/api/supplies";
  private getSuppliesUrl = "/api/supplies";

  private mySupplies: Array<Supply> = [
    new Supply(1, "U8VD1SZ89", 20, new Product(8)),
    new Supply(2, "U8VD1SZ89", 2, new Product(1)),
    new Supply(3, "U8VD1SZ89", 3, new Product(5))
  ];

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.baseUrl + this.getProductsUrl);
  }

  getProductCurrentQuantity(product: Product): Observable<number> {
    //return this.http.get<number>(this.baseUrl + this.getProductQtUrl);
    return Observable.create(obs => {
      obs.next(Math.floor(Math.random() * product.Quantity));
      obs.complete();
    });
  }

  initMySupplies(): Observable<boolean> {
    return Observable.create(obs => {
      /*this.http.get<Array<Supply>>(this.baseUrl + this.getSuppliesUrl).subscribe(data => {
        this.mySupplies = data;
        obs.next(true);
        obs.complete();
      }, err => console.log(err));*/

      obs.next(true);
      obs.complete();
    });
  }

  getSupply(slackId: string, productId: number): Supply {
    return this.mySupplies.find(supply => supply.slackId === slackId && supply.product.Id === productId);
  }

  addSupply(slackId: string, productId: number, quantity: number): Observable<Supply> {
    //return this.http.post<Supply>(this.addSupplyUrl, {slackId: slackId, productId: productId, Quantity: Quantity});
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
    //return this.http.delete<boolean>(this.deleteSupplyUrl + "/" + supply.Id);
    return Observable.create(obs => {
      obs.next(true);
      obs.complete();
    });
  }

}

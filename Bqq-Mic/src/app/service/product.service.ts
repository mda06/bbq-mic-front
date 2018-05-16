import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Product} from "../model/product";
import {Supply} from "../model/supply";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestOptions} from "http";
import {RequestMethod, RequestOptionsArgs} from "@angular/http";

@Injectable()
export class ProductService {

  private baseUrl = "http://mic-bbq.azurewebsites.net";
  private getProductsUrl = "/api/Products";
  private slackIdsUrl = "/api/Products/GetSlackIds";
  private getProductQtUrl = "/api/TotalQuantity";
  private deleteSupplyUrl = "/api/supplies";
  private addSupplyUrl = "/api/supplies";
  private updateSupplyUrl = "/api/supplies";
  private getSuppliesUrl = "/api/supplies";

  private mySupplies: Array<Supply> = [];

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.baseUrl + this.getProductsUrl);
  }

  getProductCurrentQuantity(product: Product): Observable<number> {
    return this.http.get<number>(this.baseUrl + this.getProductQtUrl + "/" + product.Id);
  }

  initMySupplies(slackId: string): Observable<boolean> {
    return Observable.create(obs => {
      this.http.get<Array<Supply>>(this.baseUrl + this.getSuppliesUrl + "?SlackId=" + slackId).subscribe(data => {
        this.mySupplies = data;
        obs.next(true);
        obs.complete();
      }, err => console.log(err));
    });
  }

  getSupply(slackId: string, productId: number): Supply {
    return this.mySupplies.find(supply => supply.SlackId === slackId && supply.Product.Id === productId);
  }

  getSlackIds(productId: number): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.baseUrl + this.slackIdsUrl + "?productId=" + productId);
  }

  addSupply(slackId: string, productId: number, quantity: number): Observable<Supply> {
    return this.http.post<Supply>(this.baseUrl + this.addSupplyUrl, {slackId: slackId, productId: productId, Quantity: quantity});
  }

  updateSupply(supply: Supply): Observable<Supply> {
    return this.http.put<Supply>(this.baseUrl + this.updateSupplyUrl,
      {slackId: supply.SlackId, productId: supply.Product.Id, Quantity: supply.Quantity});
  }

  deleteSupply(slackId: string, supply: Supply): Observable<boolean> {
    return this.http.request<boolean>('DELETE', this.baseUrl + this.deleteSupplyUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { SlackId: slackId, ProductId: supply.Product.Id }
    });
  }

}

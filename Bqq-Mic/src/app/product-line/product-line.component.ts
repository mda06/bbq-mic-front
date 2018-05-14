import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ProductService} from "../service/product.service";
import {Supply} from "../model/supply";
import {SlackService} from "../service/slack.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'bbq-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.css']
})
export class ProductLineComponent implements OnInit {

  @Input() withQuantity: boolean;
  @Input() product: Product;
  totalQuantity: number = 0;
  currentQuantity: number = 0;
  canAddSupply: boolean = false;
  isSupplied: boolean = false;
  supply: Supply = null;
  slackId: string = "";

  constructor(private productService: ProductService,
              private slackService: SlackService) { }

  ngOnInit() {
    this.slackService.useridSubject$.subscribe(id => {
      this.slackId = id;
      console.log(id);
      this.canAddSupply = !isNullOrUndefined(id);
    }, err => console.log(err));
    this.withQuantity = this.product.quantity !== 0;
    this.currentQuantity = Math.floor(this.product.quantity / 2);
    this.initCurrentQuantity();
    setInterval(() => this.initCurrentQuantity(), 5000);
  }

  private initCurrentQuantity() {
    this.productService.getProductCurrentQuantity(this.product).subscribe(data => {
      this.totalQuantity = data;
    }, err => console.log(err));
  }

  onCheckboxClicked() {
    this.isSupplied = !this.isSupplied;
    if(this.isSupplied && this.canAddSupply) {
      this.productService.addSupply(this.slackId, this.product.id, this.withQuantity ? this.currentQuantity : 0).subscribe(
        data => this.supply = data,
        err => console.log(err)
      );
    } else {
      this.productService.deleteSupply(this.supply).subscribe(
        data => {
          if (data)
            this.supply = null;
        }, err => console.log(err)
      );
    }
  }

  onBlurQuantity() {
    if(this.isSupplied && this.canAddSupply) {
      this.supply.quantity = this.currentQuantity;
      this.productService.updateSupply(this.supply).subscribe(
        data => this.supply = data,
          err => console.log(err)
      );
    }
  }
}

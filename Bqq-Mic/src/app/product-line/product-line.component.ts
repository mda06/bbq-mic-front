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
  slackIds: Array<string> = [];
  isSupplyInitialized: boolean = false;

  constructor(private productService: ProductService,
              private slackService: SlackService) { }

  ngOnInit() {
    this.slackService.useridSubject$.subscribe(id => {
      this.slackId = id;
      this.canAddSupply = !isNullOrUndefined(id);
    }, err => console.log(err));
    this.slackService.mySuppliedInitialized$.subscribe(_ => {
      this.isSupplyInitialized = true;
      this.supply = this.productService.getSupply(this.slackId, this.product.Id);
      if(!isNullOrUndefined(this.supply)) {
        this.currentQuantity = this.supply.Quantity;
        this.isSupplied = true;
      }
    }, err => console.log(err));
    this.withQuantity = this.product.Quantity > 0;
    this.initTotalQuantity();
    setInterval(() => this.initTotalQuantity(), 10000);
  }

  private initTotalQuantity() {
    this.productService.getProductCurrentQuantity(this.product).subscribe(data => {
      this.totalQuantity = data;
    }, err => console.log(err));
    this.productService.getSlackIds(this.product.Id).subscribe(data => {
      this.slackIds = data;
    }, err => console.log(err));
  }

  onCheckboxClicked() {
    this.isSupplied = !this.isSupplied;
    if(this.isSupplied && this.canAddSupply) {
      this.productService.addSupply(this.slackId, this.product.Id, this.withQuantity ? this.getCurrentQuantity() : 0).subscribe(
        data => {
          this.supply = data;
          this.initTotalQuantity();
        },
        err => console.log(err)
      );
    } else {
      this.productService.deleteSupply(this.slackId, this.supply).subscribe(
        data => {
          this.initTotalQuantity();
          if (data)
            this.supply = null;
        }, err => console.log(err)
      );
    }
  }

  onBlurQuantity() {
    if(this.isSupplied && this.canAddSupply) {
      this.supply.Quantity = this.getCurrentQuantity();
      this.productService.updateSupply(this.supply).subscribe(
        data => {
          this.supply = data;
          this.initTotalQuantity();
          },err => console.log(err)
      );
    }
  }

  getCurrentQuantity(): number {
    if(this.currentQuantity < 0) this.currentQuantity = 0;
    else if(this.currentQuantity > 250) this.currentQuantity = 250;

    return this.currentQuantity;
  }
}

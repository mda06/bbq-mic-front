import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'bbq-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.css']
})
export class ProductLineComponent implements OnInit {

  @Input() withQuantity: boolean = true;
  @Input() product: Product;
  totalQuantity: number = 0;
  currentQuantity: number = 0;
  canAddSupply: boolean = false;
  isSupplied: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.currentQuantity = this.product.quantity / 2;
    this.initCurrentQuantity();
    setInterval(() => this.initCurrentQuantity(), 5000);
  }

  private initCurrentQuantity() {
    this.productService.getProductCurrentQuantity(this.product).subscribe(data => {
      this.totalQuantity = data;
    }, err => console.log(err));
  }

  onCheckboxClicked($event) {
    this.isSupplied = !this.isSupplied;
    if(this.isSupplied) {
      console.log("Add the supply with ", this.currentQuantity,  " for ", this.product.name);
    } else {
      console.log("Delete the supply");
    }
  }

  onBlurQuantity() {
    if(this.isSupplied) {
      console.log("Update the supply with: ", this.currentQuantity);
    }
  }
}

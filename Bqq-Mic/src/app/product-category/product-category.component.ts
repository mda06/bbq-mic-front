import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";

@Component({
  selector: 'bbq-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @Input() category: string;
  @Input() products: Array<Product> = [];

  constructor() { }

  ngOnInit() {

  }

}

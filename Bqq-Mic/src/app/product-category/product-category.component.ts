import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'bbq-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @Input() category: string;
  @Input() products: Array<Product> = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    
  }

}

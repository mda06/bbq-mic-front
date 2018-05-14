import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";

@Component({
  selector: 'bbq-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.css']
})
export class ProductLineComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}

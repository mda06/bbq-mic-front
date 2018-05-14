import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'bbq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() meats: Array<Product> = [];
  @Input() drinks: Array<Product> = [];
  @Input() snacks: Array<Product> = [];
  @Input() utils: Array<Product> = [];
  @Input() vegetables: Array<Product> = [];
  @Input() sauces: Array<Product> = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.meats = data.filter(p => p.category === 'Viandes');
      this.drinks = data.filter(p => p.category === 'Boissons');
      this.snacks = data.filter(p => p.category === 'Snacks');
      this.utils = data.filter(p => p.category === 'Outils');
      this.vegetables = data.filter(p => p.category === 'Légumes');
      this.sauces = data.filter(p => p.category === 'Sauces');
    }, err => console.log(err));
  }

}

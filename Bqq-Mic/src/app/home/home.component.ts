import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ProductService} from "../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import {SlackService} from "../service/slack.service";

@Component({
  selector: 'bbq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: String;

  @Input() meats: Array<Product> = [];
  @Input() drinks: Array<Product> = [];
  @Input() snacks: Array<Product> = [];
  @Input() utils: Array<Product> = [];
  @Input() vegetables: Array<Product> = [];
  @Input() sauces: Array<Product> = [];

  constructor(private productService: ProductService,
              public slackService: SlackService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
      if(!isNullOrUndefined(code)) {
        this.slackService.init(code).subscribe(data => {
          this.username = data;
        }, err => console.log(err));
      }
    });

    this.productService.getProducts().subscribe(data => {
      this.meats = data.filter(p => p.Category === 'Viandes').sort((a, b) => a.Quantity - b.Quantity);
      this.drinks = data.filter(p => p.Category === 'Boissons').sort((a, b) => a.Quantity - b.Quantity);
      this.snacks = data.filter(p => p.Category === 'Sides').sort((a, b) => a.Quantity - b.Quantity);
      this.utils = data.filter(p => p.Category === 'Outils').sort((a, b) => a.Quantity - b.Quantity);
      this.vegetables = data.filter(p => p.Category === 'Légumes').sort((a, b) => a.Quantity - b.Quantity);
      this.sauces = data.filter(p => p.Category === 'Sauces').sort((a, b) => a.Quantity - b.Quantity);
    }, err => console.log(err));
  }

}

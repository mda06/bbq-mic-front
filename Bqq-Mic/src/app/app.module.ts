import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductLineComponent } from './product-line/product-line.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductService } from "./service/product.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SlackService} from "./service/slack.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductLineComponent,
    ProductCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ProductService,
    SlackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

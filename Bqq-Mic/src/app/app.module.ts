import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductLineComponent } from './product-line/product-line.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductService } from "./service/product.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductLineComponent,
    ProductCategoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

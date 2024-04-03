import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data) => {
      this.popularProducts=data;
    });

    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts=data;
    });
  }
}

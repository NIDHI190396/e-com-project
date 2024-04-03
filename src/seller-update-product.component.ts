import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | Product;
  productMessage: undefined | string;

  constructor(private route: ActivatedRoute, private productService: ProductService,  private router: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId).subscribe((data) => {
      this.productData = data;
    })
  }

  submit(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Product has Updated";
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(['/seller-home']);
    }, 3000);

  }
}

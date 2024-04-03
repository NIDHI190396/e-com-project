import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit{

  addProductMessage: string | undefined;
  @ViewChild('addProduct') addProduct!: NgForm;

  constructor(private productService: ProductService, private router:Router){}
  ngOnInit(): void {

  }

  submitProduct(data: Product){
    console.log(data);
    this.productService.addProduct(data).subscribe((result) => {
      if(result){
        this.addProductMessage="Product is Successfully Added";
        this.addProduct.reset();
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
      this.router.navigate(['/seller-home']);
    }, 3000);
  }

}

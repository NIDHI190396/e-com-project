import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit{

  dataSource!: MatTableDataSource<Product>;
  productMessage: undefined | string;

  displayedColumns: string[] = ['image','name', 'price', 'color', 'category', 'description', 'action'];
  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe((result) => {
      if(result){
        this.productMessage="Product is Deleted";
        this.list();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list(){
    this.productService.productList().subscribe((result) => {
      this.dataSource = new MatTableDataSource<Product>(result);
    });
  }
}

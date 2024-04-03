import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName:string="";
  userName:string="";
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedColor: string = '';
  selectedCategory: string = '';
  searchResult:undefined|Product[];
  constructor(private route: Router, private productService:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
         // this.product.getCartList(userData.id);
        }
         else {
          this.menuType = 'default';
        }
      }
    });

    this.productService.productList().subscribe((products) => {
      this.allProducts = products;
    });
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  searchProduct(event: KeyboardEvent) {
    debugger
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProducts = this.allProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const colorMatch = !this.selectedColor || product.color === this.selectedColor;
      const categoryMatch = !this.selectedCategory || product.category === this.selectedCategory;
      return nameMatch && colorMatch && categoryMatch;
    });
  }

  // searchProduct(query:KeyboardEvent){
  //   if(query){
  //     debugger
  //     const element = query.target as HTMLInputElement;
  //     this.product.searchProduct(element.value).subscribe((result)=>{

  //       if(result.length>5){
  //         result.length=5;
  //       }
  //       this.searchResult=result;
  //     })
  //   }
  // }
  hideSearch(){
    this.searchResult=undefined
  }

  submitSearch(val:string){
    console.warn(val)
  this.route.navigate([`search/${val}`]);
  }
}

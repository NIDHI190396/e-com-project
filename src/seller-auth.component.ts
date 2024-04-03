import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit{

  constructor(private sellerService: SellerService, private router:Router){}

  showLogin = false;
  authError : string = '';

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUp(data: SignUp):void{
    this.sellerService.userSignUP(data);
  }

  login(data: SignUp):void{
    this.authError = "";
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = "Email and Password is not correct";
      }
    })
  }


  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
}

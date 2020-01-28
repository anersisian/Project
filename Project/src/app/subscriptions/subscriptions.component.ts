import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DataModelManagerService } from "../data-model-manager.service";
import { Subscriptions, User } from ".././data-model-classes";
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [DatePipe]
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: Subscriptions[];
  subscription: Subscriptions;
  users: User[];
  user: User;
  logged: Boolean;
  userId: string;
  userName: string;
  message: string;
  // myDate = new Date().toDateString();

  myDate = new Date();
  dateMain: string;
 


  
  constructor(private m: DataModelManagerService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { 
    
    this.myDate.setDate(this.myDate.getDate() + 7);

    this.dateMain = this.myDate.getDate().toString() + "/"+(this.myDate.getMonth() + 1).toString() + "/" + this.myDate.getFullYear().toString();

  }

  
  
  handler:any = null;

  ngOnInit() {
    this.m.subscriptionsGetAll().subscribe(s => (this.subscriptions = s));
    //this.m.usersGetAll().subscribe(u => (this.users = u));
    this.loadStripe();
  }

  update(_id: string, subName, subPeriod, subBoxType, subPrice, isActive){
    this.logged  = JSON.parse(localStorage.getItem("logged"));
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.userName = JSON.parse(localStorage.getItem("userName"));

  this.m.usersGetByUsername(this.userName).subscribe(u =>{
      this.user = u;
  if(this.logged === true) 
  {
    const obj = {
      _id: _id,
      subName: subName,
      subPeriod: subPeriod,
      subBoxType: subBoxType,
      subPrice: subPrice,
      isActive: isActive,
      date: this.dateMain
    };

    this.user.subscriptionInfo = [obj];
    console.log(this.user.subscriptionInfo[0].date);

    
    
    this.m.usersUpdate(this.user._id, this.user.subscriptionInfo).subscribe(u=>this.message = u.message);
    console.log(this.user.subscriptionInfo);
    console.log(this.user._id + "   " + subName);
    }else{
    this.router.navigate(["/login"]);
    }//!if
   });
}

  pay(amount, _id) {
  console.log(amount + " " + _id);
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_CsnA1j2JoAbkCVNB1gGaPNxw00DxOzthfD',
        //locale: can specify location
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token)
          //TODO: update user with subscription passed
          //alert('Token Created!!');
          //this.m.usersUpdate(this.user._id, this.user.subscriptionInfo = this.subscriptionInfo).subscribe(u => u);
        }
    });

  this.logged  = JSON.parse(localStorage.getItem("logged"));

 if(this.logged === true) 
 {
   handler.open({
     name: 'C-KIOSK',
     description: 'Checkout',
     amount: amount * 100
    });
    
  }else{
   this.router.navigate(["/login"]);
  }//!if
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_CsnA1j2JoAbkCVNB1gGaPNxw00DxOzthfD',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
            // TODO: push the subscrippiton into user subscription array
          }
        });
      }
       
      window.document.body.appendChild(s);
    }

  }

}

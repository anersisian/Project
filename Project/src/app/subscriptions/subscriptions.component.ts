import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataModelManagerService } from "../data-model-manager.service";
import { Subscriptions, User } from ".././data-model-classes";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: Subscriptions[];
  subscription: Subscriptions;
  users: User[];
  user: User;
  
  constructor(private m: DataModelManagerService, private router: Router) { }
  handler:any = null;

  ngOnInit() {
    this.m.subscriptionsGetAll().subscribe(s => (this.subscriptions = s));
    this.m.usersGetAll().subscribe(u => (this.users = u));
    this.loadStripe();
  }

  pay(amount) {

      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_CsnA1j2JoAbkCVNB1gGaPNxw00DxOzthfD',
        //locale: can specify location
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token)
          //alert('Token Created!!');
        }
  });
 if(this.m.logged === true) //checks if the user is logged in
 {
   handler.open({
     name: 'C-KIOSK',
     description: 'Checkout',
     amount: amount * 100
    });
    
  }else{
   this.router.navigate(["/login"]);//if not logged in will redirect to login page
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
            // this.m.subscriptionConfirm(this.user._id, this.user.subscriptionInfo).subscribe(u => this.message = u.message);
          }
        });
      }
       
      window.document.body.appendChild(s);
    }

  }

}

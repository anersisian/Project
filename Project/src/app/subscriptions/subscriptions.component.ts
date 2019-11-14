import { Component, OnInit } from '@angular/core';
import { DataModelManagerService } from "../data-model-manager.service";
import { Subscriptions } from ".././data-model-classes";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: Subscriptions[];
  subscription: Subscriptions;
  
  constructor(private m: DataModelManagerService) { }
  handler:any = null;
  // show: boolean = true;

  ngOnInit() {
    this.m.subscriptionsGetAll().subscribe(s => (this.subscriptions = s));
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
 
    handler.open({
      name: 'C-KIOSK',
      description: 'Checkout',
     amount: amount * 100
    });
 
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
          }
        });
      }
       
      window.document.body.appendChild(s);
    }

  }

}

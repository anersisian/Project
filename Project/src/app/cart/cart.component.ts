import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscriptions} from '../data-model-classes';
import {Item} from '../entities/subscription.entity';
import {SubscriptionService} from '../services/subscription.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

//  private items: Item[] = [];
//  private total: number = 0; //counter for selected instances of subscriptions

  constructor(
    // private activatedRoute: ActivatedRoute,
    // private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
  //   this.activatedRoute.params.subscribe(params => {
  //     var subName = params['subName'];
  //     if (subName) {
  //       var item: Item = {
  //         subscription: this.subscriptionService.find(subName),
  //         quantity: 1
  //       };
  //       if (localStorage.getItem('cart') == null) {
  //         let cart: any = [];
  //         cart.push(JSON.stringify(item));
  //         localStorage.setItem('cart', JSON.stringify(cart));
  //       } else {
  //         let cart: any = JSON.parse(localStorage.getItem('cart'));
  //         let index: number = -1;
  //         for (var i = 0; i < cart.length; i++) {
  //           let item: Item = JSON.parse(cart[i]);
  //           if (item.subscription.subName == subName) {
  //             index = i;
  //             break;
  //           }
  //         }
  //         if (index == -1) {
  //           cart.push(JSON.stringify(item));
  //           localStorage.setItem('cart', JSON.stringify(cart));
  //         } else {
  //           let item: Item = JSON.parse(cart[index]);
  //           item.quantity += 1;
  //           cart[index] = JSON.stringify(item);
  //           localStorage.setItem("cart", JSON.stringify(cart));
  //         }
  //       }
  //       this.loadCart();
  //     } else {
  //       this.loadCart();
  //     }
  //   });
  // }

  // loadCart(): void {
  //   this.total = 0;
  //   this.items = [];
  //   let cart = JSON.parse(localStorage.getItem('cart'));
  //   for (var i = 0; i < cart.length; i++) {
  //     let item = JSON.parse(cart[i]);
  //     this.items.push({
  //       subscription: item.subscription,
  //       quantity: item.quantity
  //     });
  //     this.total += item.product.price * item.quantity;
  //   }
  // }

  // remove(subName: string): void {
  //   let cart: any = JSON.parse(localStorage.getItem('cart'));
  //   let index: number = -1;
  //   for (var i = 0; i < cart.length; i++) {
  //     let item: Item = JSON.parse(cart[i]);
  //     if (item.subscription.subName == subName) {
  //       cart.splice(i, 1);
  //       break;
  //     }
  //   }
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   this.loadCart();
  // }

}}

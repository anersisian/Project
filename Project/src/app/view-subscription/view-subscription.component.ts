import { Component, OnInit } from '@angular/core';
import {DataModelManagerService} from "../data-model-manager.service";
import {Subscriptions} from "../data-model-classes";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-subscription',
  templateUrl: './view-subscription.component.html',
  styleUrls: ['./view-subscription.component.css']
})
export class ViewSubscriptionComponent implements OnInit {
  subscription: Subscriptions;

  constructor(private m: DataModelManagerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let subId = this.route.snapshot.params['_id'];
    console.log(subId);
    this.m.subGetById(subId).subscribe(s =>{
      console.log(s);
      this.subscription = s;
      this.m.subscriptions = this.subscription;
      // console.log(this.m.subscriptions);
    });
  }

}

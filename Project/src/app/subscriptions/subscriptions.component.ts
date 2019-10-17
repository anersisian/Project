import { Component, OnInit } from '@angular/core';
import { DataModelManagerService } from ".././data-model-manager.service";
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
  // show: boolean = true;

  ngOnInit() {
    this.m.subscriptionsGetAll().subscribe(s => (this.subscriptions = s));
  }

}

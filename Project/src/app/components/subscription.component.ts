import {Component, OnInit} from '@angular/core';

import {Subscriptions} from '../data-model-classes';
import {SubscriptionService} from '../services/subscription.service';

@Component({
    templateUrl: 'subscriptions.component.html'
})

export class SubscriptionComponent implements OnInit{

    private subscriptions: Subscriptions[];

    constructor(
        private subscriptionService: SubscriptionService
    ){}

    ngOnInit() {
       this.subscriptions = this.subscriptionService.findAll();
    }


}

import {Injectable} from '@angular/core';

import {Subscriptions } from '../data-model-classes';
// import { Subscriptions } from 'rxjs';

@Injectable()
export class SubscriptionService{

    private subscriptions: Subscriptions[];

    constructor(){
        this.subscriptions = [
            { subName: 'p01', subPeriod: 30, subBoxType: 'vegetables', subPrice: 15.00, isActive: true },
            { subName: 'p02', subPeriod: 7, subBoxType: 'fruits', subPrice: 15.00, isActive: true },
            { subName: 'p03', subPeriod: 7, subBoxType: 'veggies', subPrice: 20.00, isActive: true }
        ];

    }

    findAll(): Subscriptions[]{
        return this.subscriptions;
    }

    find(subName: string): Subscriptions{
        return this.subscriptions[this.getSelectedIndex(subName)];
    }

    private getSelectedIndex(subName: string){
        for (var i = 0; i < this.subscriptions.length; i++) {
            if (this.subscriptions[i].subName == subName) {
                return i;
            }
        }
        return -1;
    }


}
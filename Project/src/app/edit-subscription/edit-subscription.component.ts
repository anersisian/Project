import { Component, OnInit } from '@angular/core';
import { DataModelManagerService } from '../data-model-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Subscriptions } from '../data-model-classes';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.css']
})
export class EditSubscriptionComponent implements OnInit {

  subscription: Subscriptions;
  sub: Boolean = false;
  subError: string = "";

  constructor(private m: DataModelManagerService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    
    let _id = this.route.snapshot.params['_id'];
    console.log(_id);
    this.m.subGetById(_id).subscribe(s =>{
      this.subscription = s;
      this.subscription._id = _id;
      console.log(this.subscription._id);
      //TODO:
    });
  }


  onSubmit(): void {
   
    this.m.subscriptionsUpdate(this.subscription._id, this.subscription).subscribe(
      res => {
        this.sub = true;
        console.log(this.subscription._id);
        console.log("subscription updated");
      },
      err => {
        if(this.sub === false)
        {
          this.subError = "Failed to create a subscription";
        }
      }
    )
  }

}

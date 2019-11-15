import { Component, OnInit } from '@angular/core';
import {User} from '../data-model-classes';
import {DataModelManagerService} from '../data-model-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  // users: User[];
  user: User;

  constructor(private m: DataModelManagerService, private route: ActivatedRoute) { }

  ngOnInit() {
    let userName = this.route.snapshot.params['userName'];

    this.m.usersGetByUsername(userName).subscribe(u =>{
      this.user = u;
       if(!this.user.subscriptionInfo)
       {
         this.user.subscriptionInfo = [];
       }
       console.log(this.user.subscriptionInfo);
      this.m.user = this.user;
    });
  }

}

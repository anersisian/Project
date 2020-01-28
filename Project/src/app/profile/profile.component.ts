import { Component, OnInit } from '@angular/core';
import {User} from '../data-model-classes';
import {DataModelManagerService} from '../data-model-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  users: User[];
  user: User;

  constructor(private m: DataModelManagerService,
    private route: ActivatedRoute,
     private router: Router,
      private http: HttpClient) { }

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

  editPhone(userName){
    console.log("trying to update: ->" + userName);
    this.router.navigate(["profile/edit-phone/", userName]);
   // this.m.subscriptionUpdate(_id).subscribe();
  }
}

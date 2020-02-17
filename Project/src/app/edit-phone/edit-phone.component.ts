import { Component, OnInit } from '@angular/core';
import {User} from '../data-model-classes';
import {DataModelManagerService} from '../data-model-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.css']
})
export class EditPhoneComponent implements OnInit {
  users: User[];
  user: User;
  sub: Boolean;
  subError: string;
  phone: string;

  constructor(private m: DataModelManagerService,
    private route: ActivatedRoute,
    private router: Router,
     private http: HttpClient) { }

  ngOnInit() {
    let userName = this.route.snapshot.params['userName'];
    console.log(userName);
    this.m.usersGetByUsername(userName).subscribe(u =>{
      this.user = u});
    console.log(this.user.phoneNumber);
    // this.user.userName;
    console.log(this.user._id);
    }


    onSubmit(): void {
      
    this.m.usersUpdate(this.user._id, this.user).subscribe(
      res => {
        this.sub = true;
        console.log(this.user._id);
        console.log(this.user.phoneNumber);
        console.log("phone updated");
      },
      err => {
        if(this.sub === false)
        {
          this.subError = "Failed to update phone";
        }
      }
      )
    }
  // ngOnInit() {
    
  //   let _id = this.route.snapshot.params['_id'];
  //   console.log(_id);
  //   this.m.subGetById(_id).subscribe(s =>{
  //     this.subscription = s;
  //     this.subscription._id = _id;
  //     console.log(this.subscription._id);
  //     //TODO:
  //   });
  // }


  // onSubmit(): void {
   
  //   this.m.subscriptionsUpdate(this.subscription._id, this.subscription).subscribe(
  //     res => {
  //       this.sub = true;
  //       console.log(this.subscription._id);
  //       console.log("subscription updated");
  //     },
  //     err => {
  //       if(this.sub === false)
  //       {
  //         this.subError = "Failed to create a subscription";
  //       }
  //     }
  //   )
  // }

}

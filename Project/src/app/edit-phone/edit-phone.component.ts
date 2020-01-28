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

  }
  updatePhone(){

  }


}

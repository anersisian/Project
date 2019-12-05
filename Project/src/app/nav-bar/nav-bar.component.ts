import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataModelManagerService} from "../data-model-manager.service";
import { User } from '../data-model-classes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

//  users: User[];

  constructor(private m: DataModelManagerService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.m.usersGetAll().subscribe(u => (this.users = u));
  }

}

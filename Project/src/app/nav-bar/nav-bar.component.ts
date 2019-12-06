import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataModelManagerService} from "../data-model-manager.service";
import { User } from '../data-model-classes';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User;
  isLogged: Boolean;
  userProfile: String;
  constructor(private m: DataModelManagerService, private route: ActivatedRoute,  private a: AuthService,
    private jwtHelper: JwtHelperService,  private router: Router,) {

    this.isLogged  = JSON.parse(localStorage.getItem("logged"));

    let tokenn = localStorage.getItem('access_token');
    
    if(tokenn) {
      let tokenDecoded =  this.jwtHelper.decodeToken(tokenn);
      this.userProfile = tokenDecoded.userName;
    }
   }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataModelManagerService} from "../data-model-manager.service";
import { User } from '../data-model-classes';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';


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
    private jwtHelper: JwtHelperService,  private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');

    this.isLogged  = JSON.parse(localStorage.getItem("logged"));

    let tokenn = localStorage.getItem('access_token');
    
    if(tokenn) {
      let tokenDecoded =  this.jwtHelper.decodeToken(tokenn);
      this.userProfile = tokenDecoded.userName;
    }
   }

   useLanguage(language: string) {
    this.translate.use(language);
}

  ngOnInit() {
  }
}

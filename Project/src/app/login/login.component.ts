import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
import { DataModelManagerService } from '../data-model-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Properties
  credentials: Credentials;
  loginError: string;
  logged: Boolean = false;
  
  // Initialization

  constructor(
    private m: DataModelManagerService,
    private router: Router,
    private a: AuthService,
    private jwtHelper: JwtHelperService
  ) {

    this.loginError = ''; //error for login into account
    this.credentials = new Credentials();
    this.credentials.userName = '';
    this.credentials.password = '';

  }

  ngOnInit() {
  }

  // Methods

  onSubmit(): void {
    console.log(this.credentials);
    // Complete this method...

    // Clear the existing token
    localStorage.removeItem("access_token");

    this.a.login(this.credentials).subscribe(data => {
      // If successful...
      // Save the token in the browser's local storage
      localStorage.setItem('access_token', data.token);
      let tokenDecoded = this.jwtHelper.decodeToken(data.token);
      // Navigate to a landing/info view (home page?)
     // this.router.navigate(['/users/account', tokenDecoded.userName]);
        //changed for now ----- TODO: make it a unique user profile management page
        this.router.navigate(['/profile/', tokenDecoded.userName]);
        this.logged = true;
        localStorage.setItem("logged", JSON.stringify(this.logged));
        localStorage.setItem("userId", JSON.stringify(tokenDecoded._id));
        localStorage.setItem("userName", JSON.stringify(tokenDecoded.userName));
        console.log(tokenDecoded.userName);
         console.log(data.token);
    },
      // If not successful...
      // console.log the error
      //handle errors
      (err: HttpErrorResponse) => {
        console.log(err);
        this.loginError = "Unable to Login";
      }
    );
  }
  
}

// User name and password

export class Credentials {
  userName: string;
  password: string;
}
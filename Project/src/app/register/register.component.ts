import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  private url: string = "https://bts530-project.herokuapp.com";
  credentials: Credentials;
  register: Boolean = false;
  registerError: string;

  constructor(private http: HttpClient, private router: Router) {
    this.registerError = ""; //error for register account
    this.credentials = new Credentials();
    this.credentials.userName = "";
    this.credentials.password = "";
    this.credentials.passwordConfirm = "";
    this.credentials.fullName = "";
    this.credentials.isAdmin = false;
  }

  ngOnInit() {}

  onSubmit(): void {
    this.create(this.credentials).subscribe(
      res => {
        this.register = true;
        this.credentials.isAdmin = false;
        this.router.navigate(["/profile/", this.credentials.userName]); 
      },
      err => {
        //handle errors
        // console.log(err)
        if (this.register == false) {
          if (this.credentials.passwordConfirm != this.credentials.password) {
            this.registerError = "Passwords did not match";
          } else {
            this.registerError = "Unable to Create Account";
          }
        }
      }
    );
  }

  create(credentials: Credentials): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/users/register`,
      credentials
    );
  }
}

export class Credentials {
  userName: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
  isAdmin: boolean;
}

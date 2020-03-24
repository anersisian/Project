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

  message: Boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    
    this.registerError = ""; //error for register account
    this.credentials = new Credentials();
    this.credentials.userName = "";
    this.credentials.firstName = "";
    this.credentials.lastName = "";
    this.credentials.password = "";
    this.credentials.passwordConfirm = "";
    this.credentials.phoneNumber = "";
    this.credentials.streetName ="";
    this.credentials.streetNumber =0;
    this.credentials.unit=0;
    this.credentials.province="";
    this.credentials.country="";
    this.credentials.postalCode="";

  
    this.credentials.isAdmin = false;

  }

  ngOnInit() {}

  onSubmit(): void {
    this.create(this.credentials).subscribe(
      res => {
        this.register = true;
        this.credentials.isAdmin = false;
        this.message = true;

        setTimeout(() => {
          this.router.navigate(["/home"])
      }, 2000);

      },
      err => {
        //handle errorsc
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
  

    // sendEmail("http://localhost:3000/sendmail", user).subscribe(
  //   data => {
  //     let res:any = data; 
  //     console.log(
  //       `${user.name} Has successfully registered!`
  //     );
  //     }

  sendEmail(userName: string): Observable<Credentials> {
    return this.http.post<any>(
      `${this.url}/api/sendmail`, userName
    );
  }

    // //Users Get One
    // usersGetByUsername(userName: string): Observable<User> {
    //   return this.http.get<User>(`${this.url}/api/users/${userName}`);
    // }


  create(credentials: Credentials): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/users/register`,
      credentials
    );
  }
}

export class Credentials {
  userName: string;
   firstName : string;
  lastName : string;
   password : string;
   passwordConfirm : string;
    phoneNumber: string;
   streetName :string;
    streetNumber: number;
    unit:number;
    province:string;
   country:string;
    postalCode:string;
    isAdmin:boolean;


}

import { Component, OnInit } from '@angular/core';
import { User } from '../data-model-classes';
import { DataModelManagerService } from '../data-model-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  user: User;

  private url: string = "https://bts530-project.herokuapp.com";
  subscription: Subscription;
  sub: Boolean = false;
  subError: string;


  constructor(private m: DataModelManagerService,
     private route: ActivatedRoute,
      private router: Router,
       private http: HttpClient) {

    //safe empty state for our payload
    this.subscription = new Subscription();
    this.subscription.subName = "";
    this.subscription.subPeriod = 0;
    this.subscription.subBoxType = "";
    this.subscription.subPrice = 0;
    this.subscription.isActive = false;
  }


  ngOnInit() {
      let userName = this.route.snapshot.params['userName'];
      this.m.usersGetByUsername(userName).subscribe(u => {
        this.user = u;
        if(this.user.isAdmin === true)
        {
          console.log(this.user.isAdmin);
          this.m.usersGetAll().subscribe(u => (this.users = u));
          this.m.user = this.user;
        }else{
          this.router.navigate(["/home"]);
        }
      });
    }

    onSubmit(): void {
      this.create(this.subscription).subscribe(
        res => {
          this.sub = true;
          console.log("subscription created");
        },
        err => {
          if(this.sub === false)
          {
            this.subError = "Failed to create a subscription";
          }
        }
      )
    }

    create(subscription: Subscription): Observable<any>{
      return this.http.post<any>(`${this.url}/api/subscriptions/create`, subscription);
    }

}

export class Subscription {
  subName: string;
  subPeriod: number;
  subBoxType: string;
  subPrice: number;
  isActive: boolean;
}

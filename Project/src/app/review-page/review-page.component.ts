import { Component, OnInit } from '@angular/core';
import { DataModelManagerService } from '../data-model-manager.service';
import { User, Reviews } from '../data-model-classes';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {

  user: User;
  review: Reviews;
  private url: string = "https://bts530-project.herokuapp.com";
  sub: Boolean = false;
  subError: String;
  myDate = new Date();
  currentDate: String;
  badGood: String;


  constructor(private m: DataModelManagerService,
    private route: ActivatedRoute,
    private router: Router,
    
     private http: HttpClient) { 

          //safe empty state for our payload
    this.review = new Reviews();
    this.review.subId = "";
    this.review.userId = "";
    this.review.subName = "";
    this.review.userFullName = "";
    this.review.review = "";
    this.review.date = "";
    this.review.rating = "";

    this.currentDate = ('0' + this.myDate.getDate()).toString().slice(-2) + "/"+('0'+(this.myDate.getMonth() + 1)).toString().slice(-2) + "/" + this.myDate.getFullYear().toString();
    
  }

  ngOnInit() {
    let userName = this.route.snapshot.params["userName"];
    this.m.usersGetByUsername(userName).subscribe(u => {
      this.user = u;
     
      this.m.user = this.user;
    });
  
  }


submit(comment: String, value) : void {

  let userName = this.route.snapshot.params["userName"];
    this.m.usersGetByUsername(userName).subscribe(u => {

      this.badGood = value;

      console.log(this.badGood);
      this.user = u;
      this.m.user = this.user;

      this.review.subId = this.m.user.subscriptionInfo[0]._id;
      this.review.userId = this.m.user._id;
      this.review.subName = this.m.user.subscriptionInfo[0].subName;
      this.review.userFullName = this.m.user.firstName + " " + this.m.user.lastName;
      this.review.review = comment;
      this.review.date = this.currentDate;
      this.review.rating = value;

      this.create(this.review).subscribe(
        res => {
          this.sub = true;
          console.log("subscription created");
          this.router.navigate(["/account-page/", this.m.user.userName]);
        },
        err => {
          if(this.sub === false)
          {
            this.subError = "Failed to create a subscription";
          }
        }
      )
      this.router.navigate(["/account-page/", this.user.userName]);
    });
 
}
    create(review: Reviews): Observable<any>{
      return this.http.post<any>(`${this.url}/api/reviews/create`, review);
    }


}

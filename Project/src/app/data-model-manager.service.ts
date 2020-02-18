import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subscription } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User, Subscriptions, Reviews } from "./data-model-classes";
import { ReviewPageComponent } from './review-page/review-page.component';
@Injectable({
  providedIn: "root"
})
export class DataModelManagerService {
  constructor(private http: HttpClient) {}

  private url: string = "https://bts530-project.herokuapp.com";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  
  subscriptions: Subscriptions;
  user: User;
  reviews: Reviews; 
  logged: Boolean;

  //Users Get All
  usersGetAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/users`);
  }
  
  //Users Get One
  usersGetByUsername(userName: string): Observable<User> {
    return this.http.get<User>(`${this.url}/api/users/${userName}`);
  }

  //User Delete
  usersDelete(_id: string): Observable<any> {
    return this.http.delete(`${this.url}/api/users/${_id}/delete`, { responseType: 'text' });
  }
  
  //Users Subscription Update
  usersUpdateSubscriptionInfo(_id: string, value: any): Observable<any> {
    console.log("update called   " + value);
    return this.http.put<any>(`${this.url}/api/users/${_id}/updateSubscriptionInfo`, value, this.httpOptions)
    .pipe(tap((value: any) =>console.log({"message": "Updated subscription info"})),
    catchError(this.handleError<any>('update')));

  }

  //Users Subscription Update
  usersUpdatePastDeliveries(_id: string, value: any): Observable<any> {
    console.log("update called   " + value);
    return this.http.put<any>(`${this.url}/api/users/${_id}/updatePastDeliveries`, value, this.httpOptions)
    .pipe(tap((value: any) =>console.log({"message": "Updated past deliveries"})),
    catchError(this.handleError<any>('update')));

  }

  //userPhoneUpdate
  userPhoneUpdate(_id: string, value: any): Observable<any> {
    console.log("update called   " + value);
    return this.http.put<any>(`${this.url}/api/users/${_id}/phone`, value, this.httpOptions)
    .pipe(tap((value: any) =>console.log({"message": "Updated"})),
    catchError(this.handleError<any>('update')));
  }
  //Subscription Update
  // /api/subscriptions/:id
  subscriptionsUpdate(_id: string, value: Subscriptions): Observable<any>{
    return this.http.put<any>(`${this.url}/api/subscriptions/${_id}`, value, this.httpOptions)
    .pipe(tap((value: Subscriptions) =>console.log({"message": "Updated"})),
    catchError(this.handleError<any>('update')));
  }
  //Sub Get One
  subGetById(_id: string): Observable<Subscriptions> {
    console.log("subGetById called: " + _id);
    return this.http.get<Subscriptions>(`${this.url}/api/subscriptions/${_id}`);
  }

  //Sub Get All
  subscriptionsGetAll(): Observable<Subscriptions[]> {
    return this.http.get<Subscriptions[]>(`${this.url}/api/subscriptions`);
  }

  //Sub delete
  subscriptionDelete(_id: string): Observable<any>{
  return this.http.delete(`${this.url}/api/subscriptions/${_id}`, {responseType: 'text'});
  }

//reviews---------

//Reviews Get All
  reviewsGetAll(): Observable<Reviews[]> {
  return this.http.get<Reviews[]>(`${this.url}/api/reviews`);
}

 //Reviews Get One
 reviewsGetById(_id: string): Observable<Reviews> {
  console.log("subGetById called: " + _id);
  return this.http.get<Reviews>(`${this.url}/api/reviews/${_id}`);
}

 //Reviews Get One
 getUserReviews(_id: string): Observable<Reviews[]> {
  console.log("subGetById called: " + _id);
  return this.http.get<Reviews[]>(`${this.url}/api/reviews/find/${_id}`);
}


} //

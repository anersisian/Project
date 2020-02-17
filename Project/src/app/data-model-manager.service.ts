import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subscription } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./data-model-classes";
import {Subscriptions} from "./data-model-classes";
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
  usersUpdate(_id: string, value: any): Observable<any> {
    console.log("update called   " + value);
    return this.http.put<any>(`${this.url}/api/users/${_id}/update`, value, this.httpOptions)
    .pipe(tap((value: any) =>console.log({"message": "Updated"})),
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
  //Sub Confirm Subscription
  // subscriptionConfirm(id: string, item: Subscriptions[]): Observable<any> {
  //   return this.http.put<any>(`${this.url}/api/subscriptions/${id}/confirmed`, item, this.httpOptions)
  //     .pipe(
  //       tap((newItem: Subscriptions) => console.log({ "message": "Subscription Confirmed" })),
  //       catchError(this.handleError<any>('confirm'))
  //     );
  // }

  
} //

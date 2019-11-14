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
  logged: Boolean = false;

  //Users Get All
  usersGetAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/users`);
  }
  
  //Users Get One
  usersGetByUsername(userName: string): Observable<User> {
    return this.http.get<User>(`${this.url}/api/users/${userName}`);
  }

  //Sub Get One
  subGetById(subName: string): Observable<Subscriptions> {
    return this.http.get<Subscriptions>(`${this.url}/api/subscriptions/${subName}/find`);
  }

  subscriptionsGetAll(): Observable<Subscriptions[]> {
    return this.http.get<Subscriptions[]>(`${this.url}/api/subscriptions`);
  }

  
} //

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./data-model-classes";

@Injectable({
  providedIn: "root"
})
export class DataModelManagerService {
  constructor(private http: HttpClient) {}

  private url: string = "https://bts530-project.herokuapp.com/api";

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

  user: User;
  logged: Boolean = false;

  // Get All
  studentGetAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Get One
  studentGetById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }

  // Get One
  studentGetByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/username/${username}`);
  }
} //

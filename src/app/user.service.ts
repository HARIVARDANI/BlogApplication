import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl='https://67bf55bdb2320ee050136b4c.mockapi.io/users';

  constructor(private httpClient:HttpClient) { }

  login(email:string,password:string):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  register(newUser:{email:string;password:string}):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl,newUser);
  }

  getLoggedInUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.httpClient.get(`${this.apiUrl}/${userId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, comment); 
  }
}

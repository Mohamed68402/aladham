import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from "../models/login-response.interface";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
   baseUrl=`${environment.baseUrl}/Account/Login`;
   
   login(credentials:{email:string;password:string}):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}`, credentials);
}
}

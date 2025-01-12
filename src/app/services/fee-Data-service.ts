import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FeeDataServices {

  constructor(private http:HttpClient) { }
  getSystemCodes(){
    return this.http.get(`${environment.baseUrl}/SystemCodes/GetAllSystemCodes?typeId=15`)
  }
  getBranches(){
    return this.http.get(`${environment.baseUrl}/Branch/GetAll`)
  }
  getCustomers(){
    return this.http.get(`${environment.baseUrl}/Customer/GetAll`)
  }
}

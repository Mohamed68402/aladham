import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreatePartiesPayload } from '../models/parties-payload.interface';
import { ContractPayload, ContractResponse } from '../models/contract-payload.interface';
import { FeeContractIndividualResponse, FeeContractsOrganizationResponse } from '../models/FeeContract-resonse.inteface';
@Injectable({
  providedIn: 'root'
})
export class FeeContractsService {

  constructor(private http:HttpClient) {}
  
  FeeContractsOrganizion():Observable<FeeContractsOrganizationResponse[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<FeeContractsOrganizationResponse[]>(`${environment.baseUrl}/FeeContract/GetAllFeeContractsWithOrganization`, {
      headers,
    });
  }
  FeeContractsIndividual():Observable<FeeContractIndividualResponse[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<FeeContractIndividualResponse[]>(`${environment.baseUrl}/FeeContract/GetAllFeeContractsWithIndividual`,{headers});
  }
  sendContractData(contractData: ContractPayload): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<number>(`${environment.baseUrl}/FeeContract/CreateFeeContract`, contractData,{headers});
  }
  createParties(partiesData:CreatePartiesPayload){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.post(`${environment.baseUrl}/FeeContract/CreateParties`, partiesData,{headers});
  }


}

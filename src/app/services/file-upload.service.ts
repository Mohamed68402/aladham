import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }


  uploadFiles(feeContractId: number, files: File[]) {
    const formData = new FormData();
  
    // Append the feeContractId
  
    // Append all selected files as attachments
    files.forEach((file) => formData.append('attachments', file));
  
    // Add Authorization Header
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    // Make the POST request
    return this.http.post(
      `${environment.baseUrl}/FeeContract/UploadFeeContractAttachments?feeContractId=${feeContractId}`,
      formData,
      { headers }
    );
  }
  
}

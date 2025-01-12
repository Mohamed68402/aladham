import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router service
import { FileUploadService } from '../../../services/file-upload.service';
import { LanguageService } from '../../../services/language-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-files',
  standalone: false,
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'], // Fixed property name
})
export class UploadFilesComponent implements OnInit,OnDestroy {
  @Input() feeContractId: number | null = null; // Input from the parent component
  selectedFiles: File[] = []; // Store selected files
  currentLanguage: string = 'en'; // Default language
  isUploading = false; // Spinner visibility flag
  private subscriptions = new Subscription(); 

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router ,
    private languageService: LanguageService,
    
  ) {}
ngOnInit(): void {
  const langSubscription = this.languageService.currentLanguage$.subscribe(
    (lang) => {
      this.currentLanguage = lang;
    }
  );
  this.subscriptions.add(langSubscription);

}
  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.selectedFiles.push(input.files[i]);
      }
    }
  }

  // Remove a file
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  // Upload files to the server
  uploadFiles(): void {
    this.isUploading = true;
    if (!this.feeContractId) {
      alert('Fee Contract ID is required!');
      return;
    }

    const formData = new FormData();
    formData.append('feeContractId', this.feeContractId.toString());

    // Append all files
    this.selectedFiles.forEach((file) => {
      formData.append('attachments', file);
    });

    // Call the service to upload files
   const submit = this.fileUploadService.uploadFiles(this.feeContractId, this.selectedFiles).subscribe({
      next: (data: any) => {
        console.log('Files uploaded successfully!', data);
        this.isUploading = false
        this.selectedFiles = [];
        // Navigate to FeeComponent
        this.router.navigate(['/FeeDetails']); // Adjust the route as per your routing configuration
      },
      error: (error) => {
        console.error('Error uploading files', error);
        alert('Failed to upload files. Please try again.');
      },
    });
    this.subscriptions.add(submit);

  }
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }ngOnDestroy(): void {
    this.subscriptions.unsubscribe()

  }
}

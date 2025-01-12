import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeeContractsService } from '../../../services/fee-contracts.service';
import { FeeDataServices } from "../../../services/fee-Data-service";
import { LanguageService } from '../../../services/language-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-parties',
  standalone:false,
  templateUrl: './create-parties.component.html',
  styleUrls: ['./create-parties.component.css'],
})
export class CreatePartiesComponent implements OnInit,OnDestroy {
  @Input() feeContractId!: number; // Received fee contract ID from parent
  @Input() typeOfParties!: string; // Received type of parties (Individual/Organization)
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); // Emit when form is submitted

  createPartiesForm!: FormGroup;
  customers: { id: number; name: string }[] = []; // Customers list from backend
  currentLanguage: string = 'en'; // Default language
  backendError: string | null = null; // Store backend error for display

  private subscriptions = new Subscription(); 

  constructor(
    private fb: FormBuilder,
    private feeContractsService: FeeContractsService,
    private feeDataServices: FeeDataServices,
      private languageService: LanguageService,
  
  ) {}

  ngOnInit(): void {
    const langSubscription = this.languageService.currentLanguage$.subscribe(
      (lang) => {
        this.currentLanguage = lang;
      }
    );
    this.subscriptions.add(langSubscription);
    this.initializeForm();
    this.updateValidators();
    this.fetchCustomers(); // Fetch customers list when component initializes
  }

  // Initialize form with required controls
  initializeForm(): void {
    this.createPartiesForm = this.fb.group({
      // Common fields for both parties
      representativeName: [null, Validators.required],
      representativeIdentity: [null, Validators.required],
      representativePhone: [null, Validators.required],
  
      // Fields specific to organizations
      organizationName: [null],
      commercialRegistrationNumber: [null],
  
      // Second party field for individuals
      customerId: [null],
    });
  
    // Dynamically update validators based on the type of parties
    this.updateValidators();
  }
  

  // Fetch customers from the backend
  fetchCustomers(): void {
   const customers = this.feeDataServices.getCustomers().subscribe({
      next: (data: any) => {
        this.customers = data; // Assign fetched data to the `customers` array
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
    this.subscriptions.add(customers);

  }

  // Handle form submission
  onSubmit(): void {
    if (this.createPartiesForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare payload for submission
    const payload = this.typeOfParties === 'Individual'
    ? {
      firstParty: {
          representativeName: this.createPartiesForm.value.representativeName,
          representativeIdentity: this.createPartiesForm.value.representativeIdentity,
          representativePhone: this.createPartiesForm.value.representativePhone,
          feeContractId: this.feeContractId,
        },
        secondPartyIndividua: {
          customerId: this.createPartiesForm.value.customerId,
        },
      }
    : {
      firstParty: {
          representativeName: this.createPartiesForm.value.representativeName,
          representativeIdentity: this.createPartiesForm.value.representativeIdentity,
          representativePhone: this.createPartiesForm.value.representativePhone,
          feeContractId: this.feeContractId,
        },
        secondPartyOrganization: {
          organizationName: this.createPartiesForm.value.organizationName,
          commercialRegistrationNumber: this.createPartiesForm.value.commercialRegistrationNumber,
          representativeName: this.createPartiesForm.value.representativeName,
          representativeIdentity: this.createPartiesForm.value.representativeIdentity,
          representativePhone: this.createPartiesForm.value.representativePhone,
        },
      };
  
    // Send data to the backend
 const submit =    this.feeContractsService.createParties(payload).subscribe({
      next: (response: any) => {
        this.feeContractId = response;
        console.log('Party created successfully:', response);
        this.formSubmitted.emit();
      },
      error: (error: any) => {
        console.error('Error creating parties:', error);
        this.backendError = this.currentLanguage === 'ar'
          ? 'فشل في إنشاء الأطراف. يرجى التحقق من الإدخال وإعادة المحاولة.'
          : 'Failed to create parties. Please check the input and try again.';
        if (error.error) {
          console.error('Backend error response:', error.error); // Log full backend error details
        }
      },
    });
    this.subscriptions.add(submit)
  }
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  private updateValidators(): void {
    if (this.typeOfParties === 'Individual') {
      this.createPartiesForm.get('customerId')?.setValidators(Validators.required);
      this.createPartiesForm.get('organizationName')?.clearValidators();
      this.createPartiesForm.get('commercialRegistrationNumber')?.clearValidators();
    } else if (this.typeOfParties === 'Organization') {
      this.createPartiesForm.get('customerId')?.clearValidators();
      this.createPartiesForm.get('organizationName')?.setValidators(Validators.required);
      this.createPartiesForm.get('commercialRegistrationNumber')?.setValidators(Validators.required);
    }
  
    // Update the validity of the form controls after changing validators
    this.createPartiesForm.get('customerId')?.updateValueAndValidity();
    this.createPartiesForm.get('organizationName')?.updateValueAndValidity();
    this.createPartiesForm.get('commercialRegistrationNumber')?.updateValueAndValidity();
  }ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  
}

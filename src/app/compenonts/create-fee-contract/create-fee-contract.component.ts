import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FeeDataServices } from '../../services/fee-Data-service';
import { FeeContractsService } from '../../services/fee-contracts.service';
import { MatStepper } from '@angular/material/stepper';
import { LanguageService } from '../../services/language-service';
import moment from 'moment-hijri';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-fee-contract',
  standalone: false,
  templateUrl: './create-fee-contract.component.html',
  styleUrls: ['./create-fee-contract.component.css'],
})
export class CreateFeeContractComponent implements OnInit,OnDestroy {
  @ViewChild('stepper', { static: false }) stepper!: MatStepper;
  currentLanguage: string = 'en'; // Default language
  contractDetailsForm!: FormGroup;
  branches: any[] = [];
  feeTypes: any[] = [];
  startDateHijriControl!: FormControl;
  endDateHijriControl!: FormControl;
  hijDueDateControl = new FormControl('');
  feeContractId!: number;
  typeOfParties!: string;
  showCreateParties = false;
  stepIndex: number = 0; // Current step index
  partyCreated = false;

  private subscriptions = new Subscription(); // Container for subscriptions

  constructor(
    private fb: FormBuilder,
    private feeDataService: FeeDataServices,
    private feeContractServ: FeeContractsService,
    private languageService: LanguageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const langSubscription = this.languageService.currentLanguage$.subscribe(
      (lang) => {
        this.currentLanguage = lang;
      }
    );
    this.subscriptions.add(langSubscription);

    // Initialize form controls
    this.contractDetailsForm = this.fb.group({
      contractName: [null, [Validators.required, Validators.maxLength(100)]],
      branch: [null, Validators.required],
      startDateGregorian: [null, Validators.required],
      endDateGregorian: [null, Validators.required],
      startDateHijri: [null],
      endDateHijri: [null],
      typeOfParties: [null, Validators.required], // Added
      newFeeDetailsDtos: this.fb.array([]),
      feeDetails: this.fb.array([this.createFeeDetail()]), // Initialize with one fee detail
    });

    // Connect Hijri controls
    this.startDateHijriControl = this.contractDetailsForm.get(
      'startDateHijri'
    ) as FormControl;
    this.endDateHijriControl = this.contractDetailsForm.get(
      'endDateHijri'
    ) as FormControl;

    // Fetch data
    this.fetchBranches();
    this.fetchFeeTypes();
  }
  createFeeDetail(): FormGroup {
    return this.fb.group({
      greDueDate: [null, Validators.required],
      hijDueDate: [null, Validators.required],
      type: [null, Validators.required], // Changed from 'feeType' to 'type'
      amount: [0, [Validators.required, Validators.min(1)]],
      notes: [null, Validators.required],
    });
  }

  // Fetch branches
  fetchBranches(): void {
    const branchSubscription =this.feeDataService.getBranches().subscribe({
      next: (data: any) => (this.branches = data),
      error: (error) => console.error('Error fetching branches:', error),
    });
    this.subscriptions.add(branchSubscription);

  }

  // Fetch fee types
  fetchFeeTypes(): void {
    const feeTypeSubscription = this.feeDataService.getSystemCodes().subscribe({
      next: (data: any) => (this.feeTypes = data),
      error: (error) => console.error('Error fetching fee types:', error),
    });
    this.subscriptions.add(feeTypeSubscription);

  }

  // Handle Gregorian date changes
  onGregorianDateChange(controlName: string, event: any) {

    const feeDetailsArray = this.contractDetailsForm.get(
      'feeDetails'
    ) as FormArray;

    const gregDate = event?.value
      ? moment(event.value).format('YYYY-MM-DD')
      : null;

    // If no valid date was chosen, just return
    if (!gregDate || !moment(gregDate, 'YYYY-MM-DD', true).isValid()) {
      return;
    }

    // Convert the Gregorian date to a "hijriDate" if needed
    const hijriDate = moment(gregDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const hijriControlName = controlName.replace('Gregorian', 'Hijri');

    try {
      // Update the corresponding Hijri control if it exists
      this.contractDetailsForm.patchValue({ [hijriControlName]: hijriDate });
      const fcHijri = this.contractDetailsForm.get(hijriControlName);
      if (fcHijri) {
        fcHijri.setValue(hijriDate);
      }

      // If the control is "endDateGregorian," also update "greDueDate"
    } catch (error) {
      console.error('Error updating form control:', error);
    }
  }

  onChildHijriDateChange(controlName: string, hijriDate: string) {
    if (!hijriDate || !moment(hijriDate, 'iYYYY-iMM-iDD', true).isValid()) {
      console.error('Invalid Hijri Date:', hijriDate);
      return;
    }
    const feeDetailsArray = this.contractDetailsForm.get(
      'feeDetails'
    ) as FormArray;

    const gregDate = moment(hijriDate, 'iYYYY-iMM-iDD').format('YYYY-MM-DD');
    
    const gregControlName = controlName.replace('Hijri', 'Gregorian');

    // Patch the parent's form
    this.contractDetailsForm.patchValue({ [gregControlName]: gregDate });
  }

  // Add fee detailfeeContractServ
  addFee(): void {
    this.feeDetailsArray.push(
      this.fb.group({
        greDueDate: [null, Validators.required],
        hijDueDate: [null, Validators.required],
        type: [null, Validators.required],
        amount: [null, [Validators.required, Validators.min(0)]],
        notes: [null, Validators.required],
      })
    );
  }

  removeFee(index: number): void {
    this.feeDetailsArray.removeAt(index);
  }

  // Get fee details as FormArray
  get feeDetailsArray(): FormArray {
    return this.contractDetailsForm.get('feeDetails') as FormArray;
  }

  // Form submission
  onSubmit(): void {
    if (this.contractDetailsForm.invalid) {
      alert('Form submitted successfully!');
    }
  }
  onNext(): void {
    if (this.contractDetailsForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    const rawFormValue = this.contractDetailsForm.getRawValue(); // Includes disabled controls
    const payload = {
      contractName: rawFormValue.contractName,
      branchId: rawFormValue.branch.id,
      greStartDate: moment(rawFormValue.startDateGregorian).format(
        'YYYY-MM-DDTHH:mm:ss.SSS'
      ),
      hijStartDate: moment(rawFormValue.startDateHijri, 'YYYY-MM-DD').format(
        'iYYYY-iMM-iDD'
      ),
      greEndDate: moment(rawFormValue.endDateGregorian).format(
        'YYYY-MM-DDTHH:mm:ss.SSS'
      ),
      hijEndDate: moment(rawFormValue.endDateHijri, 'YYYY-MM-DD').format(
        'iYYYY-iMM-iDD'
      ),
      typeOfParties: rawFormValue.typeOfParties,
      newFeeDetailsDtos: Array.isArray(rawFormValue.feeDetails)
      ? rawFormValue.feeDetails.map((fee: any) => ({
          greDueDate: fee.greDueDate
            ? moment(fee.greDueDate).format('YYYY-MM-DDTHH:mm:ss.SSS')
            : null,
          hijDueDate: fee.hijDueDate
            ? moment(fee.hijDueDate, 'YYYY-MM-DD').format('iYYYY-iMM-iDD')
            : null,
          feeType: fee.type || '', // Ensure type is included, default to empty string if missing
          amount: fee.amount || 0, // Ensure amount is a number, default to 0 if missing
          notes: fee.notes || '', // Default to empty string if notes are not provided
        }))
      : [], 
    };

    const submitSubscription= this.feeContractServ.sendContractData(payload).subscribe({
      next: (response:number) => {
        this.feeContractId = response;
        this.typeOfParties = this.contractDetailsForm.value.typeOfParties;
        this.showCreateParties = true;
        this.stepper.selectedIndex = 1; // Move to the next step
      },
      error: (error) => {
        console.error('Error submitting contract:', error);
        console.error('Validation errors:', error?.error?.errors); // Log specific validation errors
        alert(
          'Failed to submit contract. Please check the input and try again.'
        );
      },
    });
    this.subscriptions.add(submitSubscription); // Track the subscription

  }
  onChildFormSubmitted(stepper: any): void {
    this.partyCreated = true; // Mark the step as completed
    this.cdr.detectChanges(); // Trigger Angular change detection immediately
    this.stepper.next()// Move to the next step

  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  navigateToFeeContract() {
    this.router.navigate(["FeeDetails"])
  }ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  onFeeGregorianDateChange(index: number, event: any): void {
    const feeDetailsArray = this.contractDetailsForm.get('feeDetails') as FormArray;
  
    const gregDate = event?.value ? moment(event.value).format('YYYY-MM-DD') : null;
  
    // If no valid date was chosen, just return
    if (!gregDate || !moment(gregDate, 'YYYY-MM-DD', true).isValid()) {
      return;
    }
  
    // Convert the Gregorian date to a Hijri date
    const hijriDate = moment(gregDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
  
    try {
      // Update the Hijri date in the FormArray
      feeDetailsArray.at(index).patchValue({ hijDueDate: hijriDate });
    } catch (error) {
      console.error('Error updating Hijri date for fee row:', error);
    }
  }
  

  onFeeHijriDateChange(index: number, hijriDate: string) {
    if (!hijriDate || !moment(hijriDate, 'iYYYY-iMM-iDD', true).isValid()) {
      console.error('Invalid Hijri Date:', hijriDate);
      return;
    }
  
    const feeDetailsArray = this.contractDetailsForm.get('feeDetails') as FormArray;
  
    // Convert Hijri date to Gregorian date
    const gregDate = moment(hijriDate, 'iYYYY-iMM-iDD').format('YYYY-MM-DD');
  
    try {
      // Update only the current fee row's Gregorian date
      feeDetailsArray.at(index).patchValue({ greDueDate: gregDate });
    } catch (error) {
      console.error('Error updating Gregorian date for fee row:', error);
    }
  }getHijDueDateControl(index: number): FormControl {
    const feeDetailsArray = this.contractDetailsForm.get('feeDetails') as FormArray;
    const feeGroup = feeDetailsArray.at(index) as FormGroup;
    return feeGroup.get('hijDueDate') as FormControl || new FormControl('');
  }
}

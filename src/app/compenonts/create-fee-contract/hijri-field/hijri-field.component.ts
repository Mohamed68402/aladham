// hijri-field.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {
  NgxAngularMaterialHijriAdapterService
} from 'ngx-angular-material-hijri-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import moment from 'moment-hijri';

@Component({
  selector: 'app-hijri-field',
  standalone:false,
  templateUrl: './hijri-field.component.html',
  styleUrls: ['./hijri-field.component.css'],
  providers: [
    { provide: DateAdapter, useClass: NgxAngularMaterialHijriAdapterService },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse:  { dateInput: 'iMM/iDD/iYYYY' },
        display: {
          dateInput: 'iMM/iDD/iYYYY',
          monthYearLabel: 'iMMMM iYYYY',
          dateA11yLabel: 'iMM/iDD/iYYYY',
          monthYearA11yLabel: 'iMMMM iYYYY',
        },
      },
    },
    { provide: MAT_DATE_LOCALE, useValue: 'ar-SA' },
  ],
})
export class HijriFieldComponent implements OnChanges {
  @Input() label: string = '';
  @Input() dateControl: FormControl = new FormControl();
  /** 
   * Emit a string version of the selected Hijri date to the parent.
   * The parent can decide how to handle it (convert to Gregorian, store it, etc.).
   */
  @Output() dateChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateControl'] && this.dateControl?.value) {
      console.log('HijriFieldComponent -> dateControl changed:', this.dateControl.value);
    }
  }

  onDateChange(event: any) {
    // event.value is typically a JS Date or Moment based on the adapter
    // Convert the selected date to a Hijri string (iYYYY-iMM-iDD)
    const hijriDateStr = moment(event.value).format('iYYYY-iMM-iDD');
    console.log('Child (Hijri) =>', hijriDateStr);
    this.dateChange.emit(hijriDateStr);
  }
}

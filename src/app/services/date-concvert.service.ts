import { Injectable } from '@angular/core';
import moment from 'moment-hijri'; 
import 'moment-hijri'; // Import Hijri extension

@Injectable({
  providedIn: 'root',
})
export class DateConvertService {
  constructor() {}

  convertToHijri(gregorianDate: string): string {
    const gregorianMoment = moment(gregorianDate);
    console.log("gregorianMoment format",gregorianMoment.format('iYYYY-iMM-iDD'))
    return gregorianMoment.format('iYYYY-iMM-iDD'); // Convert to Hijri
  }

  convertToGregorian(hijriDate: string): string {
    const hijriMoment = moment(hijriDate, 'iYYYY-iMM-iDD');
    return hijriMoment.format('YYYY-MM-DD'); // Convert to Gregorian
  }
  
}

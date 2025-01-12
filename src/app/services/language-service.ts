import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<'en' | 'ar'>(
    (localStorage.getItem('lang') as 'en' | 'ar') || 'en'
  );

  private currentDirectionSubject = new BehaviorSubject<'ltr' | 'rtl'>(
    this.currentLangSubject.value === 'ar' ? 'rtl' : 'ltr'
  );

  toggleLanguage() {
    const newLang = this.currentLangSubject.value === 'en' ? 'ar' : 'en';
    this.currentLangSubject.next(newLang);
    this.currentDirectionSubject.next(newLang === 'ar' ? 'rtl' : 'ltr');

    localStorage.setItem('lang', newLang);
  }

  get currentLanguage$() {
    return this.currentLangSubject.asObservable();
  }

  get currentDirection$() {
    return this.currentDirectionSubject.asObservable();
  }

  get currentLanguage() {
    return this.currentLangSubject.value;
  }
}

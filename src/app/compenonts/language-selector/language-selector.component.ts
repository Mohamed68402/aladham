import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  standalone: false,
  
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent implements OnInit,OnDestroy {
  currentLang: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private languageService: LanguageService) {
  }
  ngOnInit() {
    // Subscribe to updates from the service
    const langSubscription = this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.subscription.add(langSubscription);

    
  }
  toggleLanguage(e: Event) {
    e.preventDefault();
    this.languageService.toggleLanguage();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}

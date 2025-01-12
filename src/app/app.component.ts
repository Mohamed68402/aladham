import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService){}
  ngOnInit() {
    this.languageService.currentDirection$.subscribe((direction) => {
      document.body.dir = direction; // Update document direction
    });
  }
  title = 'fee-Task-Aladham';
}

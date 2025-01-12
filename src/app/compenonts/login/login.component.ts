import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from "../../models/login-response.interface";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from "../../services/language-service";
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit , OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  currentLang: string = 'en'; // Default language
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder ,private router:Router, private loginService:LoginService,private snackBar:MatSnackBar
    ,private languageService:LanguageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Subscribe to the current language observable
    const langSubscription = this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.subscription.add(langSubscription);

  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackBar.open(
        this.currentLang === 'ar' ? 'يرجى ملء النموذج بشكل صحيح.' : 'Please fill out the form correctly.',
        'Close',
        { duration: 3000 }
      );
      return;
    }
  
    this.isLoading = true; // Show loading indicator
    const credentials = this.loginForm.value;
  
    this.loginService.login(credentials).pipe(take(1)).subscribe({
      next: (response: LoginResponse) => {
        this.isLoading = false; // Hide loading indicator
        localStorage.setItem("token", response.token);
        localStorage.setItem('expiration', response.expiration);
        this.snackBar.open(
          this.currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!',
          'Close',
          { duration: 3000 }
        );
        this.router.navigate(["FeeDetails"]);
      },
      error: (error) => {
        this.isLoading = false; // Hide loading indicator
        const errorMessage = this.currentLang === 'ar' 
          ? 'فشل تسجيل الدخول. يرجى التحقق من بيانات تسجيل الدخول الخاصة بك.' 
          : 'Login failed. Please check your credentials.';
        console.error('Login failed:', error);
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { LoginComponent } from './compenonts/login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { FeeContractsComponent } from './compenonts/fee-contracts/fee-contracts.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CreateFeeContractComponent } from './compenonts/create-fee-contract/create-fee-contract.component';
import { HijriFieldComponent } from './compenonts/create-fee-contract/hijri-field/hijri-field.component';
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-datepicker';
import { CreatePartiesComponent } from './compenonts/create-fee-contract/create-parties/create-parties.component';
import { BidiModule } from '@angular/cdk/bidi';
import { LanguageSelectorComponent } from './compenonts/language-selector/language-selector.component';
import { UploadFilesComponent } from './compenonts/create-fee-contract/upload-files/upload-files.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeeContractsComponent,
    CreateFeeContractComponent, // Add here
    HijriFieldComponent,
    CreatePartiesComponent,
    LanguageSelectorComponent,
    UploadFilesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BidiModule,
    MatInputModule,
    HijriGregorianDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    RouterModule,
    MatIconModule,
    AppRoutingModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  providers: [provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

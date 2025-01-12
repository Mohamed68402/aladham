import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FeeContractsService } from '../../services/fee-contracts.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-contracts',
  standalone: false,
  
  templateUrl: './fee-contracts.component.html',
  styleUrl: './fee-contracts.component.css'
})
export class FeeContractsComponent implements OnInit {
  currentLang: string = 'en'; // Default language


  displayedColumns: string[] = [
    'contractTitle',
    'contractName',
    'branchName',
    'branchRepName',
    'startDate',
    'endDate',
    'secondPartyName',
    'secondPartyType',
    'actions' // Add actions column here
  ];
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient,private feeContractService:FeeContractsService ,private languageService: LanguageService
    ,private router : Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe((lang) => {
        this.currentLang = lang;
      }))
    this.loadFeeContractsIndividual()
 this.loadFeeContractsOrganizion()
  }

  navigateToFeeContract(): void {
    this.router.navigate(['/FeeContract']); 
  }
  
  loadFeeContractsOrganizion(): void {
    const orgSubscription = this.feeContractService.FeeContractsOrganizion().subscribe({
      next: (data) => {
        const transformedData = data.map((contract: any) => ({
          contractName: contract.contractName,
          branchName: contract.branchName,
          startDate: contract.greStartDate,
          endDate: contract.greEndDate,
          branchRepName: contract.firstPartyDtos?.[0]?.representativeName || 'N/A',
          secondPartyName: contract.secondPartyDtos?.[0]?.organizationName || 'N/A',
          secondPartyType: 'Organization',
        }));
        this.updateTableData(transformedData);
      },
      error: (error) => {
        console.error('Error fetching fee contracts:', error);
      },
    });
    this.subscriptions.add(orgSubscription);

  }



loadFeeContractsIndividual(): void {
  const indSubscription = this.feeContractService.FeeContractsIndividual().subscribe({
    next: (data) => {
      const transformedData = data.map((contract: any) => ({
        contractName: contract.contractName,
        branchName: contract.branchName,
        startDate: contract.greStartDate,
        endDate: contract.greEndDate,
        branchRepName: contract.firstPartyDtos?.[0]?.representativeName || 'N/A',
        secondPartyName: contract.secondPartyDtos?.[0]?.name || 'N/A',
        secondPartyType: 'Individual',
      }));
      this.updateTableData(transformedData);
    },
    error: (error) => {
      console.error('Error fetching fee contracts:', error);
    },
  });
  this.subscriptions.add(indSubscription);
}

updateTableData(newData: any[]): void {
  const currentData = this.dataSource.data;
  this.dataSource.data = [...currentData, ...newData];
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }logout(): void {
    localStorage.clear(); // Clear stored tokens and user data
    this.router.navigate(['/login']); // Redirect to the login page
  }
  
}

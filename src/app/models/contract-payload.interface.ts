export interface FeeDetail {
    greDueDate: string | null; // ISO 8601 formatted string
    hijDueDate: string | null; // Hijri date formatted string
    feeType: string;
    amount: number;
    notes: string;
  }
  export interface ContractPayload {
    contractName: string;
    branchId: number;
    greStartDate: string; // ISO 8601 formatted string
    hijStartDate: string; // Hijri date formatted string
    greEndDate: string; // ISO 8601 formatted string
    hijEndDate: string; // Hijri date formatted string
    typeOfParties: string;
    newFeeDetailsDtos: FeeDetail[];
  }

  export interface ContractResponse {
    feeContractId: number; // ID returned by the API
  }
  
    
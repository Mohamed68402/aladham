export interface FeeContractIndividualResponse {
    id: number;
    contractName: string;
    branchName: string;
    greStartDate: string; // ISO format string
    hijStartDate: string;
    greEndDate: string;
    hijEndDate: string;
    typeOfParties: string;
    feeDetailsDtos: {
      greDueDate: string;
      hijDueDate: string;
      feeType: string;
      amount: number;
      notes: string;
    }[];
    firstPartyDtos: {
      representativeName: string;
      representativeIdentity: string;
      representativePhone: string;
    }[] | null; // Nullable
    secondPartyDtos: {
      name: string;
      phoneNum: string;
      idNumber: string;
    }[] | null; // Nullable
  }
  

  export interface FeeContractsOrganizationResponse {
    id: number;
    contractName: string;
    branchName: string;
    greStartDate: string; // ISO format string
    hijStartDate: string;
    greEndDate: string;
    hijEndDate: string;
    feeDetailsDtos: {
      greDueDate: string;
      hijDueDate: string;
      feeType: string;
      amount: number;
      notes: string;
    }[];
    firstPartyDtos: {
      representativeName: string;
      representativeIdentity: string;
      representativePhone: string;
    }[] | null; // Nullable
    secondPartyDtos: {
      organizationName: string;
      commercialRegistrationNumber: string;
      representativeName: string;
      representativeIdentity: string;
      representativePhone: string;
    }[] | null; // Nullable
  }
  
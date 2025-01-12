export interface FirstParty {
    representativeName: string;
    representativeIdentity: string;
    representativePhone: string;
    feeContractId: number;
  }
  
  export interface SecondPartyIndividual {
    customerId: number;
  }
  
  export interface SecondPartyOrganization {
    organizationName: string;
    commercialRegistrationNumber: string;
    representativeName: string;
    representativeIdentity: string;
    representativePhone: string;
  }
  
  export interface CreatePartiesPayload {
    firstParty: FirstParty;
    secondPartyIndividual?: SecondPartyIndividual; 
    secondPartyOrganization?: SecondPartyOrganization; 
  }
  
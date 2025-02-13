import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContractsGateway {
    loading: Signal<boolean>;
    getContractList(request: ContractListRequest): Observable<ContractListResponse>;
}

export type ContractListRequest = {
    page: number;
    itemsPerPage: number;
    filters: any | undefined;
    sort:
        | {
              column: string;
              order: '' | 'asc' | 'desc';
          }
        | undefined;
};
export type ContractListResponse = {
    items: ContractOverview[];
    pageCount: number;
    totalItemsCount: number;
} | null;

export type ContractOverview = {
    contractId: string;
    contractNumber: string;
    companyName: string;
    companyBu: string;
    supplierRz: string;
    supplierCnpj: string;
    contractExpirationDateUtc: Date;
    contractExpirationDays: number;
};

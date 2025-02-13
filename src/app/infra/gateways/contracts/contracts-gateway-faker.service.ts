import { Injectable, signal, Signal } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { ContractListFaker } from '../../../../fakers/contracts/contract-list-faker';
import { ContractListRequest, ContractListResponse, ContractsGateway } from './contracts-gateway.model';

@Injectable()
export class ContractsGatewayFakerService implements ContractsGateway {
    /**
     * SIGNALS
     */
    private _loading = signal<boolean>(false);
    loading: Signal<boolean> = this._loading.asReadonly();

    /**
     * VARS
     */
    private _contractListFaker: ContractListFaker;

    constructor() {
        this._contractListFaker = new ContractListFaker();
    }

    /**
     * FUNCTIONS
     */
    getContractList(request: ContractListRequest): Observable<ContractListResponse> {
        console.log('[CONTRACTS-GATEWAY-FAKER]: calling "getContractList()" with ', request);
        this._loading.set(true);
        return this._contractListFaker.getContractList(request).pipe(
            tap(() => this._loading.set(false)),
            map((response: ContractListResponse) => {
                console.log('[CONTRACTS-GATEWAY-FAKER]: "getContractList()" returned ', response);
                return response;
            }),
            catchError((error) => {
                this._loading.set(false);
                throw error;
            }),
        );
    }
}

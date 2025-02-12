import { delay, Observable, of, throwError } from 'rxjs';
import { ContractListRequest, ContractListResponse } from '../../app/infra/gateways/contracts/contracts-gateway.model';
import { Faker } from '../_default-faker';
import { ContractListFakerData } from './contract-list-faker.data';

export class ContractListFaker extends Faker {
    getContractList(request: ContractListRequest): Observable<ContractListResponse> {
        const generateRandomness = this.randomVariables();
        // Fail the Request
        if (generateRandomness.failRequest) {
            return throwError(() => new Error('Request Failed')).pipe(delay(generateRandomness.requestTime));
        }
        return of(ContractListFakerData.getContractList(request)).pipe(delay(generateRandomness.requestTime));
    }
}

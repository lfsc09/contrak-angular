import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContractListFakerData } from '../../../../fakers/contracts/contract-list-faker.data';
import { ContractsGatewayFakerService } from './contracts-gateway-faker.service';
import { ContractListRequest } from './contracts-gateway.model';

describe('ContractsGatewayFakerService', () => {
    let service: ContractsGatewayFakerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ContractsGatewayFakerService],
        });
        service = TestBed.inject(ContractsGatewayFakerService);
        spyOn(console, 'log').and.callFake(() => {});
    });

    it('Should start service with "loading=false"', () => {
        expect(service.loading()).toBeFalse();
    });

    it('[getContractList()] Should return list of contracts overview', (done: DoneFn) => {
        const inputRequest = {
            page: 0,
            itemsPerPage: 10,
        } as ContractListRequest;
        spyOn(service['_contractListFaker'], 'getContractList').and.returnValue(of(ContractListFakerData.getContractList(inputRequest)));
        service.getContractList(inputRequest).subscribe((response) => {
            expect(service.loading()).toBeFalse();
            expect(response?.items).toBeDefined();
            expect(response?.pageCount).toBeDefined();
            expect(response?.totalItemsCount).toBeDefined();
            done();
        });
    });
});

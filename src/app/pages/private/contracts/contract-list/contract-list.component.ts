import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, InjectionToken, OnDestroy, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { map, merge, startWith, Subscription, switchMap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ContractListResponse, ContractOverview, ContractsGateway } from '../../../../infra/gateways/contracts/contracts-gateway.model';

const tokenContractsGateway = new InjectionToken<ContractsGateway>('ContractsGateway');

@Component({
    selector: 'app-contract-list',
    imports: [MatProgressBarModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe],
    providers: [
        {
            provide: tokenContractsGateway,
            useClass: environment.contractsGateway,
        },
    ],
    templateUrl: './contract-list.component.html',
    styleUrl: './contract-list.component.scss',
})
export class ContractListComponent implements AfterViewInit, OnDestroy {
    /**
     * SERVICES
     */
    protected readonly contractsGateway = inject(tokenContractsGateway);

    /**
     * SIGNALS
     */
    protected matPaginator = viewChild.required<MatPaginator>(MatPaginator);
    protected matSort = viewChild.required<MatSort>(MatSort);

    /**
     * VARS
     */
    private _contractsGatewaySubscription: Subscription | undefined;
    private _matSortSubscription: Subscription | undefined;
    protected displayedColumns = [
        'contractNumber',
        'contractType',
        'companyName',
        'companyBu',
        'supplierRz',
        'supplierCnpj',
        'contractExpirationDateUtc',
        'contractExpirationDays',
    ];
    protected items: ContractOverview[] = [];
    protected itemsTotalCount = 0;

    ngAfterViewInit(): void {
        this._matSortSubscription = this.matSort().sortChange.subscribe(() => {
            if (this.matPaginator()) this.matPaginator().pageIndex = 0;
        });

        this._contractsGatewaySubscription = merge(this.matSort().sortChange, this.matPaginator().page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.contractsGateway.getContractList({
                        page: this.matPaginator().pageIndex,
                        itemsPerPage: this.matPaginator().pageSize,
                        filters: undefined,
                        sort: {
                            column: this.matSort().active,
                            order: this.matSort().direction,
                        },
                    });
                }),
                map((response: ContractListResponse) => {
                    if (response === null) {
                        this.itemsTotalCount = 0;
                        return [];
                    }
                    this.itemsTotalCount = response.totalItemsCount;
                    return response.items;
                }),
            )
            .subscribe((items) => (this.items = items));
    }

    ngOnDestroy(): void {
        this._contractsGatewaySubscription?.unsubscribe();
        this._matSortSubscription?.unsubscribe();
    }
}

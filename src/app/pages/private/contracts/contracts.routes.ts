import { Routes } from '@angular/router';
import { titleResolver } from '../../../app.routes';
import { authorizationGuard } from '../../../infra/guards/authorization.guard';

export const contractsRoutes: Routes = [
    {
        path: '',
        data: {
            title: 'My Contracts',
            shouldRouteExec: true,
            role: 'CONTRACTS_ACCESS',
        },
        title: titleResolver,
        loadComponent: () => import('./contract-list/contract-list.component').then((module) => module.ContractListComponent),
        canMatch: [authorizationGuard],
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

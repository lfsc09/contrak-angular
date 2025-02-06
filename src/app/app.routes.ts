import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { gatekeeperGuard } from './infra/guards/gatekeeper.guard';
import { contractsRoutes } from './pages/private/contracts/contracts.routes';

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
    return `${environment.title} - ${route.data['title']}`;
};

export const routes: Routes = [
    {
        path: 'gate',
        data: {
            title: 'Gate',
        },
        title: titleResolver,
        loadComponent: () => import('./pages/public/landing/landing.component').then((m) => m.LandingComponent),
        canMatch: [gatekeeperGuard],
    },
    {
        path: 'r!',
        loadComponent: () => import('./pages/private/components/private-wrapper/private-wrapper.component').then((module) => module.PrivateWrapperComponent),
        canMatch: [gatekeeperGuard],
        children: [
            {
                path: 'contracts',
                children: contractsRoutes,
            },
            {
                path: '**',
                redirectTo: 'contracts',
                pathMatch: 'full',
            },
        ],
    },
    { path: '**', redirectTo: 'gate', pathMatch: 'full' },
];

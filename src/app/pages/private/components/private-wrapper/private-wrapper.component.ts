import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EMPTY, interval, Subscription, switchMap, takeWhile } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IdentityService } from '../../../../infra/services/identity/identity.service';
import { NavTopComponent } from '../nav-top/nav-top.component';

@Component({
    selector: 'app-private-wrapper',
    imports: [RouterOutlet, NavTopComponent],
    template: `
        <app-nav-top />
        <router-outlet />
    `,
    styles: `
        :host {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--mat-sys-background);
            color: var(--mat-sys-on-background);
        }
    `,
    // host: {
    //     '(document:keyup.Control.;)': 'navModulesService.handleOpen()',
    // },
})
export class PrivateWrapperComponent implements OnInit, OnDestroy {
    /**
     * SERVICES
     */
    // protected readonly navModulesService = inject(NavModulesService);
    private readonly _identityService = inject(IdentityService);
    private readonly _routerService = inject(Router);

    /**
     * SIGNALS AND OBSERVABLES
     */
    private _tokenExpLeftSubscription: Subscription | undefined;

    ngOnInit(): void {
        this._tokenExpLeftSubscription = this._identityService.tokenExpLeft$
            .pipe(
                switchMap((expLeft: number) => {
                    if (expLeft > 0) {
                        return interval(environment.token.interval).pipe(takeWhile(() => this._identityService.processIdentity()));
                    } else {
                        this._routerService.navigate(['/gate']);
                        return EMPTY;
                    }
                }),
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this._tokenExpLeftSubscription?.unsubscribe();
    }
}

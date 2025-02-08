import { animate, query, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IdentityService } from '../../../../infra/services/identity/identity.service';
import { NavSideService } from '../nav-side/nav-side.service';

@Component({
    selector: 'app-nav-top',
    imports: [RouterLink, AsyncPipe, CommonModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule],
    templateUrl: './nav-top.component.html',
    styleUrl: './nav-top.component.scss',
    host: {
        '[@pushDown]': '',
    },
    animations: [
        trigger('pushDown', [
            transition(':enter', [
                query('nav', [style({ transform: 'translateY(-100%)' }), animate('200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none' }))], {
                    optional: true,
                }),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavTopComponent implements OnInit, OnDestroy {
    /**
     * SERVICES
     */
    protected readonly navSideService = inject(NavSideService);
    private readonly _identityService = inject(IdentityService);
    private readonly _routerService = inject(Router);

    /**
     * SIGNALS AND OBSERVABLES
     */
    protected tokenExpLeftPercentage$ = this._identityService.tokenExpLeft$.pipe(map((value: number) => (value / environment.token.lifespan) * 100));
    protected breadcrumbs = signal<string[]>(this._urlToBreadcrumbs(this._routerService.url));
    private _routerEventSubscription: Subscription | undefined;

    ngOnInit(): void {
        this._routerEventSubscription = this._routerService.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((navigation) => {
            if (navigation instanceof NavigationEnd) {
                let segments = this._urlToBreadcrumbs(navigation.urlAfterRedirects);
                this.breadcrumbs.set(segments.length > 2 ? [segments.at(0) ?? '??', '..', segments.at(-1) ?? '??'] : segments);
            }
        });
    }

    ngOnDestroy(): void {
        this._routerEventSubscription?.unsubscribe();
    }

    /**
     * FUNCTIONS
     */
    private _urlToBreadcrumbs(url: string): string[] {
        const segments = url.split('/').filter((v) => !!v && v !== 'r!');
        if (segments.length >= 3) return [segments[0], '..', segments[segments.length - 1]];
        return segments;
    }
}

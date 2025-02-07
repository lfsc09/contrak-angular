import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavSideService } from './nav-side.service';

@Component({
    selector: 'app-nav-side',
    imports: [RouterLink, RouterLinkActive, MatSidenavModule, MatListModule, MatIcon],
    templateUrl: './nav-side.component.html',
    styleUrl: './nav-side.component.scss',
})
export class NavSideComponent implements OnInit, OnDestroy {
    /**
     * SERVICES
     */
    protected readonly navSideService = inject(NavSideService);

    /**
     * SIGNALS
     */
    private _drawerRef = viewChild<MatDrawer>('drawer');

    ngOnInit(): void {
        this.navSideService.setDrawerRef(this._drawerRef());
    }

    ngOnDestroy(): void {
        this.navSideService.setDrawerRef(undefined);
    }
}

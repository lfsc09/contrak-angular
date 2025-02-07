import { computed, inject, Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { IdentityService } from '../../../../infra/services/identity/identity.service';
import { ThemeManagerService } from '../../../../infra/services/theme/theme-manager.service';
import { NavItem } from './nav-side.model';

@Injectable({
    providedIn: 'root',
})
export class NavSideService {
    /**
     * SERVICES
     */
    private readonly _identityService = inject(IdentityService);
    private readonly _themeManagerService = inject(ThemeManagerService);

    /**
     * SIGNALS
     */
    private _drawerRef?: MatDrawer;
    mainNavItems = computed<NavItem[]>(() => {
        const nextThemeToShow = this._themeManagerService.getNextThemeInfo();
        return [
            {
                id: crypto.randomUUID(),
                icon: 'logout',
                label: 'Logout',
                class: 'nav-item-logout',
                onClick: () => this._identityService.clearAll(),
            },
            {
                id: crypto.randomUUID(),
                icon: nextThemeToShow.icon,
                label: nextThemeToShow.name === 'auto' ? 'Go auto mode' : nextThemeToShow.name === 'light' ? 'Go light mode' : 'Go dark mode',
                meta: this._themeManagerService.theme(),
                class: 'nav-item-theme',
                onClick: () => this._themeManagerService.cycleThrough(),
            },
        ];
    });
    navItems = computed<NavItem[]>(() =>
        [
            {
                id: crypto.randomUUID(),
                icon: 'dashboard',
                label: 'Home',
                route: '/r!/home',
            },
            (this._identityService.identity()?.roles.has('CONTRACTS_ACCESS') ?? false)
                ? {
                      id: crypto.randomUUID(),
                      icon: 'list',
                      label: 'Contracts',
                      route: '/r!/contracts',
                  }
                : null,
        ].filter((v) => !!v),
    );
    userInfo = computed(() => ({
        name: this._identityService.identity()?.userName ?? 'unknown',
        email: this._identityService.identity()?.userEmail ?? '--',
    }));

    /**
     * FUNCTIONS
     */
    setDrawerRef(drawerRef: MatDrawer | undefined): void {
        this._drawerRef = drawerRef;
    }

    handleCollapse(): void {
        if (this._drawerRef?.opened) this._drawerRef?.close();
        else this._drawerRef?.open();
    }
}

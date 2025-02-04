import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ThemeScheme } from './theme-manager.model';

@Injectable({
    providedIn: 'root',
})
export class ThemeManagerService {
    /**
     * SIGNALS
     */
    private _theme = signal<ThemeScheme>('auto');
    theme = this._theme.asReadonly();

    /**
     * VARS
     */
    private _themesAvailable = ['auto', 'light', 'dark'];

    constructor() {
        const themeRead = localStorage.getItem(`theme:${environment.host}`);
        if (themeRead) this._theme.set(themeRead as ThemeScheme);
    }

    getUnselectedThemes(): ThemeScheme[] {
        return this._themesAvailable.filter((theme) => theme !== this._theme()) as ThemeScheme[];
    }

    cycleThrough(): void {
        this._theme.update((previous) => {
            if (previous === 'auto') return 'light';
            if (previous === 'light') return 'dark';
            return 'auto';
        });
        localStorage.setItem(`theme:${environment.host}`, this._theme());
    }

    setTheme(theme: ThemeScheme): void {
        this._theme.set(theme);
        localStorage.setItem(`theme:${environment.host}`, theme);
    }
}

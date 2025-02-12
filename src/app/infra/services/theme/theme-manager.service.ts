import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ThemeInfo, ThemeScheme } from './theme-manager.model';

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
    private readonly _themesAvailable: ThemeInfo[] = [
        { name: 'auto', icon: 'devices' },
        { name: 'light', icon: 'light_mode' },
        { name: 'dark', icon: 'dark_mode' },
    ];

    constructor() {
        const themeRead = localStorage.getItem(`theme:${environment.host}`);
        if (themeRead) this._theme.set(themeRead as ThemeScheme);
    }

    getUnselectedThemes(): ThemeScheme[] {
        return this._themesAvailable.filter((theme) => theme.name !== this._theme()).map((theme) => theme.name) as ThemeScheme[];
    }

    getNextThemeInfo(): ThemeInfo {
        const currentThemeIndex = this._themesAvailable.findIndex((theme) => theme.name === this._theme());
        const nextThemeIndex = (currentThemeIndex + 1) % this._themesAvailable.length;
        return this._themesAvailable[nextThemeIndex];
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

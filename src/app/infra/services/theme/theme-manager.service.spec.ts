import { TestBed } from '@angular/core/testing';

import { ThemeManagerService } from './theme-manager.service';

fdescribe('ThemeManagerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThemeManagerService],
        });
    });

    it('[localStorage=null] Should start with "auto"', () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        const service = TestBed.inject(ThemeManagerService);
        expect(service.theme()).toBe('auto');
    });

    it('[localStorage!=null] Should start with localstorage saved theme', () => {
        const input = 'light';
        spyOn(localStorage, 'getItem').and.returnValue(input);
        const service = TestBed.inject(ThemeManagerService);
        expect(service.theme()).toBe(input);
    });

    it('[getUnselectedThemes()] Should return the correct unselected themes', () => {
        const service = TestBed.inject(ThemeManagerService);
        const input = 'light';
        service['_theme'].set(input);
        expect(service.getUnselectedThemes()).toEqual(['auto', 'dark']);
    });

    it('[getNextThemeInfo()] Should return the correct next theme info', () => {
        const service = TestBed.inject(ThemeManagerService);
        service['_theme'].set('light');
        expect(service.getNextThemeInfo()).toEqual({ name: 'dark', icon: 'dark_mode' });
        service['_theme'].set('dark');
        expect(service.getNextThemeInfo()).toEqual({ name: 'auto', icon: 'computer' });
        service['_theme'].set('auto');
        expect(service.getNextThemeInfo()).toEqual({ name: 'light', icon: 'light_mode' });
    });

    it('[cycleThrough()] Should run correctly setting the theme values in order', () => {
        spyOn(localStorage, 'setItem');
        const service = TestBed.inject(ThemeManagerService);
        service['_theme'].set('auto');
        service.cycleThrough();
        expect(service.theme()).toBe('light');
        expect(localStorage.setItem).toHaveBeenCalled();
        service.cycleThrough();
        expect(service.theme()).toBe('dark');
        expect(localStorage.setItem).toHaveBeenCalled();
        service.cycleThrough();
        expect(service.theme()).toBe('auto');
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('[setTheme()] Should set the theme value correctly', () => {
        spyOn(localStorage, 'setItem');
        const service = TestBed.inject(ThemeManagerService);
        const input = 'dark';
        service.setTheme(input);
        expect(service.theme()).toBe(input);
        expect(localStorage.setItem).toHaveBeenCalled();
    });
});

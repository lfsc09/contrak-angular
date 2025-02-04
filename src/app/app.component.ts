import { DOCUMENT } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeManagerService } from './infra/services/theme/theme-manager.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    template: ` <router-outlet /> `,
})
export class AppComponent {
    /**
     * SERVICES
     */
    private readonly _themeManagerService = inject(ThemeManagerService);
    private readonly _documentService = inject(DOCUMENT);

    constructor() {
        effect(() => {
            this._documentService.body.classList.remove(...this._themeManagerService.getUnselectedThemes());
            this._documentService.body.classList.add(this._themeManagerService.theme());
        });
    }
}

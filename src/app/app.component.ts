import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './pages/public/landing/landing.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LandingComponent],
    // template: ` <router-outlet /> `,
    template: ` <app-landing /> `,
})
export class AppComponent {}

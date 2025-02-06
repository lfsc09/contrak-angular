import { Component, ElementRef, inject, InjectionToken, OnDestroy, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginGateway } from '../../../infra/gateways/login/login-gateway.model';
import { KDS } from '../../../infra/util/kds.util';

const tokenLoginGateway = new InjectionToken<LoginGateway>('LoginGateway');

@Component({
    selector: 'app-landing',
    imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressBarModule, ReactiveFormsModule],
    providers: [
        {
            provide: tokenLoginGateway,
            useClass: environment.loginGateway,
        },
    ],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnDestroy {
    /**
     * SERVICES
     */
    private readonly _routerService = inject(Router);
    private readonly _formBuilderService = inject(FormBuilder);
    private readonly _loginGatewayService = inject(tokenLoginGateway);

    /**
     * SIGNALS
     */
    protected loading = signal<boolean>(false);
    protected isPasswordVisible = signal<boolean>(false);
    protected emailInputRef = viewChild<ElementRef<HTMLInputElement>>('emailInputRef');
    protected loginForm = this._formBuilderService.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    /**
     * VARS
     */
    private _loginSubscription: Subscription | undefined;

    ngOnDestroy(): void {
        this._loginSubscription?.unsubscribe();
    }

    /**
     * FUNCTIONS
     */
    protected showHidePassword(): void {
        this.isPasswordVisible.update((currState) => !currState);
    }

    protected handleLoginFormSubmit(submittedForm: any): void {
        if (this.loginForm.valid) {
            this.loading.set(true);
            this._loginSubscription = this._loginGatewayService
                .authenticate({
                    email: this.loginForm.value.email,
                    password: this.loginForm.value.password,
                    timezone: KDS.localTimezone(),
                })
                .subscribe({
                    next: (response) => {
                        if (!response) {
                            this.loading.set(false);
                            this.loginForm.reset();
                            submittedForm.resetForm();
                            this.emailInputRef()?.nativeElement.focus();
                        } else {
                            this._routerService.navigate(['/r!/contracts'], { replaceUrl: true });
                        }
                    },
                    error: (error: Error) => {
                        this.loading.set(false);
                        console.error(error.message);
                    },
                });
        } else this.loginForm.markAllAsTouched();
    }
}

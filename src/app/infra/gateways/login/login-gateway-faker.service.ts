import { inject, Injectable, signal, Signal } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { LoginFaker } from '../../../../fakers/login/login-faker';
import { AuthenticateRequest, AuthenticateResponse, LoginGateway } from './login-gateway.model';
import { IdentityService } from '../../services/identity/identity.service';

@Injectable()
export class LoginGatewayFakerService implements LoginGateway {
    /**
     * SERVICES
     */
    private readonly _identityService = inject(IdentityService);

    /**
     * SIGNALS
     */
    private _loading = signal<boolean>(false);
    loading: Signal<boolean> = this._loading.asReadonly();

    /**
     * VARS
     */
    private _loginFaker: LoginFaker;

    constructor() {
        this._loginFaker = new LoginFaker();
    }

    /**
     * FUNCTIONS
     */
    authenticate(request: AuthenticateRequest): Observable<boolean> {
        console.log('[LOGIN-GATEWAY-FAKER]: calling "authenticate()" with ', request);
        this._loading.set(true);
        return this._loginFaker.authenticate(request).pipe(
            tap(() => this._loading.set(false)),
            map((response: AuthenticateResponse) => {
                console.log('[LOGIN-GATEWAY-FAKER]: "authenticate()" returned ', response);
                return this._identityService.processIdentity(response);
            }),
            catchError((error) => {
                this._loading.set(false);
                throw error;
            }),
        );
    }
}

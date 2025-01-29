import { Injectable, signal, Signal } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { LoginFaker } from '../../../../fakers/login-faker';
import { AuthenticateRequest, AuthenticateResponse, LoginGateway } from './login-gateway.model';

@Injectable()
export class LoginGatewayFakerService implements LoginGateway {
    /**
     * SERVICES
     */
    // private readonly _tokenManagerService = inject(TokenManagerService);

    /**
     * SIGNALS
     */
    private _loading = signal<boolean>(false);
    loading: Signal<boolean> = this._loading.asReadonly();

    /**
     * VARS
     */
    private _loginFaker: LoginFaker;
    private _failRequest: boolean | undefined;

    constructor() {
        this._loginFaker = new LoginFaker();
    }

    /**
     * FUNCTIONS
     */
    authenticate(request: AuthenticateRequest): Observable<boolean> {
        console.log('[LOGIN-GATEWAY-FAKER]: calling "authenticate()" with ', request);
        this._loading.set(true);
        return this._loginFaker.authenticate(request, this._failRequest).pipe(
            tap(() => this._loading.set(false)),
            map((response: AuthenticateResponse) => {
                console.log('[LOGIN-GATEWAY-FAKER]: "authenticate()" returned ', response);
                return response !== null;
                // return this.tokenManagerService.processToken(response);
            }),
            catchError((error) => {
                this._loading.set(false);
                throw error;
            }),
        );
    }

    setFailRequest(value: boolean): void {
        this._failRequest = value;
    }
}

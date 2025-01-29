import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginGateway {
    loading: Signal<boolean>;
    authenticate(request: AuthenticateRequest): Observable<boolean>;
}

export type AuthenticateRequest = {
    email: string | null | undefined;
    password: string | null | undefined;
    timezone: string;
};
export type AuthenticateResponse = AuthUser | null;

export type AuthUser = {
    userName: string;
    userEmail: string;
    userTz: string;
    roles: string[];
    tokenExp: number;
};

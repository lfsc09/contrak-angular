import { delay, Observable, of, throwError } from 'rxjs';
import { AuthenticateRequest, AuthenticateResponse } from '../../app/infra/gateways/login/login-gateway.model';
import { Faker } from '../_default-faker';
import { LoginFakerData } from './login-faker.data';

export class LoginFaker extends Faker {
    authenticate(request: AuthenticateRequest): Observable<AuthenticateResponse> {
        const generateRandomness = this.randomVariables();
        // Fail the Request
        if (generateRandomness.failRequest) {
            return throwError(() => new Error('Request Failed')).pipe(delay(generateRandomness.requestTime));
        }
        return of(LoginFakerData.getUser(request?.email ?? '', request?.password ?? '')).pipe(delay(generateRandomness.requestTime));
    }
}

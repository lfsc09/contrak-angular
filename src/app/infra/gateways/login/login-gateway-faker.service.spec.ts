import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoginFakerData } from '../../../../fakers/login-faker.data';
import { LoginGatewayFakerService } from './login-gateway-faker.service';
import { AuthenticateRequest, AuthenticateResponse } from './login-gateway.model';

describe('LoginGatewayFakerService', () => {
    let service: LoginGatewayFakerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGatewayFakerService],
        });
        service = TestBed.inject(LoginGatewayFakerService);
    });

    it('Should start service with "loading=false"', () => {
        expect(service.loading()).toBeFalse();
    });

    it('[authenticate()] Should authenticate an user', (done: DoneFn) => {
        spyOn(service['_identityService'], 'processIdentity').and.returnValue(true);
        const user = LoginFakerData.users[0];
        spyOn(service['_loginFaker'], 'authenticate').and.returnValue(
            of({
                userName: user.name,
                userEmail: user.email,
            } as AuthenticateResponse),
        );
        service.authenticate({ email: user.email, password: user.password } as AuthenticateRequest).subscribe((response) => {
            expect(service['_identityService'].processIdentity).toHaveBeenCalled();
            expect(service.loading()).toBeFalse();
            expect(response).toBeTrue();
            done();
        });
    });

    it('[authenticate()] Should not authenticate an user', (done: DoneFn) => {
        spyOn(service['_identityService'], 'processIdentity').and.returnValue(false);
        spyOn(service['_loginFaker'], 'authenticate').and.returnValue(of({} as AuthenticateResponse));
        service.authenticate({ email: 'abc@gmail.com', password: '000000' } as AuthenticateRequest).subscribe((response) => {
            expect(service['_identityService'].processIdentity).toHaveBeenCalled();
            expect(service.loading()).toBeFalse();
            expect(response).toBeFalse();
            done();
        });
    });

    it('[authenticate()] Should not authenticate an user, an error was thrown', (done: DoneFn) => {
        spyOn(service['_identityService'], 'processIdentity');
        spyOn(service['_loginFaker'], 'authenticate').and.returnValue(throwError(() => new Error('Request Failed')));
        const user = LoginFakerData.users[0];
        service.authenticate({ email: user.email, password: user.password } as AuthenticateRequest).subscribe({
            error: (error: any) => {
                expect(service['_identityService'].processIdentity).not.toHaveBeenCalled();
                expect(service.loading()).toBeFalse();
                expect(error.message).toBe('Request Failed');
                done();
            },
        });
    });
});

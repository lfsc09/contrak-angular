import { TestBed } from '@angular/core/testing';
import { LoginFakerData } from '../../../../fakers/login-faker.data';
import { LoginGatewayFakerService } from './login-gateway-faker.service';
import { AuthenticateRequest } from './login-gateway.model';

describe('LoginGatewayFakerService', () => {
    let service: LoginGatewayFakerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGatewayFakerService],
        });
        service = TestBed.inject(LoginGatewayFakerService);
    });

    it('Should authenticate a User', (done: DoneFn) => {
        const user = LoginFakerData.users[0];
        const input = { email: user.email, password: user.password } as AuthenticateRequest;
        service.setFailRequest(false);
        service.authenticate(input).subscribe((response) => {
            expect(response).toBeTrue();
            done();
        });
    });

    it('Should not authenticate a User', (done: DoneFn) => {
        const input = { email: 'abc@gmail.com', password: '000000' } as AuthenticateRequest;
        service.setFailRequest(false);
        service.authenticate(input).subscribe((response) => {
            expect(response).toBeFalse();
            done();
        });
    });

    it('Should fail to authenticate a User', (done: DoneFn) => {
        const user = LoginFakerData.users[0];
        const input = { email: user.email, password: user.password } as AuthenticateRequest;
        service.setFailRequest(true);
        service.authenticate(input).subscribe({
            error: (error) => {
                expect(error.message).toBe('Request Failed');
                done();
            },
        });
    });
});

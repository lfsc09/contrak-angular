import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router } from '@angular/router';
import { LoginFakerData } from '../../../../fakers/login-faker.data';
import { LandingComponent } from './landing.component';

xdescribe('LandingComponent', () => {
    let component: LandingComponent;
    let fixture: ComponentFixture<LandingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LandingComponent],
            providers: [provideAnimationsAsync()],
        }).compileComponents();

        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should show password input as text', () => {
        component['isPasswordVisible'].set(true);
        fixture.detectChanges();
        const passwordInputEl: HTMLElement = fixture.nativeElement.querySelector('input[data-test-id="passwordInput"]');
        expect(passwordInputEl.getAttribute('type')).toBe('text');
    });

    it('Should show password input as password', () => {
        component['isPasswordVisible'].set(false);
        fixture.detectChanges();
        const passwordInputEl: HTMLElement = fixture.nativeElement.querySelector('input[data-test-id="passwordInput"]');
        expect(passwordInputEl.getAttribute('type')).toBe('password');
    });

    it('Should validate login form and proceed', async () => {
        const submitButton: HTMLElement = fixture.nativeElement.querySelector('.actions > button[type="submit"]');
        const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
        component['loginForm'].controls.email.setValue(LoginFakerData.users[0].email);
        component['loginForm'].controls.password.setValue(LoginFakerData.users[0].password);
        fixture.detectChanges();
        expect(component['loginForm'].valid).toBeTrue();
        submitButton.click();
        await fixture.whenStable();
        expect(navigateSpy).toHaveBeenCalled();
    });

    it('Should validade form but not proceed [Invalid user]', async () => {
        const submitButton: HTMLElement = fixture.nativeElement.querySelector('.actions > button[type="submit"]');
        const formResetSpy = spyOn(component['loginForm'], 'reset');
        component['loginForm'].controls.email.setValue('user@asd.com');
        component['loginForm'].controls.password.setValue('000000');
        fixture.detectChanges();
        expect(component['loginForm'].valid).toBeTrue();
        submitButton.click();
        await fixture.whenStable();
        expect(formResetSpy).toHaveBeenCalled();
    });

    it('Should not validade form [Invalid email]', () => {
        const submitButton: HTMLElement = fixture.nativeElement.querySelector('.actions > button[type="submit"]');
        const formMarkAllAsTouchedSpy = spyOn(component['loginForm'], 'markAllAsTouched');
        component['loginForm'].controls.email.setValue('user@');
        component['loginForm'].controls.password.setValue('000000');
        fixture.detectChanges();
        expect(component['loginForm'].valid).toBeFalse();
        submitButton.click();
        expect(formMarkAllAsTouchedSpy).toHaveBeenCalled();
    });
});

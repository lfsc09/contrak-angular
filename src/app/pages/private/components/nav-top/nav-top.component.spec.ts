import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router } from '@angular/router';
import { IdentityService } from '../../../../infra/services/identity/identity.service';
import { NavTopComponent } from './nav-top.component';

describe('NavTopComponent', () => {
    let component: NavTopComponent;
    let fixture: ComponentFixture<NavTopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavTopComponent],
            providers: [provideAnimationsAsync(), provideRouter([]), IdentityService, Router],
        }).compileComponents();

        fixture = TestBed.createComponent(NavTopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('[_urlToBreadcrumbs()] Should create correct breadcrumbes array of the url', () => {
        const id = crypto.randomUUID();
        let output = component['_urlToBreadcrumbs']('/r!/contracts');
        expect(output).toEqual(['contracts']);
        output = component['_urlToBreadcrumbs'](`/r!/contracts/${id}`);
        expect(output).toEqual(['contracts', `${id}`]);
        output = component['_urlToBreadcrumbs'](`/r!/contracts/${id}/edit`);
        expect(output).toEqual(['contracts', '..', 'edit']);
    });
});

import { TestBed } from '@angular/core/testing';
import { MatDrawer } from '@angular/material/sidenav';
import { NavSideService } from './nav-side.service';

describe('NavSideService', () => {
    let service: NavSideService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NavSideService);
    });

    it('[setDrawerRef()] Should set "drawerRef" to value', () => {
        service['_drawerRef'] = undefined;
        expect(service['_drawerRef']).toBeUndefined();
        service.setDrawerRef({} as MatDrawer);
        expect(service['_drawerRef']).not.toBeUndefined();
    });

    it('[handleCollapse()] Should handle opening the drawer correctly', () => {
        service['_drawerRef'] = {
            opened: false,
            open: () => {},
            close: () => {},
        } as MatDrawer;
        spyOn(service['_drawerRef'], 'open');
        spyOn(service['_drawerRef'], 'close');
        service.handleCollapse();
        expect(service['_drawerRef'].open).toHaveBeenCalled();
        expect(service['_drawerRef'].close).not.toHaveBeenCalled();
    });

    it('[handleCollapse()] Should handle closing the drawer correctly', () => {
        service['_drawerRef'] = {
            opened: true,
            open: () => {},
            close: () => {},
        } as MatDrawer;
        spyOn(service['_drawerRef'], 'open');
        spyOn(service['_drawerRef'], 'close');
        service.handleCollapse();
        expect(service['_drawerRef'].open).not.toHaveBeenCalled();
        expect(service['_drawerRef'].close).toHaveBeenCalled();
    });
});

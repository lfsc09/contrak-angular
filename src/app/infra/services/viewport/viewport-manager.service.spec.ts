import { TestBed } from '@angular/core/testing';

import { BreakpointObserver } from '@angular/cdk/layout';
import { viewportSizes } from './viewport-manager.model';
import { ViewportManagerService } from './viewport-manager.service';

describe('ViewportManagerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BreakpointObserver, ViewportManagerService],
        });
    });

    it('The service should set "_currentViewport" to "EXPANDED" when the breakpoint is "EXPANDED"', () => {
        spyOn<any>(TestBed.inject(BreakpointObserver), 'observe').and.returnValue({
            subscribe: (callback: (result: { breakpoints: { [key: string]: boolean } }) => void) => {
                callback({ breakpoints: { [viewportSizes.COMPACT]: false, [viewportSizes.MEDIUM]: false, [viewportSizes.EXPANDED]: true } });
            },
        });
        const service = TestBed.inject(ViewportManagerService);
        expect(service.currentViewport()).toBe('EXPANDED');
    });

    it('The service should set "_currentViewport" to "undefined" when breakpoint is empty', () => {
        spyOn<any>(TestBed.inject(BreakpointObserver), 'observe').and.returnValue({
            subscribe: (callback: (result: { breakpoints: { [key: string]: boolean } }) => void) => {
                callback({ breakpoints: {} });
            },
        });
        const service = TestBed.inject(ViewportManagerService);
        expect(service.currentViewport()).toBeUndefined();
    });

    it('The service should set "_currentViewport" to "undefined" when correct breakpoint was not found', () => {
        spyOn<any>(TestBed.inject(BreakpointObserver), 'observe').and.returnValue({
            subscribe: (callback: (result: { breakpoints: { [key: string]: boolean } }) => void) => {
                callback({ breakpoints: { [viewportSizes.COMPACT]: false, [viewportSizes.MEDIUM]: false, [viewportSizes.EXPANDED]: false } });
            },
        });
        const service = TestBed.inject(ViewportManagerService);
        expect(service.currentViewport()).toBeUndefined();
    });
});

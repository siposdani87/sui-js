import { releaseMode, setReleaseMode, coreResources } from './config';

describe('Config', () => {
    describe('releaseMode', () => {
        it('should be set to false in test environment', () => {
            // jest.setup.ts calls setReleaseMode(false)
            expect(releaseMode).toBe(false);
        });

        it('should toggle release mode', () => {
            setReleaseMode(true);
            expect(releaseMode).toBe(true);
            setReleaseMode(false);
            expect(releaseMode).toBe(false);
        });
    });

    describe('coreResources', () => {
        it('should define all core resource keys', () => {
            expect(coreResources.app).toBe('app');
            expect(coreResources.config).toBe('config');
            expect(coreResources.eventBus).toBe('eventBus');
            expect(coreResources.http).toBe('http');
            expect(coreResources.state).toBe('state');
            expect(coreResources.dom).toBe('dom');
        });

        it('should have storage resources', () => {
            expect(coreResources.cookie).toBe('cookie');
            expect(coreResources.localDepot).toBe('localDepot');
            expect(coreResources.sessionDepot).toBe('sessionDepot');
        });

        it('should have UI resources', () => {
            expect(coreResources.flash).toBe('flash');
            expect(coreResources.dialog).toBe('dialog');
            expect(coreResources.confirm).toBe('confirm');
            expect(coreResources.viewer).toBe('viewer');
            expect(coreResources.header).toBe('header');
            expect(coreResources.footer).toBe('footer');
        });
    });
});

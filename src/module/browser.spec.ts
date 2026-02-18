import { Browser } from './browser';

describe('Browser', () => {
    let browser: Browser;

    beforeEach(() => {
        browser = new Browser();
    });

    it('should be instance of Browser', () => {
        expect(browser).toBeInstanceOf(Browser);
    });

    describe('OS detection', () => {
        it('should detect an OS or null', () => {
            expect([
                null,
                'macOS',
                'iOS',
                'Windows',
                'Android',
                'Linux',
            ]).toContain(browser.os);
        });

        it('should return boolean from isMacOS', () => {
            expect(typeof browser.isMacOS()).toBe('boolean');
        });

        it('should return boolean from isIOS', () => {
            expect(typeof browser.isIOS()).toBe('boolean');
        });

        it('should return boolean from isWindows', () => {
            expect(typeof browser.isWindows()).toBe('boolean');
        });

        it('should return boolean from isAndroid', () => {
            expect(typeof browser.isAndroid()).toBe('boolean');
        });

        it('should return boolean from isLinux', () => {
            expect(typeof browser.isLinux()).toBe('boolean');
        });
    });

    describe('browser detection', () => {
        it('should have browsers object', () => {
            expect(browser.browsers).toBeDefined();
            expect(typeof browser.browsers).toBe('object');
        });

        it('should return boolean from isChrome', () => {
            expect(typeof browser.isChrome()).toBe('boolean');
        });

        it('should return boolean from isFirefox', () => {
            expect(typeof browser.isFirefox()).toBe('boolean');
        });

        it('should return boolean from isSafari', () => {
            expect(typeof browser.isSafari()).toBe('boolean');
        });

        it('should return boolean from isOpera', () => {
            expect(typeof browser.isOpera()).toBe('boolean');
        });

        it('should return boolean from isEdge', () => {
            expect(typeof browser.isEdge()).toBe('boolean');
        });

        it('should return boolean from isChromiumEdge', () => {
            expect(typeof browser.isChromiumEdge()).toBe('boolean');
        });

        it('should return boolean from isWebkit', () => {
            expect(typeof browser.isWebkit()).toBe('boolean');
        });

        it('should return boolean from isChromium', () => {
            expect(typeof browser.isChromium()).toBe('boolean');
        });

        it('should return boolean from isInternetExplorer', () => {
            expect(typeof browser.isInternetExplorer(undefined)).toBe(
                'boolean',
            );
        });

        it('should detect IE11 specifically', () => {
            expect(typeof browser.isInternetExplorer(11)).toBe('boolean');
        });

        it('should detect IE10 specifically', () => {
            expect(typeof browser.isInternetExplorer(10)).toBe('boolean');
        });

        it('should default to lteIE10 for other versions', () => {
            expect(typeof browser.isInternetExplorer(9)).toBe('boolean');
        });
    });

    describe('feature detection', () => {
        it('should have features array', () => {
            expect(Array.isArray(browser.features)).toBe(true);
        });

        it('should call detect without error', () => {
            expect(() => browser.detect()).not.toThrow();
        });

        it('should call eventMissingFeatures', () => {
            const spy = jest.spyOn(browser, 'eventMissingFeatures');
            browser.features = ['window.history'];
            browser.detect();
            expect(spy).toHaveBeenCalledWith(['window.history']);
            spy.mockRestore();
        });

        it('should not call eventMissingFeatures if no missing features', () => {
            const spy = jest.spyOn(browser, 'eventMissingFeatures');
            browser.features = [];
            browser.detect();
            expect(spy).not.toHaveBeenCalled();
            spy.mockRestore();
        });
    });
});

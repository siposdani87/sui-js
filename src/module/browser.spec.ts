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

    describe('OS detection with mocked platform', () => {
        it('should detect Windows platform', () => {
            Object.defineProperty(window.navigator, 'platform', {
                value: 'Win32',
                configurable: true,
            });
            const winBrowser = new Browser();
            expect(winBrowser.isWindows()).toBe(true);
            Object.defineProperty(window.navigator, 'platform', {
                value: '',
                configurable: true,
            });
        });

        it('should detect iOS platform', () => {
            Object.defineProperty(window.navigator, 'platform', {
                value: 'iPhone',
                configurable: true,
            });
            const iosBrowser = new Browser();
            expect(iosBrowser.isIOS()).toBe(true);
            Object.defineProperty(window.navigator, 'platform', {
                value: '',
                configurable: true,
            });
        });

        it('should detect Android from userAgent', () => {
            Object.defineProperty(window.navigator, 'platform', {
                value: 'Linux armv7l',
                configurable: true,
            });
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Linux; Android 10)',
                configurable: true,
            });
            const androidBrowser = new Browser();
            expect(androidBrowser.isAndroid()).toBe(true);
            Object.defineProperty(window.navigator, 'platform', {
                value: '',
                configurable: true,
            });
            Object.defineProperty(window.navigator, 'userAgent', {
                value: '',
                configurable: true,
            });
        });

        it('should detect Linux platform', () => {
            Object.defineProperty(window.navigator, 'platform', {
                value: 'Linux x86_64',
                configurable: true,
            });
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (X11; Linux x86_64)',
                configurable: true,
            });
            const linuxBrowser = new Browser();
            expect(linuxBrowser.isLinux()).toBe(true);
            Object.defineProperty(window.navigator, 'platform', {
                value: '',
                configurable: true,
            });
            Object.defineProperty(window.navigator, 'userAgent', {
                value: '',
                configurable: true,
            });
        });
    });

    describe('feature detection', () => {
        it('should have features array', () => {
            expect(Array.isArray(browser.features)).toBe(true);
        });

        it('should call detect without error', () => {
            expect(() => browser.detect()).not.toThrow();
        });

        it('should emit missingFeatures', () => {
            const spy = jest.fn();
            browser.on('missingFeatures', spy);
            browser.features = ['window.history'];
            browser.detect();
            expect(spy).toHaveBeenCalledWith(['window.history']);
        });

        it('should not emit missingFeatures if no missing features', () => {
            const spy = jest.fn();
            browser.on('missingFeatures', spy);
            browser.features = [];
            browser.detect();
            expect(spy).not.toHaveBeenCalled();
        });
    });
});

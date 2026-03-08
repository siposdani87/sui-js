import { Screen } from './screen';

describe('Screen', () => {
    let screen: Screen;

    beforeEach(() => {
        jest.useFakeTimers();
        screen = new Screen({ delay: 100 });
    });

    afterEach(() => {
        screen.destroy();
        jest.useRealTimers();
    });

    it('should be instance of Screen', () => {
        expect(screen).toBeInstanceOf(Screen);
    });

    it('should create with default options when no arguments passed', () => {
        const s = new Screen();
        expect(s).toBeInstanceOf(Screen);
        expect(s.options.delay).toBe(250);
        s.destroy();
    });

    it('should create with default options when undefined is passed', () => {
        const s = new Screen(undefined);
        expect(s).toBeInstanceOf(Screen);
        expect(s.options.delay).toBe(250);
        s.destroy();
    });

    describe('dimensions', () => {
        it('should return width', () => {
            expect(typeof screen.getWidth()).toBe('number');
        });

        it('should return height', () => {
            expect(typeof screen.getHeight()).toBe('number');
        });
    });

    describe('orientation', () => {
        it('should return landscape or portrait', () => {
            expect(['landscape', 'portrait']).toContain(
                screen.getOrientation(),
            );
        });

        it('should store initial orientation', () => {
            expect(['landscape', 'portrait']).toContain(screen.orientation);
        });

        it('should return landscape when width >= height', () => {
            jest.spyOn(screen, 'getWidth').mockReturnValue(1024);
            jest.spyOn(screen, 'getHeight').mockReturnValue(768);
            expect(screen.getOrientation()).toBe('landscape');
        });

        it('should return landscape when width equals height', () => {
            jest.spyOn(screen, 'getWidth').mockReturnValue(500);
            jest.spyOn(screen, 'getHeight').mockReturnValue(500);
            expect(screen.getOrientation()).toBe('landscape');
        });

        it('should return portrait when width < height', () => {
            jest.spyOn(screen, 'getWidth').mockReturnValue(768);
            jest.spyOn(screen, 'getHeight').mockReturnValue(1024);
            expect(screen.getOrientation()).toBe('portrait');
        });
    });

    describe('scroll', () => {
        it('should return scroll top as number', () => {
            expect(typeof screen.getScrollTop()).toBe('number');
        });

        it('should use documentElement.scrollTop when available', () => {
            Object.defineProperty(document.documentElement, 'scrollTop', {
                value: 150,
                configurable: true,
            });
            expect(screen.getScrollTop()).toBe(150);
            Object.defineProperty(document.documentElement, 'scrollTop', {
                value: 0,
                configurable: true,
            });
        });

        it('should fall back to body.scrollTop when documentElement.scrollTop is 0', () => {
            Object.defineProperty(document.documentElement, 'scrollTop', {
                value: 0,
                configurable: true,
            });
            Object.defineProperty(document.body, 'scrollTop', {
                value: 75,
                configurable: true,
            });
            expect(screen.getScrollTop()).toBe(75);
            Object.defineProperty(document.body, 'scrollTop', {
                value: 0,
                configurable: true,
            });
        });
    });

    describe('resize event', () => {
        it('should emit resize on window resize', () => {
            const spy = jest.fn();
            screen.on('resize', spy);
            window.dispatchEvent(new Event('resize'));
            jest.advanceTimersByTime(200);
            expect(spy).toHaveBeenCalled();
        });

        it('should pass width, height, and event to resize handler', () => {
            const spy = jest.fn();
            screen.on('resize', spy);
            window.dispatchEvent(new Event('resize'));
            jest.advanceTimersByTime(200);
            expect(spy).toHaveBeenCalledWith(
                expect.any(Number),
                expect.any(Number),
                expect.any(Event),
            );
        });

        it('should detect orientation change on resize', () => {
            const spy = jest.fn();
            screen.on('orientationChange', spy);
            const currentOrientation = screen.orientation;
            const newOrientation =
                currentOrientation === 'landscape' ? 'portrait' : 'landscape';
            jest.spyOn(screen, 'getOrientation').mockReturnValue(
                newOrientation,
            );
            window.dispatchEvent(new Event('resize'));
            jest.advanceTimersByTime(200);
            expect(spy).toHaveBeenCalledWith(
                newOrientation,
                expect.any(Number),
                expect.any(Number),
                expect.any(Event),
            );
        });

        it('should not fire orientationChange when orientation stays same', () => {
            const spy = jest.fn();
            screen.on('orientationChange', spy);
            jest.spyOn(screen, 'getOrientation').mockReturnValue(
                screen.orientation,
            );
            window.dispatchEvent(new Event('resize'));
            jest.advanceTimersByTime(200);
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('scroll event', () => {
        it('should emit scroll on window scroll', () => {
            const spy = jest.fn();
            screen.on('scroll', spy);
            window.dispatchEvent(new Event('scroll'));
            jest.advanceTimersByTime(200);
            expect(spy).toHaveBeenCalled();
        });

        it('should pass scrollTop and event to scroll handler', () => {
            const spy = jest.fn();
            screen.on('scroll', spy);
            window.dispatchEvent(new Event('scroll'));
            jest.advanceTimersByTime(200);
            expect(spy).toHaveBeenCalledWith(
                expect.any(Number),
                expect.any(Event),
            );
        });
    });

    describe('connection events', () => {
        it('should emit online on online event', () => {
            const spy = jest.fn();
            screen.on('online', spy);
            window.dispatchEvent(new Event('online'));
            expect(spy).toHaveBeenCalled();
        });

        it('should emit offline on offline event', () => {
            const spy = jest.fn();
            screen.on('offline', spy);
            window.dispatchEvent(new Event('offline'));
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('color scheme', () => {
        it('should have emit method', () => {
            expect(typeof screen.emit).toBe('function');
        });

        it('should not throw when emitting colorSchemeChange', () => {
            expect(() =>
                screen.emit('colorSchemeChange', 'dark', new Event('change')),
            ).not.toThrow();
        });

        it('should emit colorSchemeChange with dark when media query matches', () => {
            const spy = jest.fn();
            let changeHandler:
                | ((event: { matches: boolean }) => void)
                | undefined;

            const mockMatchMedia = jest.fn().mockImplementation(() => ({
                matches: false,
                addEventListener: (
                    _type: string,
                    handler: (event: { matches: boolean }) => void,
                ) => {
                    changeHandler = handler;
                },
            }));

            const originalMatchMedia = window.matchMedia;
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: mockMatchMedia,
            });

            const s = new Screen({ delay: 100 });
            s.on('colorSchemeChange', spy);

            changeHandler?.({ matches: true });
            expect(spy).toHaveBeenCalledWith(
                'dark',
                expect.objectContaining({ matches: true }),
            );

            s.destroy();
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: originalMatchMedia,
            });
        });

        it('should emit colorSchemeChange with light when media query does not match', () => {
            const spy = jest.fn();
            let changeHandler:
                | ((event: { matches: boolean }) => void)
                | undefined;

            const mockMatchMedia = jest.fn().mockImplementation(() => ({
                matches: false,
                addEventListener: (
                    _type: string,
                    handler: (event: { matches: boolean }) => void,
                ) => {
                    changeHandler = handler;
                },
            }));

            const originalMatchMedia = window.matchMedia;
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: mockMatchMedia,
            });

            const s = new Screen({ delay: 100 });
            s.on('colorSchemeChange', spy);

            changeHandler?.({ matches: false });
            expect(spy).toHaveBeenCalledWith(
                'light',
                expect.objectContaining({ matches: false }),
            );

            s.destroy();
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: originalMatchMedia,
            });
        });

        it('should not throw when matchMedia is not available', () => {
            const originalMatchMedia = window.matchMedia;
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: undefined,
            });

            expect(() => {
                const s = new Screen({ delay: 100 });
                s.destroy();
            }).not.toThrow();

            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: originalMatchMedia,
            });
        });
    });

    describe('isColorScheme', () => {
        it('should return boolean for light', () => {
            expect(typeof screen.isColorScheme('light')).toBe('boolean');
        });

        it('should return boolean for dark', () => {
            expect(typeof screen.isColorScheme('dark')).toBe('boolean');
        });

        it('should return true when matchMedia matches the given scheme', () => {
            const originalMatchMedia = window.matchMedia;
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(() => ({
                    matches: true,
                })),
            });

            expect(screen.isColorScheme('dark')).toBe(true);

            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: originalMatchMedia,
            });
        });

        it('should return false when matchMedia does not match the given scheme', () => {
            const originalMatchMedia = window.matchMedia;
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(() => ({
                    matches: false,
                })),
            });

            expect(screen.isColorScheme('dark')).toBe(false);

            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: originalMatchMedia,
            });
        });

        it('should return false when matchMedia is not available', () => {
            const originalMatchMedia = window.matchMedia;
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: undefined,
            });

            expect(screen.isColorScheme('dark')).toBe(false);

            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: originalMatchMedia,
            });
        });
    });

    describe('destroy', () => {
        it('should remove window event listeners without error', () => {
            expect(() => screen.destroy()).not.toThrow();
        });

        it('should be callable multiple times', () => {
            screen.destroy();
            expect(() => screen.destroy()).not.toThrow();
        });

        it('should stop resize events from firing', () => {
            const spy = jest.fn();
            screen.on('resize', spy);
            screen.destroy();
            window.dispatchEvent(new Event('resize'));
            jest.advanceTimersByTime(200);
            expect(spy).not.toHaveBeenCalled();
        });

        it('should stop online/offline events from firing', () => {
            const onlineSpy = jest.fn();
            const offlineSpy = jest.fn();
            screen.on('online', onlineSpy);
            screen.on('offline', offlineSpy);
            screen.destroy();
            window.dispatchEvent(new Event('online'));
            window.dispatchEvent(new Event('offline'));
            expect(onlineSpy).not.toHaveBeenCalled();
            expect(offlineSpy).not.toHaveBeenCalled();
        });
    });

    describe('emit should not throw', () => {
        it('resize', () => {
            expect(() =>
                screen.emit('resize', 100, 200, new Event('resize')),
            ).not.toThrow();
        });

        it('scroll', () => {
            expect(() =>
                screen.emit('scroll', 50, new Event('scroll')),
            ).not.toThrow();
        });

        it('online', () => {
            expect(() =>
                screen.emit('online', new Event('online')),
            ).not.toThrow();
        });

        it('offline', () => {
            expect(() =>
                screen.emit('offline', new Event('offline')),
            ).not.toThrow();
        });

        it('orientationChange', () => {
            expect(() =>
                screen.emit(
                    'orientationChange',
                    'landscape',
                    100,
                    200,
                    new Event('resize'),
                ),
            ).not.toThrow();
        });
    });
});

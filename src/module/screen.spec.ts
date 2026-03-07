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
    });

    describe('scroll', () => {
        it('should return scroll top as number', () => {
            expect(typeof screen.getScrollTop()).toBe('number');
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
    });

    describe('isColorScheme', () => {
        it('should return boolean for light', () => {
            expect(typeof screen.isColorScheme('light')).toBe('boolean');
        });

        it('should return boolean for dark', () => {
            expect(typeof screen.isColorScheme('dark')).toBe('boolean');
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

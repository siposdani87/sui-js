import { Screen } from './screen';

describe('Screen', () => {
    let screen: Screen;

    beforeEach(() => {
        screen = new Screen({ delay: 100 });
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

    describe('events', () => {
        it('should have eventResize method', () => {
            expect(typeof screen.eventResize).toBe('function');
        });

        it('should have eventScroll method', () => {
            expect(typeof screen.eventScroll).toBe('function');
        });

        it('should have eventOnline method', () => {
            expect(typeof screen.eventOnline).toBe('function');
        });

        it('should have eventOffline method', () => {
            expect(typeof screen.eventOffline).toBe('function');
        });

        it('should have eventOrientationChange method', () => {
            expect(typeof screen.eventOrientationChange).toBe('function');
        });

        it('should have eventColorSchemeChange method', () => {
            expect(typeof screen.eventColorSchemeChange).toBe('function');
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
});

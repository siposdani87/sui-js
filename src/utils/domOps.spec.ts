import {
    scrollTo,
    scrollToElement,
    scrollIntoView,
    debounce,
    copyToClipboard,
} from './domOps';

describe('domOps', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('scrollTo', () => {
        it('should call window.scrollBy during animation', () => {
            const spy = jest.spyOn(window, 'scrollBy').mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 0,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 0,
                writable: true,
                configurable: true,
            });

            scrollTo(0, 100, 100, 20);

            jest.advanceTimersByTime(20);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        it('should clear interval when target is reached', () => {
            const spy = jest.spyOn(window, 'scrollBy').mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 100,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 200,
                writable: true,
                configurable: true,
            });

            scrollTo(100, 200, 100, 20);

            jest.advanceTimersByTime(20);
            // Should clear interval since already at target
            jest.advanceTimersByTime(100);
            // scrollBy should not be called since we're at target
            expect(spy).not.toHaveBeenCalled();
            spy.mockRestore();
        });

        it('should clamp scrollStepX when overshooting positive', () => {
            const scrollBySpy = jest
                .spyOn(window, 'scrollBy')
                .mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 90,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 0,
                writable: true,
                configurable: true,
            });

            scrollTo(100, 0, 100, 20);

            jest.advanceTimersByTime(20);
            expect(scrollBySpy).toHaveBeenCalled();
            scrollBySpy.mockRestore();
        });

        it('should clamp scrollStepY when overshooting positive', () => {
            const scrollBySpy = jest
                .spyOn(window, 'scrollBy')
                .mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 0,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 90,
                writable: true,
                configurable: true,
            });

            scrollTo(0, 100, 100, 20);

            jest.advanceTimersByTime(20);
            expect(scrollBySpy).toHaveBeenCalled();
            scrollBySpy.mockRestore();
        });

        it('should clamp scrollStepX when overshooting negative', () => {
            const scrollBySpy = jest
                .spyOn(window, 'scrollBy')
                .mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 10,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 0,
                writable: true,
                configurable: true,
            });

            scrollTo(0, 0, 100, 20);

            jest.advanceTimersByTime(20);
            expect(scrollBySpy).toHaveBeenCalled();
            scrollBySpy.mockRestore();
        });

        it('should clamp scrollStepY when overshooting negative', () => {
            const scrollBySpy = jest
                .spyOn(window, 'scrollBy')
                .mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 0,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 10,
                writable: true,
                configurable: true,
            });

            scrollTo(0, 0, 100, 20);

            jest.advanceTimersByTime(20);
            expect(scrollBySpy).toHaveBeenCalled();
            scrollBySpy.mockRestore();
        });

        it('should use default duration and step', () => {
            const spy = jest.spyOn(window, 'scrollBy').mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 0,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 0,
                writable: true,
                configurable: true,
            });

            scrollTo(0, 100);

            jest.advanceTimersByTime(20);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        it('should cancel previous scroll animation', () => {
            const spy = jest.spyOn(window, 'scrollBy').mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 0,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 0,
                writable: true,
                configurable: true,
            });

            scrollTo(0, 100, 500, 20);
            scrollTo(0, 200, 500, 20);

            jest.advanceTimersByTime(500);
            spy.mockRestore();
        });
    });

    describe('scrollToElement', () => {
        it('should scroll to the element position', () => {
            const div = document.createElement('div');
            div.id = 'scroll-target';
            Object.defineProperty(div, 'offsetLeft', { value: 50 });
            Object.defineProperty(div, 'offsetTop', { value: 200 });
            document.body.appendChild(div);

            const spy = jest.spyOn(window, 'scrollBy').mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 0,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 0,
                writable: true,
                configurable: true,
            });

            scrollToElement('#scroll-target');

            jest.advanceTimersByTime(20);
            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
            document.body.removeChild(div);
        });

        it('should accept custom duration and step', () => {
            const div = document.createElement('div');
            div.id = 'scroll-target-2';
            Object.defineProperty(div, 'offsetLeft', { value: 0 });
            Object.defineProperty(div, 'offsetTop', { value: 100 });
            document.body.appendChild(div);

            const spy = jest.spyOn(window, 'scrollBy').mockImplementation();
            Object.defineProperty(window, 'scrollX', {
                value: 0,
                writable: true,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: 0,
                writable: true,
                configurable: true,
            });

            scrollToElement('#scroll-target-2', 200, 10);

            jest.advanceTimersByTime(10);
            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
            document.body.removeChild(div);
        });
    });

    describe('scrollIntoView', () => {
        it('should call scrollIntoView on the element with smooth behavior', () => {
            const div = document.createElement('div');
            div.id = 'view-target';
            const spy = jest.fn();
            div.scrollIntoView = spy;
            document.body.appendChild(div);

            scrollIntoView('#view-target');

            expect(spy).toHaveBeenCalledWith({ behavior: 'smooth' });
            document.body.removeChild(div);
        });

        it('should accept custom scroll behavior', () => {
            const div = document.createElement('div');
            div.id = 'view-target-2';
            const spy = jest.fn();
            div.scrollIntoView = spy;
            document.body.appendChild(div);

            scrollIntoView('#view-target-2', 'instant');

            expect(spy).toHaveBeenCalledWith({ behavior: 'instant' });
            document.body.removeChild(div);
        });
    });

    describe('debounce', () => {
        it('should delay function execution', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100);
            const event = new Event('input');

            debounced.call(window, event);
            expect(fn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(100);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should reset timer on subsequent calls', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100);
            const event = new Event('input');

            debounced.call(window, event);
            jest.advanceTimersByTime(50);
            debounced.call(window, event);
            jest.advanceTimersByTime(50);
            expect(fn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(50);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should use default wait of 250ms', () => {
            const fn = jest.fn();
            const debounced = debounce(fn);
            const event = new Event('input');

            debounced.call(window, event);
            jest.advanceTimersByTime(249);
            expect(fn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(1);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should fire immediately when opt_immediate is true', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100, true);
            const event = new Event('input');

            debounced.call(window, event);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should not fire again during wait when opt_immediate is true', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100, true);
            const event = new Event('input');

            debounced.call(window, event);
            debounced.call(window, event);
            expect(fn).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(100);
            // After timeout, the later function runs but opt_immediate means it won't call fn
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should allow re-firing after wait period with opt_immediate', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100, true);
            const event = new Event('input');

            debounced.call(window, event);
            expect(fn).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(100);
            debounced.call(window, event);
            expect(fn).toHaveBeenCalledTimes(2);
        });
    });

    describe('copyToClipboard', () => {
        it('should use navigator.clipboard when available', () => {
            const writeTextMock = jest.fn().mockResolvedValue(undefined);
            Object.defineProperty(navigator, 'clipboard', {
                value: { writeText: writeTextMock },
                writable: true,
                configurable: true,
            });

            copyToClipboard('test text');
            expect(writeTextMock).toHaveBeenCalledWith('test text');
        });

        it('should fall back to textarea method when clipboard API unavailable', () => {
            Object.defineProperty(navigator, 'clipboard', {
                value: undefined,
                writable: true,
                configurable: true,
            });

            document.execCommand = jest.fn().mockReturnValue(true);
            const appendSpy = jest.spyOn(document.body, 'appendChild');
            const removeSpy = jest.spyOn(document.body, 'removeChild');

            copyToClipboard('fallback text');

            expect(document.execCommand).toHaveBeenCalledWith('copy');
            expect(appendSpy).toHaveBeenCalled();
            expect(removeSpy).toHaveBeenCalled();

            const textarea = appendSpy.mock.calls[0]![0] as HTMLTextAreaElement;
            expect(textarea.value).toBe('fallback text');

            appendSpy.mockRestore();
            removeSpy.mockRestore();
        });
    });
});

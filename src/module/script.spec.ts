import { Script } from './script';
import { ProgressBar } from './progressBar';

describe('Script', () => {
    let script: Script;
    let progressBar: { show: jest.Mock; hide: jest.Mock };

    beforeEach(() => {
        progressBar = {
            show: jest.fn(),
            hide: jest.fn(),
        };
        script = new Script(progressBar as unknown as ProgressBar);
    });

    afterEach(() => {
        // Clean up any scripts added to head
        document
            .querySelectorAll('head script[id]')
            .forEach((el) => el.remove());
    });

    it('should be instance of Script', () => {
        expect(script).toBeInstanceOf(Script);
    });

    it('should reference the head element', () => {
        expect(script.head).toBeDefined();
    });

    describe('load', () => {
        it('should append a script element to head', () => {
            script.load('test-script', 'https://example.com/test.js');
            const el = document.getElementById('test-script');
            expect(el).not.toBeNull();
            expect(el!.tagName).toBe('SCRIPT');
        });

        it('should set the src attribute', () => {
            script.load('test-script', 'https://example.com/test.js');
            const el = document.getElementById(
                'test-script',
            ) as HTMLScriptElement;
            expect(el.src).toBe('https://example.com/test.js');
        });

        it('should call progressBar.show', () => {
            script.load('test-script', 'https://example.com/test.js');
            expect(progressBar.show).toHaveBeenCalled();
        });

        it('should set async attribute when opt_async is true', () => {
            script.load(
                'test-script',
                'https://example.com/test.js',
                undefined,
                true,
            );
            const el = document.getElementById('test-script');
            expect(el!.hasAttribute('async')).toBe(true);
        });

        it('should set defer attribute when opt_defer is true', () => {
            script.load(
                'test-script',
                'https://example.com/test.js',
                undefined,
                false,
                true,
            );
            const el = document.getElementById('test-script');
            expect(el!.hasAttribute('defer')).toBe(true);
        });

        it('should append query params to URL', () => {
            script.load('test-script', 'https://example.com/test.js', {
                key: 'abc',
            });
            const el = document.getElementById(
                'test-script',
            ) as HTMLScriptElement;
            expect(el.src).toContain('key=abc');
        });

        it('should not duplicate script with same id', () => {
            script.load('test-script', 'https://example.com/test.js');
            script.load('test-script', 'https://example.com/test2.js');
            const scripts = document.querySelectorAll('#test-script');
            expect(scripts.length).toBe(1);
        });

        it('should call progressBar.hide for duplicate script', () => {
            script.load('test-script', 'https://example.com/test.js');
            progressBar.hide.mockClear();
            script.load('test-script', 'https://example.com/test2.js');
            expect(progressBar.hide).toHaveBeenCalled();
        });

        it('should call progressBar.hide on load event', () => {
            script.load('test-script', 'https://example.com/test.js');
            const el = document.getElementById(
                'test-script',
            ) as HTMLScriptElement;
            progressBar.hide.mockClear();
            if (el.onload) {
                (el.onload as Function)(new Event('load'));
            }
            expect(progressBar.hide).toHaveBeenCalled();
        });

        it('should call progressBar.hide on error event', () => {
            script.load('test-script', 'https://example.com/test.js');
            const el = document.getElementById(
                'test-script',
            ) as HTMLScriptElement;
            progressBar.hide.mockClear();
            if (el.onerror) {
                (el.onerror as Function)(new Event('error'));
            }
            expect(progressBar.hide).toHaveBeenCalled();
        });
    });

    describe('remove', () => {
        it('should remove existing script by id', () => {
            script.load('test-script', 'https://example.com/test.js');
            expect(document.getElementById('test-script')).not.toBeNull();
            script.remove('test-script');
            expect(document.getElementById('test-script')).toBeNull();
        });

        it('should not throw when removing non-existent script', () => {
            expect(() => script.remove('nonexistent')).not.toThrow();
        });
    });
});

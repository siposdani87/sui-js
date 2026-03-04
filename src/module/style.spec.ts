import { Style } from './style';
import { ProgressBar } from './progressBar';

describe('Style', () => {
    let style: Style;
    let progressBar: { show: jest.Mock; hide: jest.Mock };

    beforeEach(() => {
        progressBar = {
            show: jest.fn(),
            hide: jest.fn(),
        };
        style = new Style(progressBar as unknown as ProgressBar);
    });

    afterEach(() => {
        document.querySelectorAll('head link[id]').forEach((el) => el.remove());
    });

    it('should be instance of Style', () => {
        expect(style).toBeInstanceOf(Style);
    });

    it('should reference the head element', () => {
        expect(style.head).toBeDefined();
    });

    describe('load', () => {
        it('should append a link element to head', () => {
            style.load('test-style', 'https://example.com/test.css');
            const el = document.getElementById('test-style');
            expect(el).not.toBeNull();
            expect(el!.tagName).toBe('LINK');
        });

        it('should set href attribute', () => {
            style.load('test-style', 'https://example.com/test.css');
            const el = document.getElementById('test-style') as HTMLLinkElement;
            expect(el.href).toBe('https://example.com/test.css');
        });

        it('should set default rel and media attributes', () => {
            style.load('test-style', 'https://example.com/test.css');
            const el = document.getElementById('test-style') as HTMLLinkElement;
            expect(el.rel).toBe('stylesheet');
            expect(el.media).toBe('all');
        });

        it('should set custom rel and media', () => {
            style.load(
                'test-style',
                'https://example.com/test.css',
                undefined,
                'prefetch',
                'print',
            );
            const el = document.getElementById('test-style') as HTMLLinkElement;
            expect(el.rel).toBe('prefetch');
            expect(el.media).toBe('print');
        });

        it('should call progressBar.show', () => {
            style.load('test-style', 'https://example.com/test.css');
            expect(progressBar.show).toHaveBeenCalled();
        });

        it('should append query params to URL', () => {
            style.load('test-style', 'https://example.com/test.css', {
                v: '2',
            });
            const el = document.getElementById('test-style') as HTMLLinkElement;
            expect(el.href).toContain('v=2');
        });

        it('should not duplicate link with same id', () => {
            style.load('test-style', 'https://example.com/test.css');
            style.load('test-style', 'https://example.com/test2.css');
            const links = document.querySelectorAll('#test-style');
            expect(links.length).toBe(1);
        });

        it('should call progressBar.hide for duplicate', () => {
            style.load('test-style', 'https://example.com/test.css');
            progressBar.hide.mockClear();
            style.load('test-style', 'https://example.com/test2.css');
            expect(progressBar.hide).toHaveBeenCalled();
        });

        it('should call progressBar.hide on load event', () => {
            style.load('test-style', 'https://example.com/test.css');
            const el = document.getElementById('test-style') as HTMLLinkElement;
            progressBar.hide.mockClear();
            if (el.onload) {
                (el.onload as Function)(new Event('load'));
            }
            expect(progressBar.hide).toHaveBeenCalled();
        });

        it('should call progressBar.hide on error event', () => {
            style.load('test-style', 'https://example.com/test.css');
            const el = document.getElementById('test-style') as HTMLLinkElement;
            progressBar.hide.mockClear();
            if (el.onerror) {
                (el.onerror as Function)(new Event('error'));
            }
            expect(progressBar.hide).toHaveBeenCalled();
        });
    });

    describe('remove', () => {
        it('should remove existing link by id', () => {
            style.load('test-style', 'https://example.com/test.css');
            expect(document.getElementById('test-style')).not.toBeNull();
            style.remove('test-style');
            expect(document.getElementById('test-style')).toBeNull();
        });

        it('should not throw when removing non-existent link', () => {
            expect(() => style.remove('nonexistent')).not.toThrow();
        });
    });
});

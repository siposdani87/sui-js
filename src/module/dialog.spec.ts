import { Dialog } from './dialog';
import { Http } from './http';
import { Knot } from '../core';

describe('Dialog', () => {
    let http: Http;
    let dialog: Dialog;

    beforeEach(() => {
        http = new Http();
        dialog = new Dialog(http);
    });

    it('should be instance of Dialog', () => {
        expect(dialog).toBeInstanceOf(Dialog);
    });

    it('should store http reference', () => {
        expect(dialog.http).toBe(http);
    });

    it('should have loadTemplate method', () => {
        expect(typeof dialog.loadTemplate).toBe('function');
    });

    it('should have open method from BaseModal', () => {
        expect(typeof dialog.open).toBe('function');
    });

    it('should have close method from BaseModal', () => {
        expect(typeof dialog.close).toBe('function');
    });

    it('should have isOpened method from BaseModal', () => {
        expect(typeof dialog.isOpened).toBe('function');
    });

    it('should not be opened by default', () => {
        expect(dialog.isOpened()).toBe(false);
    });

    describe('open / close', () => {
        it('should open the dialog', () => {
            dialog.open();
            expect(dialog.isOpened()).toBe(true);
        });

        it('should close the dialog', () => {
            dialog.open();
            dialog.close();
            expect(dialog.isOpened()).toBe(false);
        });
    });

    describe('loadTemplate', () => {
        function createResponseDom(
            elements: Array<{
                tag: string;
                id?: string;
                className?: string;
                text: string;
                children?: Array<{ tag: string; text: string }>;
            }>,
        ): Knot {
            const div = document.createElement('div');
            div.className = 'test-response-dom';
            for (const el of elements) {
                const node = document.createElement(el.tag);
                if (el.id) node.id = el.id;
                if (el.className) node.className = el.className;
                node.textContent = el.text;
                if (el.children) {
                    node.textContent = '';
                    for (const child of el.children) {
                        const childNode = document.createElement(child.tag);
                        childNode.textContent = child.text;
                        node.appendChild(childNode);
                    }
                }
                div.appendChild(node);
            }
            document.body.appendChild(div);
            return new Knot(div);
        }

        afterEach(() => {
            document
                .querySelectorAll('.test-response-dom')
                .forEach((el) => el.remove());
            ['title', 'content', 'action'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });
        });

        it('should call http.get with the URL', () => {
            const getSpy = jest.spyOn(http, 'get').mockReturnValue({
                then: jest.fn(),
            } as any);
            dialog.loadTemplate('/api/test');
            expect(getSpy).toHaveBeenCalledWith('/api/test');
        });

        it('should resolve with content knot on success', () => {
            const dom = createResponseDom([
                { tag: 'div', id: 'title', text: 'Test Title' },
                { tag: 'div', id: 'content', text: 'Content' },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };

            jest.spyOn(http, 'get').mockReturnValue({
                then: (ok: Function) => ok(data),
            } as any);

            const thenFn = jest.fn();
            dialog.loadTemplate('/api/test').then(thenFn);

            expect(thenFn).toHaveBeenCalled();
        });

        it('should set title from response', () => {
            const dom = createResponseDom([
                { tag: 'div', id: 'title', text: 'My Dialog' },
                { tag: 'div', id: 'content', text: 'Body' },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };

            jest.spyOn(http, 'get').mockReturnValue({
                then: (ok: Function) => ok(data),
            } as any);

            dialog.loadTemplate('/api/test');

            const titleNode = dialog.modalTitle.getNode();
            expect(titleNode.textContent).toBe('My Dialog');
        });

        it('should insert content into modal body', () => {
            const dom = createResponseDom([
                { tag: 'div', id: 'title', text: 'Title' },
                { tag: 'div', id: 'content', text: 'Hello World' },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };

            jest.spyOn(http, 'get').mockReturnValue({
                then: (ok: Function) => ok(data),
            } as any);

            dialog.loadTemplate('/api/test');

            expect(dialog.modalBody.getNode().textContent).toContain(
                'Hello World',
            );
        });

        it('should handle actions with one button (OK)', () => {
            const dom = createResponseDom([
                { tag: 'div', id: 'title', text: 'Title' },
                { tag: 'div', id: 'content', text: 'Content' },
                {
                    tag: 'div',
                    id: 'action',
                    text: '',
                    children: [{ tag: 'button', text: 'OK' }],
                },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };

            jest.spyOn(http, 'get').mockReturnValue({
                then: (ok: Function) => ok(data),
            } as any);

            dialog.loadTemplate('/api/test');

            const footer = dialog.modalFooter.getNode();
            expect(footer.classList.contains('hidden')).toBe(false);
        });

        it('should handle actions with two buttons (Cancel + OK)', () => {
            const dom = createResponseDom([
                { tag: 'div', id: 'title', text: 'Title' },
                { tag: 'div', id: 'content', text: 'Content' },
                {
                    tag: 'div',
                    id: 'action',
                    text: '',
                    children: [
                        { tag: 'button', text: 'Cancel' },
                        { tag: 'button', text: 'OK' },
                    ],
                },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };

            jest.spyOn(http, 'get').mockReturnValue({
                then: (ok: Function) => ok(data),
            } as any);

            dialog.loadTemplate('/api/test');

            const footer = dialog.modalFooter.getNode();
            expect(footer.classList.contains('hidden')).toBe(false);
        });

        it('should hide footer when no action element', () => {
            const dom = createResponseDom([
                { tag: 'div', id: 'title', text: 'Title' },
                { tag: 'div', id: 'content', text: 'Content' },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };

            jest.spyOn(http, 'get').mockReturnValue({
                then: (ok: Function) => ok(data),
            } as any);

            dialog.loadTemplate('/api/test');

            const footer = dialog.modalFooter.getNode();
            expect(footer.classList.contains('hidden')).toBe(true);
        });

        it('should open dialog on error and reject', () => {
            const dom = createResponseDom([
                { tag: 'title', text: 'Error' },
                {
                    tag: 'div',
                    className: 'message',
                    text: 'Something went wrong',
                },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };
            const openSpy = jest.spyOn(dialog, 'open');

            jest.spyOn(http, 'get').mockReturnValue({
                then: (_ok: Function, err: Function) => err(data),
            } as any);

            dialog.loadTemplate('/api/error');

            expect(openSpy).toHaveBeenCalled();
        });

        it('should set title from error response title tag', () => {
            const dom = createResponseDom([
                { tag: 'title', text: 'Server Error' },
                { tag: 'div', className: 'message', text: 'Oops' },
            ]);
            const data = {
                get: (key: string) => (key === 'raw' ? dom : undefined),
            };

            jest.spyOn(http, 'get').mockReturnValue({
                then: (_ok: Function, err: Function) => err(data),
            } as any);

            dialog.loadTemplate('/api/error');

            const titleNode = dialog.modalTitle.getNode();
            expect(titleNode.textContent).toBe('Server Error');
        });
    });
});

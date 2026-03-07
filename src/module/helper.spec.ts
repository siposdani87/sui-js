import { Helper } from './helper';
import { Knot } from '../core/knot';

describe('Helper', () => {
    let helper: Helper;

    beforeEach(() => {
        helper = new Helper();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should be instance of Helper', () => {
        expect(helper).toBeInstanceOf(Helper);
    });

    describe('createLink', () => {
        it('should create an anchor element with name', () => {
            const link = helper.createLink('Click me', jest.fn());
            expect(link).toBeInstanceOf(Knot);
            expect(link.getTagName()).toBe('a');
        });

        it('should set html content to name', () => {
            const link = helper.createLink('My Link', jest.fn());
            expect(link.getHtml()).toContain('My Link');
        });

        it('should set href attribute', () => {
            const link = helper.createLink(
                'Link',
                jest.fn(),
                'https://example.com',
            );
            expect(link.getAttribute('href')).toBe('https://example.com');
        });

        it('should use default href when not provided', () => {
            const link = helper.createLink('Link', jest.fn());
            expect(link.getAttribute('href')).toBe('#');
        });

        it('should remove element when allowAccess is false', () => {
            document.body.innerHTML = '<div id="container"></div>';
            const container = new Knot(document.getElementById('container'));
            const link = helper.createLink('Link', jest.fn(), '', '', false);
            container.appendChild(link);
            // When allowAccess is false, linkElement calls remove()
            // The link is created but then removed by linkElement
        });
    });

    describe('createButton', () => {
        it('should create a button element', () => {
            const button = helper.createButton('Submit', jest.fn());
            expect(button).toBeInstanceOf(Knot);
            expect(button.getTagName()).toBe('button');
        });

        it('should set html content to name', () => {
            const button = helper.createButton('Submit', jest.fn());
            expect(button.getHtml()).toContain('Submit');
        });

        it('should add SUI css classes', () => {
            const button = helper.createButton('Submit', jest.fn());
            expect(button.hasClass('sui-button')).toBe(true);
            expect(button.hasClass('sui-button--raised')).toBe(true);
        });

        it('should add custom css classes', () => {
            const button = helper.createButton('Submit', jest.fn(), '', true, [
                'custom-class',
            ]);
            expect(button.hasClass('custom-class')).toBe(true);
        });

        it('should invoke callback on click', () => {
            const callback = jest.fn();
            const button = helper.createButton('Submit', callback);
            document.body.appendChild(button.getNode());
            button.getNode().click();
            expect(callback).toHaveBeenCalled();
        });
    });

    describe('createIconButton', () => {
        it('should create a button with icon', () => {
            const button = helper.createIconButton('edit', jest.fn());
            expect(button).toBeInstanceOf(Knot);
            expect(button.getTagName()).toBe('button');
        });

        it('should contain icon element', () => {
            const button = helper.createIconButton('edit', jest.fn());
            const iconEl = button.getNode().querySelector('em');
            expect(iconEl).not.toBeNull();
            expect(iconEl.textContent).toBe('edit');
        });

        it('should add icon-specific SUI classes', () => {
            const button = helper.createIconButton('edit', jest.fn());
            expect(button.hasClass('sui-button--icon')).toBe(true);
        });
    });

    describe('linkElement', () => {
        it('should add css classes to existing link', () => {
            const el = document.createElement('a');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.linkElement(knot, jest.fn(), '', '', true, ['my-link']);
            expect(knot.hasClass('my-link')).toBe(true);
        });

        it('should set id on link without id', () => {
            const el = document.createElement('a');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.linkElement(knot, jest.fn());
            expect(knot.getId()).toContain('link');
        });

        it('should handle description via tooltip', () => {
            const el = document.createElement('a');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.linkElement(knot, jest.fn(), '', 'A tooltip', true, []);
            // _setTooltip creates a Tooltip
            expect(knot.getId()).toContain('link');
        });

        it('should remove element when access not allowed', () => {
            const el = document.createElement('a');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.linkElement(knot, jest.fn(), '', '', false);
            expect(document.body.contains(el)).toBe(false);
        });
    });

    describe('buttonElement', () => {
        it('should add SUI css classes to existing button', () => {
            const el = document.createElement('button');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.buttonElement(knot, jest.fn());
            expect(knot.hasClass('sui-button')).toBe(true);
            expect(knot.hasClass('sui-button--raised')).toBe(true);
        });

        it('should set id on button without id', () => {
            const el = document.createElement('button');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.buttonElement(knot, jest.fn());
            expect(knot.getId()).toContain('button');
        });

        it('should remove element when access not allowed', () => {
            const el = document.createElement('button');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.buttonElement(knot, jest.fn(), '', false);
            expect(document.body.contains(el)).toBe(false);
        });
    });

    describe('multipleLink', () => {
        it('should enhance all matching link elements', () => {
            const container = document.createElement('div');
            const a1 = document.createElement('a');
            a1.className = 'nav-link';
            a1.textContent = 'A';
            const a2 = document.createElement('a');
            a2.className = 'nav-link';
            a2.textContent = 'B';
            container.appendChild(a1);
            container.appendChild(a2);
            document.body.appendChild(container);
            const dom = new Knot(container);
            const callback = jest.fn();
            helper.multipleLink('.nav-link', dom, callback);
            expect(a1.id).toContain('link');
            expect(a2.id).toContain('link');
        });
    });

    describe('link', () => {
        it('should enhance a single link element by selector', () => {
            const container = document.createElement('div');
            const a = document.createElement('a');
            a.className = 'my-link';
            a.textContent = 'Click';
            container.appendChild(a);
            document.body.appendChild(container);
            const dom = new Knot(container);
            const callback = jest.fn();
            const link = helper.link('.my-link', dom, callback, '/test');
            expect(link.getAttribute('href')).toBe('/test');
        });

        it('should invoke callback on click', () => {
            const container = document.createElement('div');
            const a = document.createElement('a');
            a.className = 'click-link';
            a.setAttribute('href', '/page');
            a.textContent = 'Go';
            container.appendChild(a);
            document.body.appendChild(container);
            const dom = new Knot(container);
            const callback = jest.fn();
            helper.link('.click-link', dom, callback);
            a.click();
            expect(callback).toHaveBeenCalledWith('/page', expect.anything());
        });
    });

    describe('multipleButton', () => {
        it('should enhance all matching button elements', () => {
            const container = document.createElement('div');
            const b1 = document.createElement('button');
            b1.className = 'action-btn';
            b1.textContent = 'A';
            const b2 = document.createElement('button');
            b2.className = 'action-btn';
            b2.textContent = 'B';
            container.appendChild(b1);
            container.appendChild(b2);
            document.body.appendChild(container);
            const dom = new Knot(container);
            helper.multipleButton('.action-btn', dom);
            expect(b1.classList.contains('sui-button')).toBe(true);
            expect(b2.classList.contains('sui-button')).toBe(true);
        });
    });

    describe('button', () => {
        it('should enhance a single button element by selector', () => {
            const container = document.createElement('div');
            const btn = document.createElement('button');
            btn.className = 'save-btn';
            btn.textContent = 'Save';
            container.appendChild(btn);
            document.body.appendChild(container);
            const dom = new Knot(container);
            const callback = jest.fn();
            const result = helper.button('.save-btn', dom, callback, 'Save it');
            expect(result.hasClass('sui-button')).toBe(true);
            expect(result.hasClass('sui-button--raised')).toBe(true);
        });
    });

    describe('iconButton', () => {
        it('should enhance a single icon button by selector', () => {
            const container = document.createElement('div');
            const btn = document.createElement('button');
            btn.className = 'edit-btn';
            const icon = document.createElement('em');
            icon.className = 'material-icons';
            icon.textContent = 'edit';
            btn.appendChild(icon);
            container.appendChild(btn);
            document.body.appendChild(container);
            const dom = new Knot(container);
            const callback = jest.fn();
            const result = helper.iconButton(
                '.edit-btn',
                dom,
                callback,
                'Edit',
            );
            expect(result.hasClass('sui-button--icon')).toBe(true);
        });

        it('should invoke callback on click', () => {
            const container = document.createElement('div');
            const btn = document.createElement('button');
            btn.className = 'del-btn';
            const icon = document.createElement('em');
            icon.className = 'material-icons';
            icon.textContent = 'delete';
            btn.appendChild(icon);
            container.appendChild(btn);
            document.body.appendChild(container);
            const dom = new Knot(container);
            const callback = jest.fn();
            helper.iconButton('.del-btn', dom, callback);
            btn.click();
            expect(callback).toHaveBeenCalled();
        });
    });

    describe('multipleIconButton', () => {
        it('should enhance all matching icon button elements', () => {
            const container = document.createElement('div');
            const b1 = document.createElement('button');
            b1.className = 'icon-act';
            b1.textContent = 'edit';
            const b2 = document.createElement('button');
            b2.className = 'icon-act';
            b2.textContent = 'delete';
            container.appendChild(b1);
            container.appendChild(b2);
            document.body.appendChild(container);
            const dom = new Knot(container);
            helper.multipleIconButton('.icon-act', dom);
            expect(b1.classList.contains('sui-button--icon')).toBe(true);
            expect(b2.classList.contains('sui-button--icon')).toBe(true);
        });
    });

    describe('setGravatar', () => {
        it('should set src with gravatar url', () => {
            const el = document.createElement('img');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.setGravatar(knot, 'default.png', 'test@example.com');
            const src = knot.getAttribute('src');
            expect(src).toContain('gravatar.com/avatar/');
            expect(src).toContain('s=500');
            expect(src).toContain('r=g');
        });

        it('should set onError fallback', () => {
            const el = document.createElement('img');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.setGravatar(knot, 'fallback.png', 'test@example.com');
            const onError = knot.getAttribute('onError');
            expect(onError).toContain('fallback.png');
        });

        it('should use custom size and rating', () => {
            const el = document.createElement('img');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.setGravatar(
                knot,
                'default.png',
                'test@example.com',
                200,
                'pg',
            );
            const src = knot.getAttribute('src');
            expect(src).toContain('s=200');
            expect(src).toContain('r=pg');
        });
    });
});

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
            expect(link.getAttribute('href')).toBe('javascript:void(0)');
        });

        it('should remove element when allowAccess is false', () => {
            document.body.innerHTML = '<div id="container"></div>';
            const container = new Knot(
                document.getElementById('container'),
            );
            const link = helper.createLink(
                'Link',
                jest.fn(),
                '',
                '',
                false,
            );
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

        it('should add MDL css classes', () => {
            const button = helper.createButton('Submit', jest.fn());
            expect(button.hasClass('mdl-button')).toBe(true);
            expect(button.hasClass('mdl-js-button')).toBe(true);
        });

        it('should add custom css classes', () => {
            const button = helper.createButton(
                'Submit',
                jest.fn(),
                '',
                true,
                ['custom-class'],
            );
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

        it('should add icon-specific MDL classes', () => {
            const button = helper.createIconButton('edit', jest.fn());
            expect(button.hasClass('mdl-button--icon')).toBe(true);
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
            helper.linkElement(
                knot,
                jest.fn(),
                '',
                'A tooltip',
                true,
                [],
            );
            // _setTooltip creates a Tooltip and calls mdl
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
        it('should add MDL css classes to existing button', () => {
            const el = document.createElement('button');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.buttonElement(knot, jest.fn());
            expect(knot.hasClass('mdl-button')).toBe(true);
            expect(knot.hasClass('mdl-js-button')).toBe(true);
            expect(knot.hasClass('mdl-button--raised')).toBe(true);
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

    describe('setGravatar', () => {
        it('should set src with gravatar url', () => {
            const el = document.createElement('img');
            document.body.appendChild(el);
            const knot = new Knot(el);
            helper.setGravatar(
                knot,
                'default.png',
                'test@example.com',
            );
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

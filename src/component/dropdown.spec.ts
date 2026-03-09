import { Knot, Objekt, Query } from '../core';
import { Dropdown } from './dropdown';

describe('dropdown', () => {
    let dropdown: Dropdown;
    let container: Knot;

    beforeEach(() => {
        container = new Query('.template-view').getKnot();
        dropdown = new Dropdown(container);
    });

    it('should be instance of Dropdown', () => {
        expect(dropdown).toBeInstanceOf(Dropdown);
    });

    it('should create button and menu elements', () => {
        expect(dropdown.buttonKnot).toBeDefined();
        expect(dropdown.menuKnot).toBeDefined();
        expect(dropdown.buttonKnot.getAttribute('aria-haspopup')).toBe('menu');
    });

    describe('setActions', () => {
        it('should render enabled menu items', () => {
            const clickFn = jest.fn();
            const item = new Objekt({ id: 1 });
            dropdown.setActions(
                [
                    {
                        style: () => ['edit', 'Edit', false, false],
                        click: clickFn,
                    },
                ],
                item,
            );
            const items = dropdown.menuKnot.getNode().querySelectorAll('li');
            expect(items.length).toBe(1);
            expect(items[0]!.textContent).toBe('Edit');
        });

        it('should render disabled menu items', () => {
            const item = new Objekt({ id: 1 });
            dropdown.setActions(
                [
                    {
                        style: () => ['lock', 'Locked', true, false],
                        click: jest.fn(),
                    },
                ],
                item,
            );
            const li = dropdown.menuKnot.getNode().querySelector('li');
            expect(li!.hasAttribute('disabled')).toBe(true);
        });

        it('should not render removed items', () => {
            const item = new Objekt({ id: 1 });
            dropdown.setActions(
                [
                    {
                        style: () => ['delete', 'Delete', false, true],
                        click: jest.fn(),
                    },
                ],
                item,
            );
            const items = dropdown.menuKnot.getNode().querySelectorAll('li');
            expect(items.length).toBe(0);
        });

        it('should use icon when title is empty', () => {
            const item = new Objekt({ id: 1 });
            dropdown.setActions(
                [
                    {
                        style: () => ['star', '', false, false],
                        click: jest.fn(),
                    },
                ],
                item,
            );
            const li = dropdown.menuKnot.getNode().querySelector('li');
            expect(li!.textContent).toBe('star');
        });

        it('should call action click handler on menu item click', () => {
            const clickFn = jest.fn();
            const item = new Objekt({ id: 1, name: 'test' });
            dropdown.setActions(
                [
                    {
                        style: () => ['edit', 'Edit', false, false],
                        click: clickFn,
                    },
                ],
                item,
            );
            const li = dropdown.menuKnot.getNode().querySelector('li');
            li!.click();
            expect(clickFn).toHaveBeenCalledWith(item);
        });
    });

    describe('menu toggle', () => {
        beforeEach(() => {
            const item = new Objekt({ id: 1 });
            dropdown.setActions(
                [
                    {
                        style: () => ['edit', 'Edit', false, false],
                        click: jest.fn(),
                    },
                ],
                item,
            );
        });

        it('should toggle menu visibility on button click', () => {
            dropdown.buttonKnot.getNode().click();
            expect(dropdown.menuKnot.hasClass('is-visible')).toBe(true);
            expect(dropdown.buttonKnot.getAttribute('aria-expanded')).toBe(
                true,
            );
        });

        it('should close menu on outside click', () => {
            dropdown.buttonKnot.getNode().click();
            document.body.click();
            expect(dropdown.menuKnot.hasClass('is-visible')).toBe(false);
            expect(dropdown.buttonKnot.getAttribute('aria-expanded')).toBe(
                false,
            );
        });
    });
});

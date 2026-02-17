import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Navigation } from './navigation';

describe('Navigation', () => {
    let nav: Navigation;

    beforeEach(() => {
        nav = new Navigation();
    });

    it('should be instance of Navigation', () => {
        expect(nav).toBeInstanceOf(Navigation);
    });

    describe('addText', () => {
        it('should add a text item', () => {
            nav.addText('item-1', 'Home', jest.fn());
            expect(nav.container.size()).toBe(1);
        });
    });

    describe('addIcon', () => {
        it('should add an icon item', () => {
            nav.addIcon('item-2', 'settings', 'Settings', jest.fn());
            expect(nav.container.size()).toBe(1);
        });
    });

    describe('addCounter', () => {
        it('should add a counter item', () => {
            nav.addCounter('item-3', '5', 'Notifications', jest.fn());
            expect(nav.container.size()).toBe(1);
        });
    });

    describe('add', () => {
        it('should add text item via Objekt', () => {
            nav.add(
                new Objekt({
                    id: 'home',
                    title: 'Home',
                    action: jest.fn(),
                }),
            );
            expect(nav.container.size()).toBe(1);
        });

        it('should add icon item via Objekt', () => {
            nav.add(
                new Objekt({
                    id: 'settings',
                    icon: 'settings',
                    title: 'Settings',
                    action: jest.fn(),
                }),
            );
            expect(nav.container.size()).toBe(1);
        });

        it('should add disabled item', () => {
            nav.add(
                new Objekt({
                    id: 'disabled-item',
                    title: 'Disabled',
                    action: jest.fn(),
                    disabled: true,
                }),
            );
            expect(nav.container.size()).toBe(1);
        });
    });

    describe('each', () => {
        it('should iterate over items', () => {
            nav.addText('a', 'A', jest.fn());
            nav.addText('b', 'B', jest.fn());
            const items: string[] = [];
            nav.each((item: Objekt) => {
                items.push(item.get('id'));
            });
            expect(items).toEqual(['a', 'b']);
        });
    });

    describe('setActive', () => {
        it('should mark item as active', () => {
            nav.addText('home', 'Home', jest.fn());
            nav.addText('about', 'About', jest.fn());
            nav.setActive('home');
            const homeItem = nav.container.findById('home');
            const linkKnot = homeItem.get<Knot>('node');
            expect(linkKnot.hasClass('active')).toBe(true);
        });
    });

    describe('setAllInactive', () => {
        it('should clear all active classes', () => {
            nav.addText('home', 'Home', jest.fn());
            nav.setActive('home');
            nav.setAllInactive();
            const homeItem = nav.container.findById('home');
            const linkKnot = homeItem.get<Knot>('node');
            expect(linkKnot.hasClass('active')).toBe(false);
        });
    });

    describe('setDisabled/setEnabled', () => {
        it('should disable an item', () => {
            nav.addText('item', 'Item', jest.fn());
            nav.setDisabled('item');
            const item = nav.container.findById('item');
            const linkKnot = item.get<Knot>('node');
            expect(linkKnot.hasClass('disabled')).toBe(true);
        });

        it('should enable an item', () => {
            nav.addText('item', 'Item', jest.fn());
            nav.setDisabled('item');
            nav.setEnabled('item');
            const item = nav.container.findById('item');
            const linkKnot = item.get<Knot>('node');
            expect(linkKnot.hasClass('disabled')).toBe(false);
        });
    });

    describe('show/hide', () => {
        it('should hide an item', () => {
            nav.addText('item', 'Item', jest.fn());
            nav.hide('item');
            const item = nav.container.findById('item');
            const linkKnot = item.get<Knot>('node');
            expect(linkKnot.hasClass('hidden')).toBe(true);
        });

        it('should show a hidden item', () => {
            nav.addText('item', 'Item', jest.fn());
            nav.hide('item');
            nav.show('item');
            const item = nav.container.findById('item');
            const linkKnot = item.get<Knot>('node');
            expect(linkKnot.hasClass('hidden')).toBe(false);
        });
    });

    describe('bindToContainer', () => {
        it('should append items to container', () => {
            nav.addText('a', 'A', jest.fn());
            nav.addText('b', 'B', jest.fn());
            const container = new Knot('div');
            document.body.appendChild(container.getNode());
            nav.bindToContainer(container);
            const children = container.getNode().children;
            expect(children.length).toBe(2);
        });
    });
});

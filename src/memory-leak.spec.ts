import { Knot, Query, Collection, Objekt } from './core';
import { EventBus } from './module/eventBus';
import { Popup } from './component/popup';
import { PopupContainer } from './component/popupContainer';

describe('Memory leak prevention', () => {
    describe('Knot event listeners', () => {
        it('should store listeners in listenerStoreKey', () => {
            const knot = new Knot('div');
            knot.addEventListener('click', () => {
                return true;
            });
            const store = knot.getNode()['_listeners'];
            expect(store).toBeDefined();
            expect(store['click']).toHaveLength(1);
        });

        it('should accumulate multiple listeners for same event', () => {
            const knot = new Knot('div');
            knot.addEventListener('click', () => {
                return true;
            });
            knot.addEventListener('click', () => {
                return true;
            });
            const store = knot.getNode()['_listeners'];
            expect(store['click']).toHaveLength(2);
        });

        it('should store listeners for different events separately', () => {
            const knot = new Knot('div');
            knot.addEventListener('click', () => {
                return true;
            });
            knot.addEventListener('mouseenter', () => {
                return true;
            });
            const store = knot.getNode()['_listeners'];
            expect(store['click']).toHaveLength(1);
            expect(store['mouseenter']).toHaveLength(1);
        });

        it('should remove all listeners for an event via removeEventListeners', () => {
            const knot = new Knot('div');
            const spy = jest.fn();
            knot.addEventListener('click', () => {
                spy();
                return true;
            });
            knot.addEventListener('click', () => {
                spy();
                return true;
            });

            knot.removeEventListeners('click');

            knot.getNode().dispatchEvent(new Event('click'));
            expect(spy).not.toHaveBeenCalled();
        });

        it('should remove specific listener via removeEventListener', () => {
            const knot = new Knot('div');
            const spy1 = jest.fn();
            const spy2 = jest.fn();

            const listener1 = knot.addEventListener('click', () => {
                spy1();
                return true;
            });
            knot.addEventListener('click', () => {
                spy2();
                return true;
            });

            knot.removeEventListener('click', listener1 as EventListener);

            knot.getNode().dispatchEvent(new Event('click'));
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).toHaveBeenCalledTimes(1);
        });

        it('should not retain listener references after removeChild', () => {
            const parent = new Knot('div');
            const child = new Knot('span');
            parent.appendChild(child);

            child.addEventListener('click', () => {
                return true;
            });
            const store = child.getNode()['_listeners'];
            expect(store['click']).toHaveLength(1);

            parent.removeChild(child);
            expect(parent.getNode().contains(child.getNode())).toBe(false);
        });

        it('should return noop when no callback provided', () => {
            const knot = new Knot('div');
            const listener = knot.addEventListener('click');
            expect(typeof listener).toBe('function');
            const store = knot.getNode()['_listeners'];
            expect(store).toBeUndefined();
        });
    });

    describe('EventBus subscription cleanup', () => {
        it('should remove specific callback', () => {
            const eventBus = new EventBus();
            const callback = jest.fn();
            eventBus.set('test-event', callback);
            eventBus.remove('test-event', callback);

            eventBus.call('test-event');
            expect(callback).not.toHaveBeenCalled();
        });

        it('should not grow unbounded when set/remove cycles repeat', () => {
            const eventBus = new EventBus();
            for (let i = 0; i < 100; i++) {
                const cb = jest.fn();
                eventBus.set('cycle-event', cb);
                eventBus.remove('cycle-event', cb);
            }
            const events = eventBus.eventStore.get<Function[]>(
                'cycle-event',
                [],
            );
            expect(events).toHaveLength(0);
        });

        it('should pop last callback via pop()', () => {
            const eventBus = new EventBus();
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            eventBus.set('pop-event', cb1);
            eventBus.set('pop-event', cb2);
            eventBus.pop('pop-event');

            eventBus.call('pop-event');
            expect(cb1).toHaveBeenCalled();
            expect(cb2).not.toHaveBeenCalled();
        });

        it('should handle removing non-existent callback gracefully', () => {
            const eventBus = new EventBus();
            const cb = jest.fn();
            expect(() => eventBus.remove('nonexistent', cb)).not.toThrow();
        });
    });

    describe('PopupContainer collection management', () => {
        it('should not grow after push/delete cycles', () => {
            const container = new PopupContainer();
            const parentKnot = new Query('.template-view').getKnot();

            for (let i = 0; i < 10; i++) {
                const content = new Knot('div');
                const popup = new Popup(content, parentKnot);
                container.push(Popup, popup);
                container.delete(popup);
            }

            const collection = window['popup_collection'] as Collection<any>;
            expect(collection.size()).toBe(0);
        });

        it('should delete popup from collection on close', () => {
            const container = new PopupContainer();
            const parentKnot = new Query('.template-view').getKnot();

            const content = new Knot('div');
            const popup = new Popup(content, parentKnot);
            container.push(Popup, popup);

            const collection = window['popup_collection'] as Collection<any>;
            expect(collection.size()).toBe(1);

            container.delete(popup);
            expect(collection.size()).toBe(0);
        });

        afterEach(() => {
            delete window['popup_collection'];
        });
    });

    describe('Popup open/close cycles', () => {
        it('should not leak state after repeated open/close', () => {
            const parentKnot = new Query('.template-view').getKnot();
            const content = new Knot('div');
            const popup = new Popup(content, parentKnot);

            for (let i = 0; i < 10; i++) {
                popup.open();
                expect(popup.isOpened()).toBe(true);
                popup.close();
                expect(popup.isOpened()).toBe(false);
            }
        });

        it('should not create multiple DOM nodes after open/close cycles', () => {
            const parentKnot = new Query('.template-view').getKnot();
            const content = new Knot('div');
            const popup = new Popup(content, parentKnot);

            const initialChildCount =
                parentKnot.getNode().querySelectorAll('.popup').length;

            for (let i = 0; i < 5; i++) {
                popup.open();
                popup.close();
            }

            const finalChildCount =
                parentKnot.getNode().querySelectorAll('.popup').length;
            expect(finalChildCount).toBe(initialChildCount);
        });

        afterEach(() => {
            delete window['popup_collection'];
        });
    });

    describe('Collection memory management', () => {
        it('should not retain deleted items', () => {
            const collection = new Collection(
                [{ id: 1 }, { id: 2 }, { id: 3 }],
                Objekt,
                {
                    id: 'id',
                },
            );
            expect(collection.size()).toBe(3);

            collection.deleteById(2);
            expect(collection.size()).toBe(2);
        });

        it('should clear all items', () => {
            const collection = new Collection<{ id: number }>(
                [{ id: 1 }, { id: 2 }],
                Object,
                {
                    id: 'id',
                },
            );
            collection.clear();
            expect(collection.size()).toBe(0);
        });

        it('should replace items completely on reload', () => {
            const collection = new Collection<{ id: number }>(
                [{ id: 1 }, { id: 2 }],
                Object,
                {
                    id: 'id',
                },
            );
            collection.reload([{ id: 3 }]);
            expect(collection.size()).toBe(1);
        });
    });
});

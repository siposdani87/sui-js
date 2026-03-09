import { Knot, Objekt, Query } from '../core';
import { CardCollection } from './cardCollection';

describe('CardCollection', () => {
    let cardCollection: CardCollection;

    function createCardCollectionDOM(): HTMLDivElement {
        const container = document.createElement('div');
        container.className = 'test-card-view';
        const ccDiv = document.createElement('div');
        ccDiv.className = 'card-collection';
        const template = document.createElement('template');
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = '{{name}}';
        template.content.appendChild(cardDiv);
        ccDiv.appendChild(template);
        container.appendChild(ccDiv);
        document.body.appendChild(container);
        return container;
    }

    afterEach(() => {
        document
            .querySelectorAll('.test-card-view')
            .forEach((el) => el.remove());
    });

    it('should be instance of CardCollection', () => {
        const container = createCardCollectionDOM();
        const knot = new Knot(container);
        cardCollection = new CardCollection(knot);
        expect(cardCollection).toBeInstanceOf(CardCollection);
    });

    it('should have default options', () => {
        const container = createCardCollectionDOM();
        const knot = new Knot(container);
        cardCollection = new CardCollection(knot);
        expect(cardCollection.options.get('row_count')).toBe(12);
        expect(cardCollection.options.get('pager_num')).toBe(4);
    });

    it('should accept custom options', () => {
        const container = createCardCollectionDOM();
        const knot = new Knot(container);
        cardCollection = new CardCollection(knot, '.card-collection', null, {
            row_count: 6,
        });
        expect(cardCollection.options.get('row_count')).toBe(6);
    });

    describe('render', () => {
        it('should emit action on render', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.fn();
            cardCollection.on('action', spy);
            cardCollection.render();
            expect(spy).toHaveBeenCalled();
        });

        it('should pass params with offset and limit', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.fn();
            cardCollection.on('action', spy);
            cardCollection.render();
            const params = spy.mock.calls[0][0];
            expect(params.get('offset')).toBeDefined();
            expect(params.get('limit')).toBe(12);
        });
    });

    describe('refresh', () => {
        it('should emit action', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.fn();
            cardCollection.on('action', spy);
            cardCollection.refresh();
            expect(spy).toHaveBeenCalled();
        });

        it('should set page when opt_page >= 0', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.spyOn(cardCollection.pager, 'setPage');
            cardCollection.refresh(0);
            expect(spy).toHaveBeenCalledWith(0);
        });

        it('should not set page when opt_page is -1', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.spyOn(cardCollection.pager, 'setPage');
            cardCollection.refresh(-1);
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('setData', () => {
        it('should show content handler when empty array', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.spyOn(cardCollection.contentHandler, 'show');
            cardCollection.setData([]);
            expect(spy).toHaveBeenCalled();
        });

        it('should hide content handler with data', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.spyOn(cardCollection.contentHandler, 'hide');
            cardCollection.setData([{ id: 'a', name: 'Alpha' }]);
            expect(spy).toHaveBeenCalled();
        });

        it('should render cards for items', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            cardCollection.setData([
                { id: 'a', name: 'Alpha' },
                { id: 'b', name: 'Beta' },
            ]);
            const bodyNode = cardCollection.body.getNode();
            expect(bodyNode.childNodes.length).toBe(2);
        });

        it('should emit cardKnot for each card', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const spy = jest.fn();
            cardCollection.on('cardKnot', spy);
            cardCollection.setData([{ id: 'a', name: 'Alpha' }]);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('setCount', () => {
        it('should call pager setCount and draw', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            const setCountSpy = jest.spyOn(cardCollection.pager, 'setCount');
            const drawSpy = jest.spyOn(cardCollection.pager, 'draw');
            cardCollection.setCount(100);
            expect(setCountSpy).toHaveBeenCalledWith(100);
            expect(drawSpy).toHaveBeenCalled();
        });
    });

    describe('template rendering', () => {
        it('should replace simple field expressions', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot);
            cardCollection.setData([{ id: 'x', name: 'Test Name' }]);
            const bodyNode = cardCollection.body.getNode();
            expect(bodyNode.textContent).toContain('Test Name');
        });

        it('should call ctrl methods for ctrl expressions', () => {
            const container = document.createElement('div');
            container.className = 'test-card-view ctrl-test';
            const ccDiv = document.createElement('div');
            ccDiv.className = 'card-collection';
            const template = document.createElement('template');
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = '{{ctrl.format(name)}}';
            template.content.appendChild(cardDiv);
            ccDiv.appendChild(template);
            container.appendChild(ccDiv);
            document.body.appendChild(container);

            const ctrl = {
                format: jest.fn((val: string) => val.toUpperCase()),
            };
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot, '.card-collection', ctrl);
            cardCollection.setData([{ id: 'x', name: 'hello' }]);
            expect(ctrl.format).toHaveBeenCalled();
            container.remove();
        });

        it('should warn when ctrl method is missing', () => {
            const container = document.createElement('div');
            container.className = 'test-card-view ctrl-missing';
            const ccDiv = document.createElement('div');
            ccDiv.className = 'card-collection';
            const template = document.createElement('template');
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = '{{ctrl.nonExistent(name)}}';
            template.content.appendChild(cardDiv);
            ccDiv.appendChild(template);
            container.appendChild(ccDiv);
            document.body.appendChild(container);

            const ctrl = {};
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot, '.card-collection', ctrl);
            cardCollection.setData([{ id: 'x', name: 'hello' }]);
            // Should not throw, just warn
            expect(cardCollection.body.getNode().childNodes.length).toBe(1);
            container.remove();
        });

        it('should pass item when key is "item" in ctrl expression', () => {
            const container = document.createElement('div');
            container.className = 'test-card-view ctrl-item';
            const ccDiv = document.createElement('div');
            ccDiv.className = 'card-collection';
            const template = document.createElement('template');
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = '{{ctrl.render(item)}}';
            template.content.appendChild(cardDiv);
            ccDiv.appendChild(template);
            container.appendChild(ccDiv);
            document.body.appendChild(container);

            const ctrl = {
                render: jest.fn((obj: Objekt) => obj.get('name')),
            };
            const knot = new Knot(container);
            cardCollection = new CardCollection(knot, '.card-collection', ctrl);
            cardCollection.setData([{ id: 'x', name: 'ItemTest' }]);
            expect(ctrl.render).toHaveBeenCalled();
            const arg = ctrl.render.mock.calls[0]![0];
            expect(arg).toBeInstanceOf(Objekt);
            container.remove();
        });
    });

    describe('pagination', () => {
        it('should limit items when collection exceeds row_count', () => {
            const container = createCardCollectionDOM();
            const knot = new Knot(container);
            cardCollection = new CardCollection(
                knot,
                '.card-collection',
                null,
                {
                    row_count: 2,
                },
            );
            const items = [
                { id: '1', name: 'A' },
                { id: '2', name: 'B' },
                { id: '3', name: 'C' },
                { id: '4', name: 'D' },
            ];
            cardCollection.setData(items);
            const bodyNode = cardCollection.body.getNode();
            expect(bodyNode.childNodes.length).toBe(2);
        });
    });
});

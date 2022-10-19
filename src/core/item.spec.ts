import { Item } from './item';

describe('item', () => {
    it('should be instance of Item', () => {
        const item = new Item('<span>sample</span>');

        expect(item).toBeInstanceOf(Item);
    });

    it('attribute', () => {
        const node = new Item('div');

        const values = ['text', null, true, false, Infinity, 0, 1, 10];

        for (const element of values) {
            node.setAttribute('data', element);
            const value = node.getAttribute('data');

            expect(value).toBe(element);
        }
    });

    it('data-attribute', () => {
        const node = new Item('div');

        const values = [
            '',
            'text',
            null,
            true,
            false,
            undefined,
            Infinity,
            0,
            1,
            10,
            [0, 1, 10],
            { key: 'value' },
        ];

        for (const element of values) {
            node.setAttribute('data-value', element);
            const value = node.getAttribute('data-value');

            expect(value).toEqual(element);
        }
        node.removeAttribute('data-value');
    });

    it('data', () => {
        const node = new Item('div');

        const values = [
            '',
            'text',
            null,
            true,
            false,
            undefined,
            Infinity,
            0,
            1,
            10,
            [0, 1, 10],
            { key: 'value' },
        ];

        for (const element of values) {
            node.setData('value', element);
            const value = node.getData('value');

            expect(value).toEqual(element);
        }
        node.removeData('value');
    });
});

import { Knot } from './knot';

describe('item', () => {
    it('should be instance of Knot', () => {
        const knot = new Knot('<span>sample</span>');

        expect(knot).toBeInstanceOf(Knot);
    });

    it('attribute', () => {
        const knot = new Knot('div');

        const values = ['text', null, true, false, Infinity, 0, 1, 10];

        for (const element of values) {
            knot.setAttribute('data', element);
            const value = knot.getAttribute('data');

            expect(value).toBe(element);
        }
    });

    it('data-attribute', () => {
        const knot = new Knot('div');

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
            knot.setAttribute('data-value', element);
            const value = knot.getAttribute('data-value');

            expect(value).toEqual(element);
        }
        knot.removeAttribute('data-value');
    });

    it('data', () => {
        const knot = new Knot('div');

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
            knot.setData('value', element);
            const value = knot.getData('value');

            expect(value).toEqual(element);
        }
        knot.removeData('value');
    });
});

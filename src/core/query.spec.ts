import { Query } from './query';
import { Knot } from './knot';

describe('Query', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should instantiate with a CSS selector', () => {
        const query = new Query('.test');
        expect(query).toBeInstanceOf(Query);
    });

    describe('getKnot', () => {
        it('should return a Knot from getKnot()', () => {
            const div = document.createElement('div');
            div.className = 'test-knot';
            document.body.appendChild(div);

            const query = new Query('.test-knot');
            const knot = query.getKnot();
            expect(knot).toBeInstanceOf(Knot);
            expect(knot.getNode()).toBe(div);
        });

        it('should return empty Knot for non-matching selector', () => {
            const query = new Query('.nonexistent');
            const knot = query.getKnot();
            expect(knot).toBeInstanceOf(Knot);
            expect(knot.isEmpty()).toBe(true);
        });
    });

    describe('getKnots', () => {
        it('should return all matching knots', () => {
            document.body.innerHTML =
                '<span class="item">1</span><span class="item">2</span><span class="item">3</span>';

            const query = new Query('.item');
            const knots = query.getKnots();
            expect(knots).toHaveLength(3);
        });

        it('should return empty array for no matches', () => {
            const query = new Query('.nothing');
            const knots = query.getKnots();
            expect(knots).toHaveLength(0);
        });
    });

    describe('selector types', () => {
        it('should handle ID selector', () => {
            const div = document.createElement('div');
            div.id = 'unique-el';
            document.body.appendChild(div);

            const query = new Query('#unique-el');
            expect(query.getKnot().getNode()).toBe(div);
        });

        it('should handle tag selector', () => {
            document.body.innerHTML = '<p>test</p>';

            const query = new Query('p');
            expect(query.size()).toBe(1);
        });

        it('should handle complex selector with spaces', () => {
            document.body.innerHTML =
                '<div class="parent"><span class="child">text</span></div>';

            const query = new Query('.parent .child');
            expect(query.size()).toBe(1);
        });

        it('should handle attribute selector', () => {
            document.body.innerHTML = '<input type="text" name="test" />';

            const query = new Query('input[name="test"]');
            expect(query.size()).toBe(1);
        });
    });

    describe('context element', () => {
        it('should search within a specific element', () => {
            document.body.innerHTML =
                '<div id="ctx"><span class="inner">A</span></div><span class="inner">B</span>';

            const context = document.getElementById('ctx');
            const query = new Query('.inner', context);
            expect(query.size()).toBe(1);
        });

        it('should accept a Knot as context', () => {
            document.body.innerHTML =
                '<div id="ctx2"><p>inside</p></div><p>outside</p>';

            const context = new Knot(document.getElementById('ctx2'));
            const query = new Query('p', context);
            expect(query.size()).toBe(1);
        });
    });
});

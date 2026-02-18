import { Knot } from './knot';

describe('Knot', () => {
    let knot: Knot;

    beforeEach(() => {
        knot = new Knot('div');
        document.body.appendChild(knot.getNode());
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should be instance of Knot', () => {
        expect(knot).toBeInstanceOf(Knot);
    });

    it('should create from HTML string', () => {
        const k = new Knot('<span>sample</span>');
        expect(k).toBeInstanceOf(Knot);
        expect(k.getTagName()).toBe('span');
    });

    it('should create from tag name string', () => {
        const k = new Knot('p');
        expect(k.getTagName()).toBe('p');
    });

    it('should create from existing DOM element', () => {
        const el = document.createElement('section');
        const k = new Knot(el);
        expect(k.getNode()).toBe(el);
    });

    describe('attributes', () => {
        it.each(['text', null, true, false, Infinity, 0, 1, 10])(
            'should set and get attribute value %p',
            (value) => {
                knot.setAttribute('data', value);
                expect(knot.getAttribute('data')).toBe(value);
            },
        );

        it('should remove attribute', () => {
            knot.setAttribute('title', 'test');
            knot.removeAttribute('title');
            expect(knot.hasAttribute('title')).toBe(false);
        });

        it('should check hasAttribute', () => {
            expect(knot.hasAttribute('title')).toBe(false);
            knot.setAttribute('title', 'hello');
            expect(knot.hasAttribute('title')).toBe(true);
        });
    });

    describe('data attributes', () => {
        it.each([
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
        ])('should set and get data-attribute value %p', (value) => {
            knot.setAttribute('data-value', value);
            expect(knot.getAttribute('data-value')).toEqual(value);
        });

        it('should remove data-attribute', () => {
            knot.setAttribute('data-value', 'test');
            knot.removeAttribute('data-value');
            expect(knot.getAttribute('data-value')).toBeNull();
        });
    });

    describe('data', () => {
        it.each([
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
        ])('should set and get data value %p', (value) => {
            knot.setData('value', value);
            expect(knot.getData('value')).toEqual(value);
        });

        it('should remove data', () => {
            knot.setData('value', 'test');
            knot.removeData('value');
            expect(knot.getData('value')).toBeUndefined();
        });
    });

    describe('CSS classes', () => {
        it('should add a class', () => {
            knot.addClass('active');
            expect(knot.hasClass('active')).toBe(true);
        });

        it('should add multiple classes', () => {
            knot.addClass(['foo', 'bar']);
            expect(knot.hasClass('foo')).toBe(true);
            expect(knot.hasClass('bar')).toBe(true);
        });

        it('should remove a class', () => {
            knot.addClass('active');
            knot.removeClass('active');
            expect(knot.hasClass('active')).toBe(false);
        });

        it('should toggle a class', () => {
            knot.toggleClass('toggled');
            expect(knot.hasClass('toggled')).toBe(true);
            knot.toggleClass('toggled');
            expect(knot.hasClass('toggled')).toBe(false);
        });

        it('should return hasClass false for missing class', () => {
            expect(knot.hasClass('nonexistent')).toBe(false);
        });

        it('should get all classes', () => {
            knot.addClass(['a', 'b']);
            const classes = knot.getClasses();
            expect(classes).toContain('a');
            expect(classes).toContain('b');
        });
    });

    describe('text and HTML', () => {
        it('should set and get HTML content', () => {
            knot.setHtml('<span>hello</span>');
            expect(knot.getHtml(true)).toBe('<span>hello</span>');
        });

        it('should get outer HTML', () => {
            knot.setHtml('text');
            expect(knot.getHtml(false)).toContain('<div>');
        });

        it('should get text content', () => {
            knot.setHtml('plain text');
            expect(knot.getText()).toBe('plain text');
        });
    });

    describe('DOM manipulation', () => {
        it('should append child knot', () => {
            const child = new Knot('span');
            knot.appendChild(child);
            expect(knot.hasChildren()).toBe(true);
        });

        it('should remove child knot', () => {
            const child = new Knot('span');
            knot.appendChild(child);
            knot.removeChild(child);
            expect(knot.hasChildren()).toBe(false);
        });

        it('should remove all children', () => {
            knot.appendChild(new Knot('span'));
            knot.appendChild(new Knot('p'));
            knot.removeChildren();
            expect(knot.hasChildren()).toBe(false);
        });

        it('should insert (replace children with new knot)', () => {
            knot.appendChild(new Knot('span'));
            const replacement = new Knot('p');
            knot.insert(replacement);
            expect(knot.getHtml(true)).toBe('<p></p>');
        });

        it('should get parent knot', () => {
            const parent = knot.getParentKnot();
            expect(parent).not.toBeNull();
            expect(parent.getNode()).toBe(document.body);
        });

        it('should remove self from DOM', () => {
            knot.remove();
            expect(knot.exists()).toBe(false);
        });

        it('should get next sibling', () => {
            const sibling = new Knot('span');
            document.body.appendChild(sibling.getNode());
            const next = knot.getNextSibling();
            expect(next.getNode()).toBe(sibling.getNode());
        });
    });

    describe('event listeners', () => {
        it('should add and trigger event listener', () => {
            const callback = jest.fn().mockReturnValue(true);
            knot.addEventListener('click', callback);
            knot.trigger('click');
            expect(callback).toHaveBeenCalled();
        });

        it('should return noop when no callback provided', () => {
            const listener = knot.addEventListener('click');
            expect(listener).toBeInstanceOf(Function);
        });
    });

    describe('set and get via set/get shorthand', () => {
        it('should set and get id via set/get', () => {
            knot.set('id', 'my-id');
            expect(knot.get('id')).toBe('my-id');
        });

        it('should set and get regular attribute', () => {
            knot.set('title', 'tooltip');
            expect(knot.get('title')).toBe('tooltip');
        });
    });

    describe('merge', () => {
        it('should set multiple attributes at once', () => {
            knot.merge({ title: 'hello', role: 'button' });
            expect(knot.get('title')).toBe('hello');
            expect(knot.get('role')).toBe('button');
        });
    });

    describe('styles', () => {
        it('should set inline styles', () => {
            knot.setStyle({ color: 'red', display: 'block' });
            const style = knot.getStyle();
            expect(style.color).toBe('red');
            expect(style.display).toBe('block');
        });

        it('should remove inline styles', () => {
            knot.setStyle({ color: 'red' });
            knot.removeStyle(['color']);
            expect(knot.getStyle().color).toBe('');
        });
    });

    describe('isEmpty', () => {
        it('should return false for valid knot', () => {
            expect(knot.isEmpty()).toBe(false);
        });

        it('should return true for null node', () => {
            const emptyKnot = new Knot(null);
            expect(emptyKnot.isEmpty()).toBe(true);
        });
    });

    describe('exists', () => {
        it('should return true when in DOM', () => {
            expect(knot.exists()).toBe(true);
        });

        it('should return false when not in DOM', () => {
            const detached = new Knot('div');
            expect(detached.exists()).toBe(false);
        });
    });

    describe('setParentKnot', () => {
        it('should set parent knot', () => {
            const parent = new Knot('div');
            knot.setParentKnot(parent);
            expect(knot.parentKnot).toBe(parent);
        });
    });

    describe('createElement', () => {
        it('should create a child knot with parent reference', () => {
            const child = knot.createElement('span');
            expect(child).toBeInstanceOf(Knot);
            expect(child.getTagName()).toBe('span');
        });
    });

    describe('toString', () => {
        it('should return outer HTML by default', () => {
            knot.setHtml('content');
            expect(knot.toString()).toContain('<div>');
        });

        it('should return inner HTML when opt_isRoot is false', () => {
            knot.setHtml('content');
            expect(knot.toString(false)).toBe('content');
        });
    });
});

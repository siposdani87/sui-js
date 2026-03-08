import { parseInputBlock } from '../component';
import { Query, Objekt } from '../core';
import { SelectField } from './selectField';

describe('SelectField', () => {
    let selectField: SelectField;

    function createSelectDOM(): HTMLDivElement {
        const container = document.createElement('div');
        container.className = 'input-block test-select';
        const label = document.createElement('label');
        label.setAttribute('for', 'test-select');
        label.textContent = 'Select';
        const select = document.createElement('select');
        select.id = 'test-select';
        select.name = 'field[select]';
        const opt0 = document.createElement('option');
        opt0.value = '';
        opt0.textContent = 'default';
        const optA = document.createElement('option');
        optA.value = 'a';
        optA.textContent = 'Alpha';
        const optB = document.createElement('option');
        optB.value = 'b';
        optB.textContent = 'Beta';
        select.appendChild(opt0);
        select.appendChild(optA);
        select.appendChild(optB);
        container.appendChild(label);
        container.appendChild(select);
        document.body.appendChild(container);
        return container;
    }

    function createSelectField(container: HTMLDivElement): SelectField {
        const inputBlock = new Query<HTMLElement>('.test-select').getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        return new SelectField(input, label, error, inputBlock);
    }

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-select',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        selectField = new SelectField(input, label, error, inputBlock);
    });

    it('should be instance of SelectField', () => {
        expect(selectField).toBeInstanceOf(SelectField);
    });

    it('should not be multiple by default', () => {
        expect(selectField.isMultiple()).toBe(false);
    });

    it('should return null value when empty selected', () => {
        const value = selectField.getValue();
        expect(value).toBeNull();
    });

    it('should have options collection', () => {
        expect(selectField.options).toBeDefined();
    });

    it('should check disabled state', () => {
        expect(selectField.isDisabled()).toBe(false);
    });

    describe('render and refresh', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should render without error', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            expect(() => field.render()).not.toThrow();
        });

        it('should create iconKnot on render', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            expect((field as any).iconKnot).toBeDefined();
        });

        it('should create selectContainerKnot on render', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            expect((field as any).selectContainerKnot).toBeDefined();
        });

        it('should refresh without error', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            expect(() => field.refresh()).not.toThrow();
        });
    });

    describe('setValue / getValue', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should set and get a single value', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue('b');
            expect(field.getValue()).toBe('b');
        });

        it('should return null for empty selection', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue('');
            expect(field.getValue()).toBeNull();
        });

        it('should handle array value', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue(['a']);
            expect(field.getValue()).toBe('a');
        });
    });

    describe('getOptionValue', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should return option Objekt when value is set', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue('a');
            const option = field.getOptionValue();
            expect(option).toBeInstanceOf(Objekt);
        });

        it('should return null when no value selected', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue('');
            expect(field.getOptionValue()).toBeNull();
        });
    });

    describe('setOptions', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should replace options with new items', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            const newItems = [
                new Objekt({ value: 'x', name: 'X-ray' }),
                new Objekt({ value: 'y', name: 'Yankee' }),
            ];
            field.setOptions(newItems);
            // 1 empty default + 2 new = 3
            expect(field.options.size()).toBe(3);
        });
    });

    describe('showLoader', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should execute without error', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            expect(() => field.showLoader()).not.toThrow();
        });
    });

    describe('_initChangeEvent', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should handle native change event after render', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            const spy = jest.spyOn(field as any, '_change');
            field.input
                .getNode()
                .dispatchEvent(new Event('change', { bubbles: true }));
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('multiple selection mode', () => {
        let container: HTMLDivElement;

        function createMultiSelectDOM(): HTMLDivElement {
            const c = document.createElement('div');
            c.className = 'input-block test-multi-select';
            const label = document.createElement('label');
            label.setAttribute('for', 'test-multi-select');
            label.textContent = 'Multi Select';
            const select = document.createElement('select');
            select.id = 'test-multi-select';
            select.name = 'field[multi]';
            select.setAttribute('multiple', 'multiple');
            const opt0 = document.createElement('option');
            opt0.value = '';
            opt0.textContent = 'default';
            const optA = document.createElement('option');
            optA.value = 'a';
            optA.textContent = 'Alpha';
            const optB = document.createElement('option');
            optB.value = 'b';
            optB.textContent = 'Beta';
            const optC = document.createElement('option');
            optC.value = 'c';
            optC.textContent = 'Charlie';
            select.appendChild(opt0);
            select.appendChild(optA);
            select.appendChild(optB);
            select.appendChild(optC);
            c.appendChild(label);
            c.appendChild(select);
            document.body.appendChild(c);
            return c;
        }

        afterEach(() => {
            if (container) container.remove();
        });

        it('should detect multiple attribute', () => {
            container = createMultiSelectDOM();
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-select',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            expect(field.isMultiple()).toBe(true);
        });

        it('should set and get multiple values', () => {
            container = createMultiSelectDOM();
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-select',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            field.setValue(['a', 'b']);
            const value = field.getValue();
            expect(Array.isArray(value)).toBe(true);
            expect(value).toContain('a');
            expect(value).toContain('b');
        });

        it('should render multiple tags', () => {
            container = createMultiSelectDOM();
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-select',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            field.setValue(['a', 'b']);
            const tags = container.querySelectorAll('.field-tag');
            expect(tags.length).toBe(2);
        });
    });

    describe('open and close', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should open and close popup', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            const openSpy = jest.spyOn(field.popup, 'open');
            const closeSpy = jest.spyOn(field.popup, 'close');
            field.open();
            expect(openSpy).toHaveBeenCalled();
            field.close();
            expect(closeSpy).toHaveBeenCalled();
        });

        it('should open popup when icon is clicked', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            const openSpy = jest.spyOn(field, 'open');
            (field as any).iconKnot.getNode().dispatchEvent(new Event('click'));
            expect(openSpy).toHaveBeenCalled();
        });

        it('should open popup when select container is clicked', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            const openSpy = jest.spyOn(field, 'open');
            (field as any).selectContainerKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            expect(openSpy).toHaveBeenCalled();
        });
    });

    describe('search', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should filter options by search query', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            (field as any)._search('Alpha');
            const items = field.listKnot.getNode().querySelectorAll('button');
            expect(items.length).toBe(1);
        });

        it('should show all options with empty search', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            (field as any)._search('');
            const items = field.listKnot.getNode().querySelectorAll('button');
            // 3 options: default (''), Alpha, Beta
            expect(items.length).toBe(3);
        });

        it('should be case-insensitive', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            (field as any)._search('alpha');
            const items = field.listKnot.getNode().querySelectorAll('button');
            expect(items.length).toBe(1);
        });

        it('should persist search query', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            (field as any)._search('test');
            expect(field.query).toBe('test');
        });
    });

    describe('_handleSelectedId', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should select and deselect in single mode', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            (field as any)._handleSelectedId('a');
            expect(field.getValue()).toBe('a');
            (field as any)._handleSelectedId('a');
            expect(field.getValue()).toBeNull();
        });

        it('should switch selection in single mode', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            (field as any)._handleSelectedId('a');
            expect(field.getValue()).toBe('a');
            (field as any)._handleSelectedId('b');
            expect(field.getValue()).toBe('b');
        });
    });

    describe('_drawKnots', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should render option buttons', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.open();
            const buttons = field.listKnot.getNode().querySelectorAll('button');
            expect(buttons.length).toBe(3);
        });

        it('should mark selected option', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue('a');
            field.open();
            const selected = field.listKnot
                .getNode()
                .querySelectorAll('.selected');
            expect(selected.length).toBe(1);
        });

        it('should render option names', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.open();
            const spans = field.listKnot.getNode().querySelectorAll('span');
            const names = Array.from(spans).map((s) => s.textContent);
            expect(names).toContain('Alpha');
            expect(names).toContain('Beta');
        });
    });

    describe('disabled state', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should add is-disabled class when disabled', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setDisabled(true);
            field.refresh();
            expect(container.classList.contains('is-disabled')).toBe(true);
        });

        it('should remove is-disabled class when enabled', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setDisabled(true);
            field.refresh();
            field.setDisabled(false);
            field.refresh();
            expect(container.classList.contains('is-disabled')).toBe(false);
        });
    });

    describe('required validation', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should add is-invalid class when required and empty', () => {
            container = createSelectDOM();
            container
                .querySelector('select')!
                .setAttribute('required', 'required');
            const field = createSelectField(container);
            field.render();
            expect(container.classList.contains('is-invalid')).toBe(true);
        });
    });

    describe('setOptions with images', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should render options with images', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            const items = [
                new Objekt({
                    id: 'x',
                    label: 'X-ray',
                    img: 'https://example.com/x.png',
                }),
                new Objekt({ id: 'y', label: 'Yankee', img: '' }),
            ];
            field.setOptions(items, 'id', 'label', 'img');
            field.open();
            const images = field.listKnot.getNode().querySelectorAll('img');
            expect(images.length).toBe(1);
            expect(images[0]!.getAttribute('src')).toBe(
                'https://example.com/x.png',
            );
        });
    });

    describe('_setMultipleTag edge cases', () => {
        let container: HTMLDivElement;

        function createMultiSelectDOM(opt_required = false): HTMLDivElement {
            const c = document.createElement('div');
            c.className = 'input-block test-multi-edge';
            const label = document.createElement('label');
            label.setAttribute('for', 'test-multi-edge');
            label.textContent = 'Multi Edge';
            const select = document.createElement('select');
            select.id = 'test-multi-edge';
            select.name = 'field[multi-edge]';
            select.setAttribute('multiple', 'multiple');
            if (opt_required) {
                select.setAttribute('required', 'required');
            }
            const opt0 = document.createElement('option');
            opt0.value = '';
            opt0.textContent = 'default';
            const optA = document.createElement('option');
            optA.value = 'a';
            optA.textContent = 'Alpha';
            const optB = document.createElement('option');
            optB.value = 'b';
            optB.textContent = 'Beta';
            select.appendChild(opt0);
            select.appendChild(optA);
            select.appendChild(optB);
            c.appendChild(label);
            c.appendChild(select);
            document.body.appendChild(c);
            return c;
        }

        afterEach(() => {
            if (container) container.remove();
        });

        it('should fall back to first option when required and no valid ids (line 344-346)', () => {
            container = createMultiSelectDOM(true);
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-edge',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            // Call _setMultipleTag with IDs that don't match any option
            // so options array is empty, triggering the isRequired fallback
            (field as any)._setMultipleTag(['nonexistent']);
            const tags = (field as any).selectKnot
                .getNode()
                .querySelectorAll('.field-tag');
            // Should show the first option as fallback tag
            expect(tags.length).toBe(1);
        });

        it('should render empty tags when not required and ids is empty (line 347-348)', () => {
            container = createMultiSelectDOM(false);
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-edge',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            // Directly call _setMultipleTag with an empty array
            (field as any)._setMultipleTag([]);
            const tags = (field as any).selectKnot
                .getNode()
                .querySelectorAll('.field-tag');
            expect(tags.length).toBe(0);
        });
    });

    describe('_handleSelectedId in multiple mode', () => {
        let container: HTMLDivElement;

        function createMultiSelectDOM(): HTMLDivElement {
            const c = document.createElement('div');
            c.className = 'input-block test-multi-handle';
            const label = document.createElement('label');
            label.setAttribute('for', 'test-multi-handle');
            label.textContent = 'Multi Handle';
            const select = document.createElement('select');
            select.id = 'test-multi-handle';
            select.name = 'field[multi-handle]';
            select.setAttribute('multiple', 'multiple');
            const opt0 = document.createElement('option');
            opt0.value = '';
            opt0.textContent = 'default';
            const optA = document.createElement('option');
            optA.value = 'a';
            optA.textContent = 'Alpha';
            const optB = document.createElement('option');
            optB.value = 'b';
            optB.textContent = 'Beta';
            const optC = document.createElement('option');
            optC.value = 'c';
            optC.textContent = 'Charlie';
            select.appendChild(opt0);
            select.appendChild(optA);
            select.appendChild(optB);
            select.appendChild(optC);
            c.appendChild(label);
            c.appendChild(select);
            document.body.appendChild(c);
            return c;
        }

        afterEach(() => {
            if (container) container.remove();
        });

        it('should add item in multiple mode (line 444-445)', () => {
            container = createMultiSelectDOM();
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-handle',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            (field as any)._handleSelectedId('a');
            expect(field.getValue()).toContain('a');
            // Add another
            (field as any)._handleSelectedId('b');
            const value = field.getValue() as string[];
            expect(value).toContain('a');
            expect(value).toContain('b');
        });

        it('should remove item in multiple mode (line 442-443)', () => {
            container = createMultiSelectDOM();
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-handle',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            field.setValue(['a', 'b']);
            // Remove 'a'
            (field as any)._handleSelectedId('a');
            const value = field.getValue() as string[];
            expect(value).toContain('b');
            expect(value).not.toContain('a');
        });

        it('should clear ids when selecting empty in multiple mode (line 439-440)', () => {
            container = createMultiSelectDOM();
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-handle',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            field.setValue(['a', 'b']);
            // Select empty string to clear all
            (field as any)._handleSelectedId('');
            const value = field.getValue() as string[];
            expect(value).toEqual([]);
        });

        it('should fall back to empty when all removed in multiple mode (line 447-448)', () => {
            container = createMultiSelectDOM();
            const inputBlock = new Query<HTMLElement>(
                '.test-multi-handle',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const field = new SelectField(input, label, error, inputBlock);
            field.render();
            (field as any)._handleSelectedId('a');
            expect(field.getValue()).toContain('a');
            // Remove the only selected item
            (field as any)._handleSelectedId('a');
            const value = field.getValue() as string[];
            expect(value).toEqual([]);
        });
    });

    describe('tag click and close button interactions', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should open popup when tag is clicked (line 368)', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue('a');
            const openSpy = jest.spyOn(field, 'open');
            const tag = container.querySelector('.field-tag') as HTMLElement;
            tag.dispatchEvent(new Event('click'));
            expect(openSpy).toHaveBeenCalled();
        });

        it('should deselect when close button on tag is clicked (line 385)', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.setValue('a');
            const closeBtn = container.querySelector(
                '.field-tag .close',
            ) as HTMLElement;
            expect(closeBtn).not.toBeNull();
            closeBtn.dispatchEvent(new Event('click'));
            expect(field.getValue()).toBeNull();
        });
    });

    describe('option list item click handler', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should select option when list item is clicked (line 478)', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.open();
            const buttons = field.listKnot.getNode().querySelectorAll('button');
            // Click the second button (Alpha, value='a')
            const alphaBtn = buttons[1] as HTMLElement;
            alphaBtn.dispatchEvent(new Event('click'));
            expect(field.getValue()).toBe('a');
        });
    });

    describe('search input keyup handler', () => {
        let container: HTMLDivElement;

        afterEach(() => {
            if (container) container.remove();
        });

        it('should filter options on keyup event (lines 518-520)', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.open();
            const searchInput = field.searchInputKnot.getNode();
            searchInput.value = 'Beta';
            searchInput.dispatchEvent(new Event('keyup'));
            const items = field.listKnot.getNode().querySelectorAll('button');
            expect(items.length).toBe(1);
            expect(field.query).toBe('Beta');
        });

        it('should show all options when search is cleared via keyup', () => {
            container = createSelectDOM();
            const field = createSelectField(container);
            field.render();
            field.open();
            const searchInput = field.searchInputKnot.getNode();
            // First filter
            searchInput.value = 'Alpha';
            searchInput.dispatchEvent(new Event('keyup'));
            expect(
                field.listKnot.getNode().querySelectorAll('button').length,
            ).toBe(1);
            // Clear search
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('keyup'));
            expect(
                field.listKnot.getNode().querySelectorAll('button').length,
            ).toBe(3);
        });
    });
});

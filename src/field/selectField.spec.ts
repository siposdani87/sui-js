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
});

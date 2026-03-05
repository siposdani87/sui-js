import { parseInputBlock } from '../component';
import { Query } from '../core';
import { TextareaField } from './textareaField';

describe('TextareaField', () => {
    let textareaField: TextareaField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-textarea',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        textareaField = new TextareaField(input, label, error, inputBlock);
    });

    it('should be instance of TextareaField', () => {
        expect(textareaField).toBeInstanceOf(TextareaField);
    });

    it('should return field name', () => {
        expect(textareaField.getName()).toBe('field.textarea');
    });

    it('should set and get value', () => {
        textareaField.setValue('some text');
        expect(textareaField.getValue()).toBe('some text');
    });

    it('should render without error', () => {
        expect(() => textareaField.render()).not.toThrow();
    });

    it('should check disabled state', () => {
        expect(textareaField.isDisabled()).toBe(false);
    });

    describe('render', () => {
        it('should add SUI classes to input block', () => {
            textareaField.render();
            const node = textareaField.inputBlock.getNode();
            expect(node.classList.contains('sui-textfield')).toBe(true);
        });

        it('should add SUI classes to input', () => {
            textareaField.render();
            const node = textareaField.input.getNode();
            expect(node.classList.contains('sui-textfield__input')).toBe(true);
        });

        it('should add SUI class to label', () => {
            textareaField.render();
            const labelNode = textareaField.label.getNode();
            expect(labelNode.classList.contains('sui-textfield__label')).toBe(
                true,
            );
        });
    });

    describe('rich text mode', () => {
        let richTextareaField: TextareaField;

        beforeEach(() => {
            // Create a rich text textarea
            const container = document.createElement('div');
            container.className = 'input-block rich-textarea';
            const label = document.createElement('label');
            label.setAttribute('for', 'rich-textarea');
            label.textContent = 'Rich Text';
            const textarea = document.createElement('textarea');
            textarea.name = 'field[richtext]';
            textarea.id = 'rich-textarea';
            textarea.setAttribute('data-rich-text', 'true');
            textarea.value = 'initial content';
            container.appendChild(label);
            container.appendChild(textarea);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.rich-textarea',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            richTextareaField = new TextareaField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
        });

        afterEach(() => {
            const el = document.querySelector('.input-block.rich-textarea');
            if (el) el.remove();
        });

        it('should detect rich text mode', () => {
            expect((richTextareaField as any)._isRichText()).toBe(true);
        });

        it('should render rich text editor', () => {
            richTextareaField.render();
            expect(richTextareaField.richText).toBeDefined();
            expect(richTextareaField.richTextKnot).toBeDefined();
        });

        it('should create contentEditable div', () => {
            richTextareaField.render();
            expect(richTextareaField.richTextKnot.contentEditable).toBe('true');
        });

        it('should wrap initial value in paragraph tags', () => {
            richTextareaField.render();
            const html = richTextareaField.richText.getHtml(true);
            expect(html).toContain('<p>');
        });

        it('should create toolbar with buttons', () => {
            richTextareaField.render();
            expect(richTextareaField.toolbarKnot).toBeDefined();
            const toolbarNode = richTextareaField.toolbarKnot.getNode();
            // 9 toolbar buttons: undo, redo, bold, italic, underline, ul, ol, clear, code
            expect(toolbarNode.childNodes.length).toBe(9);
        });

        it('should hide input in rich text mode', () => {
            richTextareaField.render();
            const inputNode = richTextareaField.input.getNode();
            expect(inputNode.classList.contains('hidden')).toBe(true);
        });

        it('should toggle HTML mode', () => {
            richTextareaField.render();
            expect((richTextareaField as any)._isHtmlMode()).toBe(false);
            (richTextareaField as any)._setHtmlMode(true);
            expect((richTextareaField as any)._isHtmlMode()).toBe(true);
        });

        it('should switch doc mode to show textarea in HTML mode', () => {
            richTextareaField.render();
            (richTextareaField as any)._setDocMode(true);
            expect(
                richTextareaField.richText
                    .getNode()
                    .classList.contains('hidden'),
            ).toBe(true);
            expect(
                richTextareaField.input.getNode().classList.contains('hidden'),
            ).toBe(false);
        });

        it('should switch doc mode to show rich text in normal mode', () => {
            richTextareaField.render();
            (richTextareaField as any)._setDocMode(true);
            (richTextareaField as any)._setDocMode(false);
            expect(
                richTextareaField.richText
                    .getNode()
                    .classList.contains('hidden'),
            ).toBe(false);
        });

        it('should set value updating both rich text and input', () => {
            richTextareaField.render();
            richTextareaField.setValue('<p>New Content</p>');
            expect(richTextareaField.getValue()).toBe('<p>New Content</p>');
            expect(richTextareaField.richTextKnot.innerHTML).toBe(
                '<p>New Content</p>',
            );
        });

        it('should call _formatDoc with execCommand', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            (richTextareaField as any)._formatDoc('bold');
            expect(document.execCommand).toHaveBeenCalledWith(
                'bold',
                false,
                undefined,
            );
        });

        it('should not call execCommand in HTML mode', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            (richTextareaField as any)._setHtmlMode(true);
            (richTextareaField as any)._formatDoc('bold');
            expect(document.execCommand).not.toHaveBeenCalled();
        });
    });

    describe('refresh', () => {
        it('should call refresh without error', () => {
            textareaField.render();
            expect(() => textareaField.refresh()).not.toThrow();
        });
    });

    describe('keyup event', () => {
        it('should trigger modelChange on keyup', () => {
            const spy = jest.spyOn(textareaField, 'modelChange');
            textareaField.input.getNode().value = 'typed text';
            textareaField.input
                .getNode()
                .dispatchEvent(new Event('keyup', { bubbles: true }));
            expect(spy).toHaveBeenCalledWith('typed text');
        });
    });

    describe('change event', () => {
        it('should trigger modelChange on change', () => {
            const spy = jest.spyOn(textareaField, 'modelChange');
            textareaField.input.getNode().value = 'changed text';
            textareaField.input
                .getNode()
                .dispatchEvent(new Event('change', { bubbles: true }));
            expect(spy).toHaveBeenCalledWith('changed text');
        });
    });
});

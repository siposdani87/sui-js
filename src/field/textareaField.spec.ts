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

        it('should preserve value already wrapped in paragraph tags', () => {
            richTextareaField.input.getNode().value = '<p>already wrapped</p>';
            richTextareaField.render();
            const html = richTextareaField.richText.getHtml(true);
            expect(html).toBe('<p>already wrapped</p>');
        });

        it('should use br tag when value is empty', () => {
            richTextareaField.input.getNode().value = '';
            richTextareaField.render();
            const html = richTextareaField.richText.getHtml(true);
            expect(html).toBe('<p><br></p>');
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

        it('should update richText on input keyup in rich text mode', () => {
            richTextareaField.render();
            const spy = jest.spyOn(richTextareaField.richText, 'setHtml');
            richTextareaField.input.getNode().value = '<p>updated</p>';
            richTextareaField.input
                .getNode()
                .dispatchEvent(new Event('keyup', { bubbles: true }));
            expect(spy).toHaveBeenCalledWith('<p>updated</p>');
        });

        it('should handle Enter keydown in rich text div', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            const richNode = richTextareaField.richText.getNode();
            richNode.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Enter',
                    bubbles: true,
                }),
            );
            expect(document.execCommand).toHaveBeenCalledWith(
                'defaultParagraphSeparator',
                false,
                'p',
            );
        });

        it('should not call execCommand on non-Enter keydown', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            const richNode = richTextareaField.richText.getNode();
            richNode.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'a',
                    bubbles: true,
                }),
            );
            expect(document.execCommand).not.toHaveBeenCalled();
        });

        it('should update input value on richText keyup', () => {
            richTextareaField.render();
            richTextareaField.richText
                .getNode()
                .appendChild(document.createTextNode('typed content'));
            const spy = jest.spyOn(textareaField, 'modelChange');
            richTextareaField.richText
                .getNode()
                .dispatchEvent(new Event('keyup', { bubbles: true }));
            expect(richTextareaField.getValue()).toContain('typed content');
        });

        it('should handle paste event with clipboardData', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            document.queryCommandSupported = jest.fn(() => true);
            const pasteEvent = new Event('paste', {
                bubbles: true,
            }) as any;
            pasteEvent.clipboardData = {
                getData: jest.fn(() => 'pasted text'),
            };
            richTextareaField.richText.getNode().dispatchEvent(pasteEvent);
            expect(document.execCommand).toHaveBeenCalledWith(
                'insertHTML',
                false,
                'pasted text',
            );
        });

        it('should handle paste event with insertText fallback', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            document.queryCommandSupported = jest.fn(() => false);
            const pasteEvent = new Event('paste', {
                bubbles: true,
            }) as any;
            pasteEvent.clipboardData = {
                getData: jest.fn(() => 'pasted text'),
            };
            richTextareaField.richText.getNode().dispatchEvent(pasteEvent);
            expect(document.execCommand).toHaveBeenCalledWith(
                'insertText',
                false,
                'pasted text',
            );
        });

        it('should handle paste event with no clipboardData available', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            document.queryCommandSupported = jest.fn(() => true);
            const pasteEvent = new Event('paste', {
                bubbles: true,
            }) as any;
            pasteEvent.clipboardData = null;
            delete (window as any)['clipboardData'];
            richTextareaField.richText.getNode().dispatchEvent(pasteEvent);
            expect(document.execCommand).toHaveBeenCalledWith(
                'insertHTML',
                false,
                '',
            );
        });

        it('should handle paste event with window.clipboardData fallback', () => {
            richTextareaField.render();
            document.execCommand = jest.fn(() => true);
            document.queryCommandSupported = jest.fn(() => true);
            const pasteEvent = new Event('paste', {
                bubbles: true,
            }) as any;
            pasteEvent.clipboardData = null;
            (window as any)['clipboardData'] = {
                getData: jest.fn(() => 'window pasted'),
            };
            richTextareaField.richText.getNode().dispatchEvent(pasteEvent);
            expect(document.execCommand).toHaveBeenCalledWith(
                'insertHTML',
                false,
                'window pasted',
            );
            delete (window as any)['clipboardData'];
        });

        describe('toolbar button clicks', () => {
            beforeEach(() => {
                richTextareaField.render();
                document.execCommand = jest.fn(() => true);
            });

            it('should execute undo on undo button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[0] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'undo',
                    false,
                    undefined,
                );
            });

            it('should execute redo on redo button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[1] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'redo',
                    false,
                    undefined,
                );
            });

            it('should execute bold on bold button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[2] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'bold',
                    false,
                    undefined,
                );
            });

            it('should execute italic on italic button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[3] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'italic',
                    false,
                    undefined,
                );
            });

            it('should execute underline on underline button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[4] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'underline',
                    false,
                    undefined,
                );
            });

            it('should execute insertunorderedlist on bullet list button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[5] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'insertunorderedlist',
                    false,
                    undefined,
                );
            });

            it('should execute insertorderedlist on numbered list button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[6] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'insertorderedlist',
                    false,
                    undefined,
                );
            });

            it('should execute removeFormat on clear button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                (buttons[7] as HTMLElement).click();
                expect(document.execCommand).toHaveBeenCalledWith(
                    'removeFormat',
                    false,
                    undefined,
                );
            });

            it('should toggle HTML mode on code button click', () => {
                const buttons =
                    richTextareaField.toolbarKnot.getNode().childNodes;
                expect((richTextareaField as any)._isHtmlMode()).toBe(false);
                (buttons[8] as HTMLElement).click();
                expect((richTextareaField as any)._isHtmlMode()).toBe(true);
                (buttons[8] as HTMLElement).click();
                expect((richTextareaField as any)._isHtmlMode()).toBe(false);
            });
        });
    });

    describe('refresh', () => {
        it('should call refresh without error', () => {
            textareaField.render();
            expect(() => textareaField.refresh()).not.toThrow();
        });

        it('should add is-invalid when required and empty', () => {
            textareaField.render();
            textareaField.setRequired(true);
            textareaField.setValue('');
            textareaField.refresh();
            expect(textareaField.inputBlock.hasClass('is-invalid')).toBe(true);
        });

        it('should add is-disabled when disabled', () => {
            textareaField.render();
            textareaField.setDisabled(true);
            textareaField.refresh();
            expect(textareaField.inputBlock.hasClass('is-disabled')).toBe(true);
        });
    });

    describe('refresh in rich text mode', () => {
        let richField: TextareaField;

        beforeEach(() => {
            const container = document.createElement('div');
            container.className = 'input-block rich-textarea-refresh';
            const label = document.createElement('label');
            label.setAttribute('for', 'rich-refresh');
            label.textContent = 'Rich';
            const textarea = document.createElement('textarea');
            textarea.name = 'field[rich-refresh]';
            textarea.id = 'rich-refresh';
            textarea.setAttribute('data-rich-text', 'true');
            textarea.value = 'content';
            container.appendChild(label);
            container.appendChild(textarea);
            document.body.appendChild(container);

            const ib = new Query<HTMLElement>(
                '.input-block.rich-textarea-refresh',
            ).getKnot();
            const parsed = parseInputBlock(ib);
            richField = new TextareaField(
                parsed.input,
                parsed.label,
                parsed.error,
                ib,
            );
        });

        afterEach(() => {
            const el = document.querySelector(
                '.input-block.rich-textarea-refresh',
            );
            if (el) el.remove();
        });

        it('should disable contentEditable when disabled', () => {
            richField.render();
            richField.setDisabled(true);
            richField.refresh();
            expect(richField.richTextKnot.contentEditable).toBe('false');
        });

        it('should enable contentEditable when not disabled', () => {
            richField.render();
            richField.setDisabled(true);
            richField.refresh();
            richField.setDisabled(false);
            richField.refresh();
            expect(richField.richTextKnot.contentEditable).toBe('true');
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

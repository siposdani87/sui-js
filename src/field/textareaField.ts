import { BaseField } from './baseField';
import { Knot } from '../core/knot';

/**
 * Textarea field with optional rich text (contentEditable) editing and formatting toolbar.
 * When the `data-rich-text` attribute is set on the input, a WYSIWYG editor with bold, italic,
 * underline, list, and HTML mode controls is rendered.
 *
 * @example
 * const textareaField = new TextareaField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * textareaField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export class TextareaField extends BaseField<HTMLInputElement> {
    richText!: Knot;
    richTextKnot!: HTMLElement;
    toolbarKnot!: Knot;
    htmlMode!: boolean;

    /**
     * Initializes the field by adding CSS class and attaching keyup/change event listeners.
     */
    protected override _init(): void {
        this.inputBlock.addClass('textarea-field');

        this.input.addEventListener('keyup', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            if (this._isRichText()) {
                this.richText.setHtml(inputNode.value);
            }
            return true;
        });

        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });
    }

    /**
     * Applies SUI textarea classes and renders the rich text editor if configured.
     * @override
     */
    override render(): void {
        this._renderTextField(
            ['sui-textfield'],
            ['sui-textfield__input', 'sui-textarea__input'],
        );

        if (this._isRichText()) {
            this._renderRichText();
        }
        this.refresh();
    }

    /**
     * Creates the contentEditable rich text div, attaches keyboard and paste handlers, and renders toolbar buttons.
     */
    private _renderRichText(): void {
        this.input.addClass('hidden');

        let value = this.getValue();
        value = value.startsWith('<p>') ? value : `<p>${value || '<br />'}</p>`;

        this.richText = new Knot('div');
        this.richText.addClass([
            'sui-textfield__input',
            'sui-textarea__input',
            'textbox',
        ]);
        this.richText.setHtml(value);

        this.richText.addEventListener('keydown', (_knot, event) => {
            if (event.key === 'Enter') {
                document.execCommand('defaultParagraphSeparator', false, 'p');
            }
            return true;
        });

        this.richText.addEventListener('keyup', (knot) => {
            this._setValue(knot.getHtml(true));
            return true;
        });

        this.richText.addEventListener('paste', (_knot, e) => {
            let text = '';
            if (e.clipboardData) {
                text = e.clipboardData.getData('text/plain');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } else if ((window as any)['clipboardData']) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                text = (window as any)['clipboardData'].getData('Text');
            }
            if (document.queryCommandSupported('insertHTML')) {
                document.execCommand('insertHTML', false, text);
            } else {
                document.execCommand('insertText', false, text);
            }
            return false;
        });

        this.input.insertAfter(this.richText);

        this.richTextKnot = this.richText.getNode();
        this.richTextKnot.contentEditable = 'true';

        this._renderToolbarButtons();
    }

    /**
     * Checks whether the input has the data-rich-text attribute enabled.
     * @returns {boolean}
     */
    private _isRichText(): boolean {
        return !!this.input.getAttribute('data-rich-text');
    }

    /**
     * Renders all formatting toolbar buttons (undo, redo, bold, italic, underline, lists, clear, code).
     */
    private _renderToolbarButtons(): void {
        this.toolbarKnot = new Knot('div');
        this.toolbarKnot.addClass('toolbar');
        this.input.insertBefore(this.toolbarKnot);

        this._renderToolbarButton('undo', () => {
            this._formatDoc('undo');
        });

        this._renderToolbarButton('redo', () => {
            this._formatDoc('redo');
        });

        this._renderToolbarButton('format_bold', () => {
            this._formatDoc('bold');
        });

        this._renderToolbarButton('format_italic', () => {
            this._formatDoc('italic');
        });

        this._renderToolbarButton('format_underlined', () => {
            this._formatDoc('underline');
        });

        this._renderToolbarButton('format_list_bulleted', () => {
            this._formatDoc('insertunorderedlist');
        });

        this._renderToolbarButton('format_list_numbered', () => {
            this._formatDoc('insertorderedlist');
        });

        this._renderToolbarButton('format_clear', () => {
            this._formatDoc('removeFormat');
        });

        this._renderToolbarButton('code', () => {
            this._setHtmlMode(!this._isHtmlMode());
        });
    }

    /**
     * Creates a single toolbar button with a material icon and click handler.
     * @param {string} iconName - The Material Icons icon name.
     * @param {() => void} action - The callback to execute on click.
     */
    private _renderToolbarButton(iconName: string, action: () => void): void {
        const boldButtonKnot = new Knot('button');
        boldButtonKnot.setAttribute('type', 'button');
        boldButtonKnot.addClass(['icon-button', 'material-icons']);
        boldButtonKnot.setHtml(iconName);
        boldButtonKnot.addEventListener('click', () => {
            action();
        });
        this.toolbarKnot.appendChild(boldButtonKnot);
    }

    /**
     * Toggles between rich text editing and raw HTML editing modes.
     * @param {boolean} value - True to enable HTML mode, false for rich text mode.
     */
    private _setHtmlMode(value: boolean): void {
        this.htmlMode = value;
        this._setDocMode(this.htmlMode);
    }

    /**
     * Returns whether the editor is currently in raw HTML editing mode.
     * @returns {boolean}
     */
    private _isHtmlMode(): boolean {
        return this.htmlMode === true;
    }

    /**
     * Executes a document formatting command on the rich text content.
     * @param {string} sCmd - The execCommand command name (e.g., 'bold', 'italic').
     * @param {any} [opt_sValue] - Optional command argument.
     */
    private _formatDoc(sCmd: string, opt_sValue?: string | undefined): void {
        if (!this._isHtmlMode()) {
            document.execCommand(sCmd, false, opt_sValue);
            this._setValue(this.richTextKnot.innerHTML);
        }
    }

    /**
     * Switches visibility between the rich text div and raw textarea.
     * @param {boolean} _isHtmlMode - True to show the raw textarea, false to show the rich text editor.
     */
    private _setDocMode(_isHtmlMode: boolean): void {
        if (_isHtmlMode) {
            this.richText.addClass('hidden');
            this.input.removeClass('hidden');
        } else {
            this.richText.removeClass('hidden');
            this.input.addClass('hidden');
        }
        this.richTextKnot.focus();
    }

    /**
     * Marks the field as invalid when required and empty, disables contentEditable when disabled, and upgrades SUI components.
     * @override
     */
    override refresh() {
        this._refreshBase();

        if (this._isRichText()) {
            if (this.isDisabled()) {
                this.richTextKnot.contentEditable = 'false';
            } else {
                this.inputBlock.removeClass('is-disabled');
                this.richTextKnot.contentEditable = 'true';
            }
        }
    }

    /**
     * Sets the raw input value and triggers a change event without updating the rich text div.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     */
    private _setValue(
        value:
            | object
            | Array<unknown>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        const inputNode = this.input.getNode();
        inputNode.value = value!.toString();
        this.input.trigger('change');
    }

    /**
     * Sets the field value, updating both the rich text div innerHTML and the raw input.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     * @override
     */
    override setValue(
        value:
            | object
            | Array<unknown>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        if (this._isRichText()) {
            this.richTextKnot.innerHTML = value as string;
        }
        this._setValue(value);
    }

    /**
     * Returns the raw textarea input value.
     * @returns {any} The current textarea value.
     * @override
     */
    override getValue(): string {
        return this.input.getNode().value;
    }
}

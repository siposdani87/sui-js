import { mdl } from '../utils/render';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @description Textarea field with optional rich text (contentEditable) editing and formatting toolbar.
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
export class TextareaField extends BaseField {
    /**
     * @description Creates a new TextareaField instance.
     * @param {Knot<HTMLInputElement>} input - The textarea input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @description Initializes the field by adding CSS class and attaching keyup/change event listeners.
     */
    _init() {
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
     * @description Applies MDL textarea classes and renders the rich text editor if configured.
     * @override
     */
    render() {
        this.inputBlock.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        this.input.addClass(['mdl-textfield__input', 'mdl-textarea__input']);
        if (this.label && this.label.exists()) {
            this.label.addClass('mdl-textfield__label');
        }
        if (this._isRichText()) {
            this._renderRichText();
        }
        this.refresh();
    }
    /**
     * @description Creates the contentEditable rich text div, attaches keyboard and paste handlers, and renders toolbar buttons.
     */
    _renderRichText() {
        this.input.addClass('hidden');
        let value = this.getValue();
        value =
            value.indexOf('<p>') === 0 ? value : `<p>${value || '<br />'}</p>`;
        this.richText = new Knot('div');
        this.richText.addClass([
            'mdl-textfield__input',
            'mdl-textarea__input',
            'textbox',
        ]);
        this.richText.setHtml(value);
        this.richText.addEventListener('keydown', (_knot, event) => {
            if (event.keyCode === 13) {
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
            }
            else if (window['clipboardData']) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                text = window['clipboardData'].getData('Text');
            }
            if (document.queryCommandSupported('insertHTML')) {
                document.execCommand('insertHTML', false, text);
            }
            else {
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
     * @description Checks whether the input has the data-rich-text attribute enabled.
     * @returns {boolean}
     */
    _isRichText() {
        return !!this.input.getAttribute('data-rich-text');
    }
    /**
     * @description Renders all formatting toolbar buttons (undo, redo, bold, italic, underline, lists, clear, code).
     */
    _renderToolbarButtons() {
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
     * @description Creates a single toolbar button with a material icon and click handler.
     * @param {string} iconName - The Material Icons icon name.
     * @param {() => void} action - The callback to execute on click.
     */
    _renderToolbarButton(iconName, action) {
        const boldButtonKnot = new Knot('a');
        boldButtonKnot.setAttribute('href', 'javascript:void(0)');
        boldButtonKnot.addClass('material-icons');
        boldButtonKnot.setHtml(iconName);
        boldButtonKnot.addEventListener('click', () => {
            action();
        });
        this.toolbarKnot.appendChild(boldButtonKnot);
    }
    /**
     * @description Toggles between rich text editing and raw HTML editing modes.
     * @param {boolean} value - True to enable HTML mode, false for rich text mode.
     */
    _setHtmlMode(value) {
        this.htmlMode = value;
        this._setDocMode(this.htmlMode);
    }
    /**
     * @description Returns whether the editor is currently in raw HTML editing mode.
     * @returns {boolean}
     */
    _isHtmlMode() {
        return this.htmlMode === true;
    }
    /**
     * @description Executes a document formatting command on the rich text content.
     * @param {string} sCmd - The execCommand command name (e.g., 'bold', 'italic').
     * @param {any} [opt_sValue] - Optional command argument.
     */
    _formatDoc(sCmd, opt_sValue) {
        if (!this._isHtmlMode()) {
            document.execCommand(sCmd, false, opt_sValue);
            this._setValue(this.richTextKnot.innerHTML);
        }
    }
    /**
     * @description Switches visibility between the rich text div and raw textarea.
     * @param {boolean} _isHtmlMode - True to show the raw textarea, false to show the rich text editor.
     */
    _setDocMode(_isHtmlMode) {
        if (_isHtmlMode) {
            this.richText.addClass('hidden');
            this.input.removeClass('hidden');
        }
        else {
            this.richText.removeClass('hidden');
            this.input.addClass('hidden');
        }
        this.richTextKnot.focus();
    }
    /**
     * @description Marks the field as invalid when required and empty, disables contentEditable when disabled, and upgrades MDL components.
     * @override
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }
        if (this._isRichText() && this.isDisabled()) {
            this.richTextKnot.contentEditable = 'false';
        }
        mdl(this.inputBlock);
    }
    /**
     * @description Sets the raw input value and triggers a change event without updating the rich text div.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     */
    _setValue(value) {
        const inputNode = this.input.getNode();
        inputNode.value = value.toString();
        this.input.trigger('change');
    }
    /**
     * @description Sets the field value, updating both the rich text div innerHTML and the raw input.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     * @override
     */
    setValue(value) {
        if (this._isRichText()) {
            this.richTextKnot.innerHTML = value;
        }
        this._setValue(value);
    }
    /**
     * @description Returns the raw textarea input value.
     * @returns {any} The current textarea value.
     * @override
     */
    getValue() {
        return this.input.getNode().value;
    }
}

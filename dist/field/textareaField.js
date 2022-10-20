import { mdl } from '../utils/render';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @class
 * @extends {BaseField}
 */
export class TextareaField extends BaseField {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
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
     * @override
     * @return {undefined}
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
     * @return {undefined}
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
            }
            else if (window['clipboardData']) {
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
     * @private
     * @return {boolean}
     */
    _isRichText() {
        return !!this.input.getAttribute('data-rich-text');
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @param {string} iconName
     * @param {!Function} action
     * @return {undefined}
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
     * @private
     * @param {boolean} value
     * @return {undefined}
     */
    _setHtmlMode(value) {
        this.htmlMode = value;
        this._setDocMode(this.htmlMode);
    }
    /**
     * @private
     * @return {boolean}
     */
    _isHtmlMode() {
        return this.htmlMode === true;
    }
    /**
     * @private
     * @param {string} sCmd
     * @param {*=} opt_sValue
     * @return {undefined}
     */
    _formatDoc(sCmd, opt_sValue) {
        if (!this._isHtmlMode()) {
            document.execCommand(sCmd, false, opt_sValue);
            this._setValue(this.richTextKnot.innerHTML);
        }
    }
    /**
     * @private
     * @param {boolean} _isHtmlMode
     * @return {undefined}
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
     * @private
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    _setValue(value) {
        const inputNode = this.input.getNode();
        inputNode.value = value.toString();
        this.input.trigger('change');
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        if (this._isRichText()) {
            this.richTextKnot.innerHTML = value;
        }
        this._setValue(value);
    }
    /**
     * @override
     * @return {*}
     */
    getValue() {
        return this.input.getNode().value;
    }
}

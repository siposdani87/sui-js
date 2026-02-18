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
export declare class TextareaField extends BaseField<HTMLInputElement> {
    richText: Knot;
    richTextKnot: HTMLElement;
    toolbarKnot: Knot;
    htmlMode: boolean;
    /**
     * @description Creates a new TextareaField instance.
     * @param {Knot<HTMLInputElement>} input - The textarea input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes the field by adding CSS class and attaching keyup/change event listeners.
     */
    private _init;
    /**
     * @description Applies MDL textarea classes and renders the rich text editor if configured.
     * @override
     */
    render(): void;
    /**
     * @description Creates the contentEditable rich text div, attaches keyboard and paste handlers, and renders toolbar buttons.
     */
    private _renderRichText;
    /**
     * @description Checks whether the input has the data-rich-text attribute enabled.
     * @returns {boolean}
     */
    private _isRichText;
    /**
     * @description Renders all formatting toolbar buttons (undo, redo, bold, italic, underline, lists, clear, code).
     */
    private _renderToolbarButtons;
    /**
     * @description Creates a single toolbar button with a material icon and click handler.
     * @param {string} iconName - The Material Icons icon name.
     * @param {() => void} action - The callback to execute on click.
     */
    private _renderToolbarButton;
    /**
     * @description Toggles between rich text editing and raw HTML editing modes.
     * @param {boolean} value - True to enable HTML mode, false for rich text mode.
     */
    private _setHtmlMode;
    /**
     * @description Returns whether the editor is currently in raw HTML editing mode.
     * @returns {boolean}
     */
    private _isHtmlMode;
    /**
     * @description Executes a document formatting command on the rich text content.
     * @param {string} sCmd - The execCommand command name (e.g., 'bold', 'italic').
     * @param {any} [opt_sValue] - Optional command argument.
     */
    private _formatDoc;
    /**
     * @description Switches visibility between the rich text div and raw textarea.
     * @param {boolean} _isHtmlMode - True to show the raw textarea, false to show the rich text editor.
     */
    private _setDocMode;
    /**
     * @description Marks the field as invalid when required and empty, disables contentEditable when disabled, and upgrades MDL components.
     * @override
     */
    refresh(): void;
    /**
     * @description Sets the raw input value and triggers a change event without updating the rich text div.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     */
    private _setValue;
    /**
     * @description Sets the field value, updating both the rich text div innerHTML and the raw input.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     * @override
     */
    setValue(value: object | Array<unknown> | boolean | number | string | null | undefined): void;
    /**
     * @description Returns the raw textarea input value.
     * @returns {any} The current textarea value.
     * @override
     */
    getValue(): string;
}

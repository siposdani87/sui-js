import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * File upload field with image preview, document type icons, and remove
 * functionality.  Supports image files (shown as thumbnails) and document
 * types (docx, xlsx, pdf) rendered with SVG file-type icons.
 *
 * @example
 * const input = new Query<HTMLInputElement>('input[type="file"]', formKnot).getKnot();
 * const field = new FileField(input, label, error, inputBlock);
 * field.render();
 *
 * @see {@link BaseField}
 * @category Field
 */
export declare class FileField extends BaseField<HTMLInputElement> {
    /** Image element used to preview the uploaded file or placeholder icon. */
    imageTag: Knot;
    /** Base64 data URL of the currently uploaded file, or `null` if empty. */
    valueSrc: string | null;
    /** Default placeholder image source shown when no file is selected. */
    defaultSrc: string;
    /** Button element that removes the currently uploaded file. */
    removeButton: Knot;
    /** Map of MIME types to `[extension, color]` tuples for document icons. */
    fileTypes: {
        [key: string]: [string, string];
    };
    /** SVG template string used to generate document-type file icons. */
    fileTypeSVG: string;
    /**
     * @param input The underlying `<input type="file">` element wrapped in a {@link Knot}.
     * @param label The associated label element.
     * @param error The element used to display validation errors.
     * @param inputBlock The block-level container wrapping the entire field.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * Initializes the file field by setting up the file icon map, remove
     * button, browse button, default image, and change listener.
     */
    private _init;
    /**
     * Checks whether the input's `accept` attribute includes document types.
     *
     * @returns `true` if the field accepts docx, xlsx, or pdf files.
     */
    private _isDocument;
    /**
     * Locates or creates the `<img>` preview element inside the input block.
     */
    private _initDefaultImg;
    /**
     * Reads the initial image source from the DOM and sets the default
     * placeholder when no value is present.
     */
    private _initValueSrc;
    /**
     * Creates the remove button and binds its click handler.
     */
    private _initRemoveButton;
    /**
     * Creates the browse button that opens the native file dialog.
     */
    private _initButtons;
    /**
     * Finds the file type entry by MIME type.
     *
     * @param mimeType The MIME type to look up (e.g. `'application/pdf'`).
     * @returns A tuple of `[extension, color]` or `undefined`.
     */
    private _lookupByMimeType;
    /**
     * Finds the file type entry by file extension.
     *
     * @param extension The file extension to look up (e.g. `'pdf'`).
     * @returns A tuple of `[mimeType, color]` or an empty array.
     */
    private _lookupByExtension;
    /**
     * Defines the supported document MIME types and their corresponding
     * extensions/colors, and sets up the SVG template for file icons.
     */
    private _initFileIcon;
    /**
     * Generates a base64-encoded SVG data URL for a document file icon.
     *
     * @param type The file extension label rendered on the icon.
     * @param color The fill color of the icon badge.
     * @returns A `data:image/svg+xml;base64,...` URL.
     */
    private _getFileIconSrc;
    /**
     * Applies MDL text-field classes and refreshes the visual state.
     *
     * @override
     */
    render(): void;
    /**
     * Validates required state, toggles the remove button visibility, and
     * upgrades MDL components.
     *
     * @override
     */
    refresh(): void;
    /**
     * Reads the selected file as a data URL and updates the preview.
     *
     * @param file The file selected by the user.
     */
    private _read;
    /**
     * Shows the remove button when a non-required field has a value,
     * otherwise hides it.
     */
    private _handleRemoveButton;
    /**
     * Clears the current file value, restores the default placeholder, and
     * notifies the model.
     */
    private _remove;
    /**
     * Sets the field value from a URL string or an object with a `url`
     * property, updates the image preview, and notifies the model.
     *
     * @param value The file URL or object containing a `url` key.
     * @override
     */
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
}

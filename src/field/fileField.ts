import {
    contain,
    format,
    isPureObject,
    getExtensionName,
} from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { encodeBase64 } from '../utils/coder';
import { mdl } from '../utils/render';

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
export class FileField extends BaseField<HTMLInputElement> {
    /** Image element used to preview the uploaded file or placeholder icon. */
    imageTag!: Knot;
    /** Base64 data URL of the currently uploaded file, or `null` if empty. */
    valueSrc!: string | null;
    /** Default placeholder image source shown when no file is selected. */
    defaultSrc!: string;
    /** Button element that removes the currently uploaded file. */
    removeButton!: Knot;
    /** Map of MIME types to `[extension, color]` tuples for document icons. */
    fileTypes!: { [key: string]: [string, string] };
    /** SVG template string used to generate document-type file icons. */
    fileTypeSVG!: string;

    /**
     * @param input The underlying `<input type="file">` element wrapped in a {@link Knot}.
     * @param label The associated label element.
     * @param error The element used to display validation errors.
     * @param inputBlock The block-level container wrapping the entire field.
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

    /**
     * Initializes the file field by setting up the file icon map, remove
     * button, browse button, default image, and change listener.
     */
    private _init(): void {
        this.inputBlock.addClass('file-field');

        this._initFileIcon();
        this._initRemoveButton();
        this._initButtons();
        this._initDefaultImg();
        this._initValueSrc();

        this.input.addEventListener('change', (inputKnot) => {
            const inputNode = inputKnot.getNode();
            const file = inputNode.files![0];
            this._read(file);
            return true;
        });
    }

    /**
     * Checks whether the input's `accept` attribute includes document types.
     *
     * @returns `true` if the field accepts docx, xlsx, or pdf files.
     */
    private _isDocument(): boolean {
        const accept = this.input.getAttribute('accept') ?? '';
        return (
            contain(accept, '.docx') ||
            contain(accept, '.xlsx') ||
            contain(accept, '.pdf')
        );
    }

    /**
     * Locates or creates the `<img>` preview element inside the input block.
     */
    private _initDefaultImg(): void {
        this.imageTag = new Query('img', this.inputBlock).getKnot();
        if (this.imageTag.isEmpty()) {
            this.imageTag = new Knot<HTMLImageElement>('img');
            this.inputBlock.beforeChild(this.imageTag);
        }
    }

    /**
     * Reads the initial image source from the DOM and sets the default
     * placeholder when no value is present.
     */
    private _initValueSrc(): void {
        this.valueSrc = this.imageTag.getAttribute('src');

        this.defaultSrc = this.input.getAttribute('data-default-value');
        if (!this.defaultSrc) {
            const color = this.isRequired()
                ? 'grey;stroke:red;stroke-width:10;stroke-dasharray:15,10'
                : 'grey';
            this.defaultSrc = this._getFileIconSrc('N/A', color);
        }

        this.imageTag.setAttribute('src', this.valueSrc || this.defaultSrc);
    }

    /**
     * Creates the remove button and binds its click handler.
     */
    private _initRemoveButton(): void {
        this.removeButton = new Knot('a');
        this.removeButton.setAttribute('href', 'javascript:void(0)');
        this.removeButton.addClass(['remove-button', 'material-icons']);
        this.removeButton.setHtml('delete');
        this.removeButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                this._remove();
            }
        });
        this.actionContainerKnot.appendChild(this.removeButton);
    }

    /**
     * Creates the browse button that opens the native file dialog.
     */
    private _initButtons(): void {
        const browseButton = new Knot('a');
        browseButton.setAttribute('href', 'javascript:void(0)');
        browseButton.addClass(['browse-button', 'material-icons']);
        if (this._isDocument()) {
            browseButton.setHtml('description');
        } else {
            browseButton.setHtml('image');
        }
        browseButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.input.getNode().click();
            }
        });
        this.actionContainerKnot.appendChild(browseButton);
    }

    /**
     * Finds the file type entry by MIME type.
     *
     * @param mimeType The MIME type to look up (e.g. `'application/pdf'`).
     * @returns A tuple of `[extension, color]` or `undefined`.
     */
    private _lookupByMimeType(mimeType: string): [string, string] {
        return this.fileTypes[mimeType];
    }

    /**
     * Finds the file type entry by file extension.
     *
     * @param extension The file extension to look up (e.g. `'pdf'`).
     * @returns A tuple of `[mimeType, color]` or an empty array.
     */
    private _lookupByExtension(extension: string): [string, string] | [] {
        let results: [string, string] | [] = [];
        for (const key in this.fileTypes) {
            if (Object.hasOwn(this.fileTypes, key)) {
                const fileType = this.fileTypes[key];
                if (fileType[0] === extension) {
                    const color = fileType[1];
                    results = [key, color];
                }
            }
        }
        return results;
    }

    /**
     * Defines the supported document MIME types and their corresponding
     * extensions/colors, and sets up the SVG template for file icons.
     */
    private _initFileIcon(): void {
        this.fileTypes = {
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                ['docx', 'blue'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                ['xlsx', 'green'],
            'application/pdf': ['pdf', 'red'],
        };

        this.fileTypeSVG =
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
            '<path style="fill:#E2E5E7;" d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"/>' +
            '<path style="fill:#B0B7BD;" d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"/>' +
            '<polygon style="fill:#CAD1D8;" points="480,224 384,128 480,128 "/>' +
            '<path style="fill:#CAD1D8;" d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"/>' +
            '<path style="fill:#000000;" d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16V416z"/>' +
            '<text x="220" y="380" text-anchor="middle" style="fill:#FFF;font-weight:700;font-family:Arial;font-size:120px;">TYPE</text>' +
            '</svg>';
    }

    /**
     * Generates a base64-encoded SVG data URL for a document file icon.
     *
     * @param type The file extension label rendered on the icon.
     * @param color The fill color of the icon badge.
     * @returns A `data:image/svg+xml;base64,...` URL.
     */
    private _getFileIconSrc(type: string, color: string): string {
        let svg = this.fileTypeSVG;
        svg = svg.replace('#000000', color);
        svg = svg.replace('TYPE', type);
        const data = encodeBase64(svg);
        return format('data:image/svg+xml;base64,{0}', [data]);
    }

    /**
     * Applies MDL text-field classes and refreshes the visual state.
     *
     * @override
     */
    override render(): void {
        this.inputBlock.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        this.input.addClass('mdl-textfield__input');
        if (this.label && this.label.exists()) {
            this.label.addClass('mdl-textfield__label');
        }
        this.refresh();
    }

    /**
     * Validates required state, toggles the remove button visibility, and
     * upgrades MDL components.
     *
     * @override
     */
    override refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        this._handleRemoveButton();

        mdl(this.inputBlock);
    }

    /**
     * Reads the selected file as a data URL and updates the preview.
     *
     * @param file The file selected by the user.
     */
    private _read(file: File): void {
        if (file) {
            const filename = file.name;
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const target = event.target!;
                const searchStr = ';base64,';
                let imageSrc = (target.result as string).replace(
                    searchStr,
                    ';filename=' + filename + searchStr,
                );
                this.valueSrc = imageSrc;
                if (!contain(file.type, 'image/')) {
                    const [type, color] = this._lookupByMimeType(file.type);
                    imageSrc = this._getFileIconSrc(type, color);
                }
                this.imageTag.setAttribute('src', imageSrc);
                this._handleRemoveButton();

                this.modelChange(this.valueSrc);
            };
            fileReader.readAsDataURL(file);
        }
    }

    /**
     * Shows the remove button when a non-required field has a value,
     * otherwise hides it.
     */
    private _handleRemoveButton(): void {
        if (!this.isRequired() && this.valueSrc) {
            this.removeButton.removeClass('hidden');
        } else {
            this.removeButton.addClass('hidden');
        }
    }

    /**
     * Clears the current file value, restores the default placeholder, and
     * notifies the model.
     */
    private _remove(): void {
        this.input.getNode().value = '';
        this.valueSrc = null;

        if (this.defaultSrc) {
            this.imageTag.setAttribute('src', this.defaultSrc);
        } else {
            this.imageTag.removeAttribute('src');
        }
        this._handleRemoveButton();

        this.modelChange(null);
    }

    /**
     * Sets the field value from a URL string or an object with a `url`
     * property, updates the image preview, and notifies the model.
     *
     * @param value The file URL or object containing a `url` key.
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
        let imageSrc = value;
        if (isPureObject(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            imageSrc = (value as Record<string, any>)['url'];
        }
        if (imageSrc) {
            this.valueSrc = imageSrc as string;
            if (this._isDocument()) {
                const extension = getExtensionName(imageSrc as string);
                const [_mimeType, color] = this._lookupByExtension(extension);
                imageSrc = this._getFileIconSrc(extension, color || '');
            }
            this.imageTag.setAttribute('src', imageSrc);
            this._handleRemoveButton();
        }
        this.modelChange('');
    }
}

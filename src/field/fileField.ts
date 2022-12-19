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
 * @class
 * @extends {BaseField}
 */
export class FileField extends BaseField<HTMLInputElement> {
    imageTag: Knot;
    valueSrc: string;
    defaultSrc: string;
    removeButton: Knot;
    fileTypes: { [key: string]: [string, string] };
    fileTypeSVG: string;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
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
     * @private
     * @return {undefined}
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
            const file = inputNode.files[0];
            this._read(file);
            return true;
        });
    }
    /**
     * @private
     * @return {boolean}
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
     * @private
     * @return {undefined}
     */
    private _initDefaultImg(): void {
        this.imageTag = new Query('img', this.inputBlock).getKnot();
        if (this.imageTag.isEmpty()) {
            this.imageTag = new Knot<HTMLImageElement>('img');
            this.inputBlock.beforeChild(this.imageTag);
        }
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @param {string} mimeType
     * @return {!Array}
     */
    private _lookupByMimeType(mimeType: string): Array<any> {
        return this.fileTypes[mimeType];
    }
    /**
     * @private
     * @param {string} extension
     * @return {!Array}
     */
    private _lookupByExtension(extension: string): Array<any> {
        let results = [];
        for (const key in this.fileTypes) {
            if (Object.hasOwnProperty.call(this.fileTypes, key)) {
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
     * @private
     * @return {undefined}
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
     * @private
     * @param {string} type
     * @param {string} color
     * @return {string}
     */
    private _getFileIconSrc(type: string, color: string): string {
        let svg = this.fileTypeSVG;
        svg = svg.replace('#000000', color);
        svg = svg.replace('TYPE', type);
        const data = encodeBase64(svg);
        return format('data:image/svg+xml;base64,{0}', [data]);
    }
    /**
     * @override
     * @return {undefined}
     */
    render(): void {
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
     * @override
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        this._handleRemoveButton();

        mdl(this.inputBlock);
    }
    /**
     * @private
     * @param {!File} file
     * @return {undefined}
     */
    private _read(file: File): void {
        if (file) {
            const filename = file.name;
            const reader = new FileReader();
            reader.onload = (event) => {
                const target = event.target;
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
            reader.readAsDataURL(file);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _handleRemoveButton(): void {
        if (!this.isRequired() && this.valueSrc) {
            this.removeButton.removeClass('hidden');
        } else {
            this.removeButton.addClass('hidden');
        }
    }
    /**
     * @private
     * @return {undefined}
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
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(
        value:
            | Object
            | Function
            | Array<any>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        let imageSrc = value;
        if (isPureObject(value)) {
            imageSrc = value['url'];
        }
        if (imageSrc) {
            this.valueSrc = imageSrc as string;
            if (this._isDocument()) {
                const extension = getExtensionName(imageSrc as string);
                const [_mimeType, color] = this._lookupByExtension(extension);
                imageSrc = this._getFileIconSrc(extension, color);
            }
            this.imageTag.setAttribute('src', imageSrc);
            this._handleRemoveButton();
        }
        this.modelChange('');
    }
}

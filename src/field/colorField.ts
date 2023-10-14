import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Canvas } from '../component/canvas';
import { Popup } from '../component/popup';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { convertRGBToHEX } from '../utils/color';

export class ColorField extends BaseField<HTMLInputElement> {
    tooltip: Tooltip;
    previewKnot: Knot;
    colorKnot: Knot;
    popup: Popup;
    canvas: Canvas;
    image: Knot<HTMLImageElement>;
    colors: string[][];

    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

    private _init(): void {
        this.inputBlock.addClass('color-field');

        this._initInput();
        this._initImage();
        this._initPreview();
        this._setMaterialColors();
    }

    render() {
        if (this.label && this.label.exists()) {
            this.label.addClass('field-label');
        }

        this.refresh();
    }

    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
            this.inputBlock.removeClass('is-disabled');
        }

        const color = this.getValue() || '#000000';
        this.setValue(color);
    }

    private _initInput(): void {
        this.input.addClass('hidden');

        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.tooltip.setMessage(inputNode.value);
            this.previewKnot.setStyle({
                background: inputNode.value,
            });
            this.modelChange(inputNode.value);
            return true;
        });
    }

    private _initPreview(): void {
        this.previewKnot = new Knot('div');
        this.previewKnot.addClass('preview');
        this.inputBlock.beforeChild(this.previewKnot);

        this.colorKnot = new Knot('div');
        this.colorKnot.addClass('color');
        this.previewKnot.appendChild(this.colorKnot);

        this.popup = new Popup(this.canvas.canvasKnot, this.inputBlock);

        this.tooltip = new Tooltip(this.previewKnot);

        this.previewKnot.addEventListener('click', () => {
            if (this.isEnabled()) {
                this._draw();
                this.popup.open();
            }
        });
    }

    private _draw(): void {
        if (!this.image.isEmpty()) {
            const width = typeCast(this.image.getAttribute('width'));
            const height = typeCast(this.image.getAttribute('height'));
            this.canvas.setSize(width, height);
            this.canvas.drawImage(this.image, width, height);
        } else {
            // 19x11
            const maxX = this.colors[0].length;
            const maxY = this.colors.length;
            const size = 15;
            this.canvas.setSize(maxX * size, maxY * size);
            for (let i = 0; i < maxX; i++) {
                for (let j = 0; j < maxY; j++) {
                    this.canvas.drawRectangle(
                        i * size,
                        j * size,
                        size,
                        size,
                        0,
                        {
                            fillStyle: this.colors[j][i],
                        },
                    );
                }
            }
        }
    }

    private _initImage(): void {
        this.image = new Query<HTMLImageElement>(
            'img',
            this.inputBlock,
        ).getKnot();
        if (!this.image.isEmpty()) {
            this.image.addClass('hidden');
        }

        this.canvas = new Canvas();
        this.canvas.canvasKnot.addEventListener('click', (_image, e) => {
            let x = 0;
            let y = 0;
            if (e.offsetX) {
                x = e.offsetX;
                y = e.offsetY;
            } else if (e.layerX) {
                x = e.layerX;
                y = e.layerY;
            }
            const rgb = this.canvas.getImageDataXY(x, y) as any as [
                number,
                number,
                number,
            ];
            const hex = convertRGBToHEX(...rgb);

            this.setValue(hex);
            this.popup.close();
        });
    }

    private _setMaterialColors(): void {
        const colors50 = [
            '#ffebee',
            '#fce4ec',
            '#f3e5f5',
            '#ede7f6',
            '#e8eaf6',
            '#e3f2fd',
            '#e1f5fe',
            '#e0f7fa',
            '#e0f2f1',
            '#e8f5e9',
            '#f1f8e9',
            '#f9fbe7',
            '#fffde7',
            '#fff8e1',
            '#fff3e0',
            '#fbe9e7',
            '#efebe9',
            '#fafafa',
            '#eceff1',
        ];
        const colors100 = [
            '#ffcdd2',
            '#f8bbd0',
            '#e1bee7',
            '#d1c4e9',
            '#c5cae9',
            '#bbdefb',
            '#b3e5fc',
            '#b2ebf2',
            '#b2dfdb',
            '#c8e6c9',
            '#dcedc8',
            '#f0f4c3',
            '#fff9c4',
            '#ffecb3',
            '#ffe0b2',
            '#ffccbc',
            '#d7ccc8',
            '#f5f5f5',
            '#cfd8dc',
        ];
        const colors200 = [
            '#ef9a9a',
            '#f48fb1',
            '#ce93d8',
            '#b39ddb',
            '#9fa8da',
            '#90caf9',
            '#81d4fa',
            '#80deea',
            '#80cbc4',
            '#a5d6a7',
            '#c5e1a5',
            '#e6ee9c',
            '#fff59d',
            '#ffe082',
            '#ffcc80',
            '#ffab91',
            '#bcaaa4',
            '#eeeeee',
            '#b0bec5',
        ];
        const colors300 = [
            '#e57373',
            '#f06292',
            '#ba68c8',
            '#9575cd',
            '#7986cb',
            '#64b5f6',
            '#4fc3f7',
            '#4dd0e1',
            '#4db6ac',
            '#81c784',
            '#aed581',
            '#dce775',
            '#fff176',
            '#ffd54f',
            '#ffb74d',
            '#ff8a65',
            '#a1887f',
            '#e0e0e0',
            '#90a4ae',
        ];
        const colors400 = [
            '#ef5350',
            '#ec407a',
            '#ab47bc',
            '#7e57c2',
            '#5c6bc0',
            '#42a5f5',
            '#29b6f6',
            '#26c6da',
            '#26a69a',
            '#66bb6a',
            '#9ccc65',
            '#d4e157',
            '#ffee58',
            '#ffca28',
            '#ffa726',
            '#ff7043',
            '#8d6e63',
            '#bdbdbd',
            '#78909c',
        ];
        const colors500 = [
            '#f44336',
            '#e91e63',
            '#9c27b0',
            '#673ab7',
            '#3f51b5',
            '#2196f3',
            '#03a9f4',
            '#00bcd4',
            '#009688',
            '#4caf50',
            '#8bc34a',
            '#cddc39',
            '#ffeb3b',
            '#ffc107',
            '#ff9800',
            '#ff5722',
            '#795548',
            '#9e9e9e',
            '#607d8b',
        ];
        const colors600 = [
            '#e53935',
            '#d81b60',
            '#8e24aa',
            '#5e35b1',
            '#3949ab',
            '#1e88e5',
            '#039be5',
            '#00acc1',
            '#00897b',
            '#43a047',
            '#7cb342',
            '#c0ca33',
            '#fdd835',
            '#ffb300',
            '#fb8c00',
            '#f4511e',
            '#6d4c41',
            '#757575',
            '#546e7a',
        ];
        const colors700 = [
            '#d32f2f',
            '#c2185b',
            '#7b1fa2',
            '#512da8',
            '#303f9f',
            '#1976d2',
            '#0288d1',
            '#0097a7',
            '#00796b',
            '#388e3c',
            '#689f38',
            '#afb42b',
            '#fbc02d',
            '#ffa000',
            '#f57c00',
            '#e64a19',
            '#5d4037',
            '#616161',
            '#455a64',
        ];
        const colors800 = [
            '#c62828',
            '#ad1457',
            '#6a1b9a',
            '#4527a0',
            '#283593',
            '#1565c0',
            '#0277bd',
            '#00838f',
            '#00695c',
            '#2e7d32',
            '#558b2f',
            '#9e9d24',
            '#f9a825',
            '#ff8f00',
            '#ef6c00',
            '#d84315',
            '#4e342e',
            '#424242',
            '#37474f',
        ];
        const colors900 = [
            '#b71c1c',
            '#880e4f',
            '#4a148c',
            '#311b92',
            '#1a237e',
            '#0d47a1',
            '#01579b',
            '#006064',
            '#004d40',
            '#1b5e20',
            '#33691e',
            '#827717',
            '#f57f17',
            '#ff6f00',
            '#e65100',
            '#bf360c',
            '#3e2723',
            '#212121',
            '#263238',
        ];

        this.colors = [
            colors500,
            colors50,
            colors100,
            colors200,
            colors300,
            colors400,
            colors500,
            colors600,
            colors700,
            colors800,
            colors900,
        ];
    }
}

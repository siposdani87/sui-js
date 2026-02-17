import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';

export class Viewer extends BaseModal {
    options!: Objekt;

    constructor(opt_options: object | undefined = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: '#viewer',
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id, this.body).getKnot();
        this.modalWindow = new Query('#viewer-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }

    loadImage(imageUrl: string, opt_title: string | undefined = ''): void {
        this._reset();

        this._setImage(imageUrl);
        this._setTitle(opt_title);

        this.open();
    }

    private _setImage(imageUrl: string): void {
        const imageKnot = new Knot<HTMLImageElement>('img');
        imageKnot.setAttribute('src', imageUrl);

        this.modalBody.appendChild(imageKnot);
    }
}

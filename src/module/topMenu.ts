import { Knot } from '../core';
import { Query } from '../core/query';
import { Header } from './header';

export class TopMenu {
    header: Header;
    topMenu!: Knot;
    toggleTopMenu!: Knot;

    constructor(header: Header) {
        this.header = header;
        this._init();
    }

    private _init(): void {
        this.topMenu = new Query('#top-menu', this.header.headerKnot).getKnot();

        this.toggleTopMenu = new Query(
            '#toggle-top-menu',
            this.header.headerKnot,
        ).getKnot();
        this.toggleTopMenu.setAttribute('href', 'javascript:void(0)');
        this.toggleTopMenu.addEventListener('click', () => {
            this.toggle();
        });
    }

    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }

    isOpened(): boolean {
        return this.topMenu.hasClass('visible-flex');
    }

    open(): void {
        this.header.open();
        this.topMenu.addClass('visible-flex');
        this.toggleTopMenu.addClass('active');
        this.header.showShadow();
    }

    close(): void {
        this.header.close();
        this.topMenu.removeClass('visible-flex');
        this.toggleTopMenu.removeClass('active');
        this.header.hideShadow();
    }

    getContainer(): Knot {
        return this.topMenu;
    }
}

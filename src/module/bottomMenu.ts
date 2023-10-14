import { Knot } from '../core';
import { Query } from '../core/query';
import { Footer } from './footer';

export class BottomMenu {
    footer: Footer;
    bottomMenu: Knot;

    constructor(footer: Footer) {
        this.footer = footer;
        this._init();
    }

    private _init(): void {
        this.bottomMenu = new Query(
            '#bottom-menu',
            this.footer.footerKnot,
        ).getKnot();

        const openBottomMenu = new Query(
            '#open-bottom-menu',
            this.footer.footerKnot,
        ).getKnot();
        openBottomMenu.setAttribute('href', 'javascript:void(0)');
        openBottomMenu.addEventListener('click', () => {
            this.toggle();
        });

        const closeBottomMenu = new Query(
            '#close-bottom-menu',
            this.footer.footerKnot,
        ).getKnot();
        closeBottomMenu.setAttribute('href', 'javascript:void(0)');
        closeBottomMenu.addEventListener('click', () => {
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
        return this.bottomMenu.hasClass('visible-flex');
    }

    open(): void {
        this.bottomMenu.addClass('visible-flex');
        this.footer.open();
    }

    close(): void {
        this.bottomMenu.removeClass('visible-flex');
        this.footer.close();
    }

    getContainer(): Knot {
        return this.bottomMenu;
    }
}

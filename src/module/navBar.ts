import { Knot } from '../core';
import { Query } from '../core/query';

export class NavBar {
    navBarHeader: Knot;
    navBar: Knot;
    toggleNavBarIcon: Knot;

    constructor() {
        this._init();
    }

    private _init(): void {
        this.navBarHeader = new Query('.nav-bar-header').getKnot();
        this.navBar = new Query('#nav-bar', this.navBarHeader).getKnot();

        const toggleNavBar = new Query(
            '#toggle-nav-bar',
            this.navBarHeader,
        ).getKnot();
        toggleNavBar.setAttribute('href', 'javascript:void(0)');
        toggleNavBar.addEventListener('click', () => {
            this.toggle();
        });
        this.toggleNavBarIcon = new Query('em', toggleNavBar).getKnot();
    }

    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }

    isOpened(): boolean {
        return this.navBar.hasClass('open');
    }

    open(): void {
        this.navBar.addClass('open');
        this.toggleNavBarIcon.setHtml('close');
    }

    close(): void {
        this.navBar.removeClass('open');
        this.toggleNavBarIcon.setHtml('menu');
    }

    show(): void {
        this.navBarHeader.removeClass('hidden');
    }

    hide(): void {
        this.navBarHeader.addClass('hidden');
    }

    showShadow(): void {
        this.navBar.addClass('shadow');
    }

    hideShadow(): void {
        this.navBar.removeClass('shadow');
    }

    getContainer(): Knot {
        return this.navBar;
    }
}

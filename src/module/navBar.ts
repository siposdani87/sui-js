import { Knot } from '../core';
import { Query } from '../core/query';

/**
 * @class
 */
export class NavBar {
    navBarHeader: Knot;
    navBar: Knot;
    toggleNavBarIcon: Knot;
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
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
    /**
     * @return {undefined}
     */
    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
    /**
     * @return {boolean}
     */
    isOpened(): boolean {
        return this.navBar.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.navBar.addClass('open');
        this.toggleNavBarIcon.setHtml('close');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.navBar.removeClass('open');
        this.toggleNavBarIcon.setHtml('menu');
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.navBarHeader.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.navBarHeader.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    showShadow(): void {
        this.navBar.addClass('shadow');
    }
    /**
     * @return {undefined}
     */
    hideShadow(): void {
        this.navBar.removeClass('shadow');
    }
    /**
     * @return {!Knot}
     */
    getContainer(): Knot {
        return this.navBar;
    }
}

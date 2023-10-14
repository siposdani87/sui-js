import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';

export class Header {
    options: Objekt;
    headerKnot: Knot;
    leftMenuButton: Knot;
    topMenuButton: Knot;
    brandKnot: Knot;
    brandKnotImage: Knot;
    brandKnotTitle: Knot;
    mainContainerKnot: Knot;
    templateViewKnot: Knot;

    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.headerKnot = new Query('#header').getKnot();

        this.leftMenuButton = new Query(
            '#open-left-menu',
            this.headerKnot,
        ).getKnot();
        this.topMenuButton = new Query(
            '#toggle-top-menu',
            this.headerKnot,
        ).getKnot();

        this.brandKnot = new Query('.brand', this.headerKnot).getKnot();
        this.brandKnot.setAttribute('href', 'javascript:void(0)');
        this.brandKnot.addEventListener('click', () => {
            this.eventLogoClick();
        });

        this.brandKnotImage = new Query('.brand img', this.brandKnot).getKnot();
        this.brandKnotTitle = new Query(
            '.brand .app-title',
            this.brandKnot,
        ).getKnot();

        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
    }

    eventLogoClick(): void {
        consoleDebug('Header.eventLogoClick()');
    }

    setTitle(title: string): void {
        this.brandKnotTitle.setHtml(title);
    }

    setUrl(url: string): void {
        this.brandKnot.setAttribute('href', url);
    }

    setImage(imagePath: string): void {
        this.brandKnotImage.setAttribute('src', imagePath);
    }

    open(): void {
        this.headerKnot.addClass('open');
    }

    close(): void {
        this.headerKnot.removeClass('open');
    }

    show(): void {
        this.headerKnot.removeClass('hidden');
        this.mainContainerKnot.addClass('header-padding');
        this.templateViewKnot.addClass('has-header');
    }

    hide(): void {
        this.headerKnot.addClass('hidden');
        this.mainContainerKnot.removeClass('header-padding');
        this.templateViewKnot.removeClass('has-header');
    }

    showShadow(): void {
        this.headerKnot.addClass('shadow');
    }

    hideShadow(): void {
        this.headerKnot.removeClass('shadow');
    }

    showLeftMenuButton(): void {
        this.leftMenuButton.removeClass('hidden');
    }

    hideLeftMenuButton(): void {
        this.leftMenuButton.addClass('hidden');
    }

    showTopMenuButton(): void {
        this.topMenuButton.removeClass('hidden');
    }

    hideTopMenuButton(): void {
        this.topMenuButton.addClass('hidden');
    }
}

import { noop } from '../utils/operation';
import { Query } from '../core/query';
import { Knot } from '../core';

export class LeftMenu {
    body!: Knot;
    mainContainerKnot!: Knot;
    leftMenu!: Knot;
    mainMenu!: Knot;
    subMenu!: Knot;
    mainMenuContainer!: Knot;
    subMenuContainer!: Knot;
    mainMenuTitle!: Knot;
    subMenuTitle!: Knot;

    constructor() {
        this._init();
    }

    private _init(): void {
        this.body = new Query('body').getKnot();
        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.leftMenu = new Query('#left-menu').getKnot();

        this.mainMenu = new Query('.main-menu', this.leftMenu).getKnot();
        this.subMenu = new Query('.sub-menu', this.leftMenu).getKnot();
        this.subMenu.addClass('hidden');

        this.mainMenuContainer = new Query(
            '.menu-container',
            this.mainMenu,
        ).getKnot();
        this.subMenuContainer = new Query(
            '.menu-container',
            this.subMenu,
        ).getKnot();

        this.mainMenuTitle = new Query('h3', this.mainMenu).getKnot();
        this.subMenuTitle = new Query('h3', this.subMenu).getKnot();

        this._initEvents();
    }

    private _initEvents() {
        this.leftMenu.addEventListener('click', () => {
            this.close();
        });

        this.mainMenuContainer.addEventListener('click', () => {
            noop();
            return true;
        });
        this.subMenuContainer.addEventListener('click', () => {
            noop();
            return true;
        });

        const openLeftMenu = new Query('#open-left-menu').getKnot();
        openLeftMenu.setAttribute('href', 'javascript:void(0)');
        openLeftMenu.addEventListener('click', () => {
            this.open();
        });

        const closeLeftMenu = new Query(
            '#close-left-menu',
            this.mainMenu,
        ).getKnot();
        closeLeftMenu.setAttribute('href', 'javascript:void(0)');
        closeLeftMenu.addEventListener('click', () => {
            this.close();
        });

        const closeSubMenu = new Query(
            '#close-sub-menu',
            this.subMenu,
        ).getKnot();
        closeSubMenu.setAttribute('href', 'javascript:void(0)');
        closeSubMenu.addEventListener('click', () => {
            this.closeSubMenu();
        });
    }

    open(opt_title: string | undefined = ''): void {
        this.body.addClass('overflow-hidden');
        this.mainContainerKnot.addClass('blur');

        this.leftMenu.addClass('visible-block');

        this.mainMenuTitle.setHtml(opt_title);
    }

    close(): void {
        this.body.removeClass('overflow-hidden');
        this.mainContainerKnot.removeClass('blur');
        this.leftMenu.removeClass('visible-block');
    }

    openSubMenu(opt_title: string | undefined = ''): void {
        this.mainMenu.addClass('hidden');
        this.subMenu.removeClass('hidden');
        this.subMenuTitle.setHtml(opt_title);
    }

    closeSubMenu(): void {
        this.mainMenu.removeClass('hidden');
        this.subMenu.addClass('hidden');
    }

    getMainContainer(): Knot {
        return this.mainMenuContainer;
    }

    getSubContainer(): Knot {
        return this.subMenuContainer;
    }
}

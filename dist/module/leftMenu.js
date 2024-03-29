import { noop } from '../utils/operation';
import { Query } from '../core/query';
export class LeftMenu {
    constructor() {
        this._init();
    }
    _init() {
        this.body = new Query('body').getKnot();
        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.leftMenu = new Query('#left-menu').getKnot();
        this.mainMenu = new Query('.main-menu', this.leftMenu).getKnot();
        this.subMenu = new Query('.sub-menu', this.leftMenu).getKnot();
        this.subMenu.addClass('hidden');
        this.mainMenuContainer = new Query('.menu-container', this.mainMenu).getKnot();
        this.subMenuContainer = new Query('.menu-container', this.subMenu).getKnot();
        this.mainMenuTitle = new Query('h3', this.mainMenu).getKnot();
        this.subMenuTitle = new Query('h3', this.subMenu).getKnot();
        this._initEvents();
    }
    _initEvents() {
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
        const closeLeftMenu = new Query('#close-left-menu', this.mainMenu).getKnot();
        closeLeftMenu.setAttribute('href', 'javascript:void(0)');
        closeLeftMenu.addEventListener('click', () => {
            this.close();
        });
        const closeSubMenu = new Query('#close-sub-menu', this.subMenu).getKnot();
        closeSubMenu.setAttribute('href', 'javascript:void(0)');
        closeSubMenu.addEventListener('click', () => {
            this.closeSubMenu();
        });
    }
    open(opt_title = '') {
        this.body.addClass('overflow-hidden');
        this.mainContainerKnot.addClass('blur');
        this.leftMenu.addClass('visible-block');
        this.mainMenuTitle.setHtml(opt_title);
    }
    close() {
        this.body.removeClass('overflow-hidden');
        this.mainContainerKnot.removeClass('blur');
        this.leftMenu.removeClass('visible-block');
    }
    openSubMenu(opt_title = '') {
        this.mainMenu.addClass('hidden');
        this.subMenu.removeClass('hidden');
        this.subMenuTitle.setHtml(opt_title);
    }
    closeSubMenu() {
        this.mainMenu.removeClass('hidden');
        this.subMenu.addClass('hidden');
    }
    getMainContainer() {
        return this.mainMenuContainer;
    }
    getSubContainer() {
        return this.subMenuContainer;
    }
}

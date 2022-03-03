import { noop } from '../utils/operation';
import { Query } from '../core/query';
/**
 * @class
 */
export class LeftMenu {
    body;
    mainContainerNode;
    leftMenu;
    mainMenu;
    subMenu;
    mainMenuContainer;
    subMenuContainer;
    mainMenuTitle;
    subMenuTitle;
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.body = new Query('body').getItem();
        this.mainContainerNode = new Query('.main-container').getItem();
        this.leftMenu = new Query('#left-menu').getItem();
        this.mainMenu = new Query('.main-menu', this.leftMenu).getItem();
        this.subMenu = new Query('.sub-menu', this.leftMenu).getItem();
        this.subMenu.addClass('hidden');
        this.mainMenuContainer = new Query('.menu-container', this.mainMenu).getItem();
        this.subMenuContainer = new Query('.menu-container', this.subMenu).getItem();
        this.mainMenuTitle = new Query('h3', this.mainMenu).getItem();
        this.subMenuTitle = new Query('h3', this.subMenu).getItem();
        this._initEvents();
    }
    /**
     * @private
     */
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
        const openLeftMenu = new Query('#open-left-menu').getItem();
        openLeftMenu.setAttribute('href', 'javascript:void(0)');
        openLeftMenu.addEventListener('click', () => {
            this.open();
        });
        const closeLeftMenu = new Query('#close-left-menu', this.mainMenu).getItem();
        closeLeftMenu.setAttribute('href', 'javascript:void(0)');
        closeLeftMenu.addEventListener('click', () => {
            this.close();
        });
        const closeSubMenu = new Query('#close-sub-menu', this.subMenu).getItem();
        closeSubMenu.setAttribute('href', 'javascript:void(0)');
        closeSubMenu.addEventListener('click', () => {
            this.closeSubMenu();
        });
    }
    /**
     * @param {string=} opt_title
     * @return {undefined}
     */
    open(opt_title = '') {
        this.body.addClass('overflow-hidden');
        this.mainContainerNode.addClass('blur');
        this.leftMenu.addClass('visible');
        this.mainMenuTitle.setHtml(opt_title);
    }
    /**
     * @return {undefined}
     */
    close() {
        this.body.removeClass('overflow-hidden');
        this.mainContainerNode.removeClass('blur');
        this.leftMenu.removeClass('visible');
    }
    /**
     * @param {string=} opt_title
     * @return {undefined}
     */
    openSubMenu(opt_title = '') {
        this.mainMenu.addClass('hidden');
        this.subMenu.removeClass('hidden');
        this.subMenuTitle.setHtml(opt_title);
    }
    /**
     * @return {undefined}
     */
    closeSubMenu() {
        this.mainMenu.removeClass('hidden');
        this.subMenu.addClass('hidden');
    }
    /**
     * @return {!Item}
     */
    getMainContainer() {
        return this.mainMenuContainer;
    }
    /**
     * @return {!Item}
     */
    getSubContainer() {
        return this.subMenuContainer;
    }
}

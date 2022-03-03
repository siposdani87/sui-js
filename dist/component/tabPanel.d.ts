import { Query } from '../core/query';
/**
 * @class
 * @export
 */
export declare class TabPanel {
    tabPanel: any;
    options: {
        selected_tab: string;
        default_tab: string;
    };
    activeTab: any;
    tabs: Query;
    panels: Query;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {string=} opt_selectedTab
     * @param {string=} opt_defaultTab
     */
    constructor(dom: any, opt_selector?: string, opt_selectedTab?: string, opt_defaultTab?: string);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initTabs(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initPanels(): void;
    /**
     * @private
     * @param {string} panelId
     * @return {undefined}
     */
    _setActive(panelId: any): void;
    /**
     * @param {string} panelId
     * @return {undefined}
     */
    eventChange(panelId: any): void;
    /**
     * @param {string} panelId
     * @return {!Promize}
     */
    setActive(panelId: any): import("..").Promize;
    /**
     * @return {string}
     */
    getActive(): any;
}

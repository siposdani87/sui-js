import { Query } from '../core/query';
import { Knot } from '../core';
export declare class TabPanel {
    tabPanel: Knot;
    options: {
        selected_tab: string;
        default_tab: string;
    };
    activeTab: string;
    tabs: Query;
    panels: Query;
    constructor(dom: Knot, opt_selector?: string | undefined, opt_selectedTab?: string | undefined, opt_defaultTab?: string | undefined);
    private _init;
    private _initTabs;
    private _initPanels;
    private _setActive;
    eventChange(panelId: string): void;
    setActive(panelId: string): import("../core").Promize<object, object>;
    getActive(): string;
}

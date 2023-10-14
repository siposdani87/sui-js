import { Knot } from '../core/knot';
export declare class Helper {
    createLink(name: string, opt_callback: (href: string, linkKnot: Knot) => void | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    multipleLink(selector: string, dom: Knot, opt_callback: (href: string, linkKnot: Knot) => void | undefined, opt_cssClasses?: string[] | undefined): void;
    link(selector: string, dom: Knot, opt_callback: (href: string, linkKnot: Knot) => void | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    linkElement(linkKnot: Knot, opt_callback: (href: string, linkKnot: Knot) => void | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
    createButton(name: string, callback: (id: string, button: Knot) => void, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    multipleButton(selector: string, dom: Knot, opt_callback?: (id: string, button: Knot) => void, opt_cssClasses?: string[] | undefined): void;
    button(selector: string, dom: Knot, callback: (id: string, button: Knot) => void, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    buttonElement(buttonKnot: Knot, opt_callback?: (id: string, button: Knot) => void, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
    createIconButton(iconName: string, callback: (id: string, button: Knot) => void, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    multipleIconButton(selector: string, dom: Knot, opt_cssClasses?: string[] | undefined): void;
    iconButton(selector: string, dom: Knot, callback: (id: string, button: Knot) => void, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    iconButtonElement(buttonKnot: Knot, opt_callback?: (id: string, button: Knot) => void, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
    private _createIconKnot;
    private _setTooltip;
    setGravatar(imageKnot: Knot, defaultImageUrl: string, email: string, opt_size?: number | undefined, opt_rating?: string | undefined): void;
}

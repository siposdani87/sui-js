import { format } from '../utils/operation';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { generateId, md5 } from '../utils/coder';
import { mdl } from '../utils/render';
export class Helper {
    createLink(name, opt_callback, opt_href = 'javascript:void(0)', opt_description = '', opt_allowAccess = true, opt_cssClasses = ['link']) {
        const linkKnot = new Knot('a');
        linkKnot.setHtml(name);
        this.linkElement(linkKnot, opt_callback, opt_href, opt_description, opt_allowAccess, opt_cssClasses);
        return linkKnot;
    }
    multipleLink(selector, dom, opt_callback, opt_cssClasses = []) {
        const linkKnots = new Query(selector, dom);
        linkKnots.each((linkKnot) => {
            this.linkElement(linkKnot, opt_callback, '', '', true, opt_cssClasses);
        });
    }
    link(selector, dom, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true, opt_cssClasses = []) {
        const linkKnot = new Query(selector, dom).getKnot();
        this.linkElement(linkKnot, opt_callback, opt_href, opt_description, opt_allowAccess, opt_cssClasses);
        return linkKnot;
    }
    linkElement(linkKnot, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true, opt_cssClasses = []) {
        if (!linkKnot.isEmpty()) {
            if (opt_allowAccess) {
                linkKnot.addClass(opt_cssClasses);
                if (!linkKnot.getId()) {
                    linkKnot.setId(generateId('link'));
                }
                else {
                    linkKnot.removeEventListeners('click');
                }
                if (opt_href) {
                    linkKnot.setAttribute('href', opt_href);
                }
                if (opt_callback) {
                    const href = linkKnot.getAttribute('href');
                    linkKnot.addEventListener('click', () => {
                        opt_callback(href, linkKnot);
                    });
                }
                this._setTooltip(linkKnot, opt_description);
            }
            else {
                linkKnot.remove();
            }
        }
    }
    createButton(name, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
        const buttonKnot = new Knot('button');
        buttonKnot.setHtml(name);
        this.buttonElement(buttonKnot, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonKnot;
    }
    multipleButton(selector, dom, opt_callback, opt_cssClasses = ['mdl-button--primary']) {
        const buttonKnots = new Query(selector, dom);
        buttonKnots.each((buttonKnot) => {
            this.buttonElement(buttonKnot, opt_callback, '', true, opt_cssClasses);
        });
    }
    button(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
        const buttonKnot = new Query(selector, dom).getKnot();
        this.buttonElement(buttonKnot, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonKnot;
    }
    buttonElement(buttonKnot, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
        if (!buttonKnot.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonKnot.getId()) {
                    buttonKnot.setId(generateId('button'));
                }
                else {
                    const oldCssClasses = buttonKnot.getData('cssClasses');
                    buttonKnot.removeClass(oldCssClasses);
                    buttonKnot.removeEventListeners('click');
                }
                const cssClasses = [
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                    'mdl-button--raised',
                ].concat(opt_cssClasses);
                buttonKnot.setData('cssClasses', cssClasses);
                buttonKnot.addClass(cssClasses);
                if (opt_callback) {
                    buttonKnot.addEventListener('click', () => {
                        opt_callback(buttonKnot.getId(), buttonKnot);
                    });
                }
                this._setTooltip(buttonKnot, opt_description);
            }
            else {
                buttonKnot.remove();
            }
        }
    }
    createIconButton(iconName, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        const buttonKnot = new Knot('button');
        this._createIconKnot(iconName, buttonKnot);
        this.iconButtonElement(buttonKnot, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonKnot;
    }
    multipleIconButton(selector, dom, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        const buttonKnots = new Query(selector, dom);
        buttonKnots.each((buttonKnot) => {
            this.iconButtonElement(buttonKnot, undefined, undefined, true, opt_cssClasses);
        });
    }
    iconButton(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        const buttonKnot = new Query(selector, dom).getKnot();
        this.iconButtonElement(buttonKnot, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonKnot;
    }
    iconButtonElement(buttonKnot, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        if (!buttonKnot.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonKnot.getId()) {
                    buttonKnot.setId(generateId('button'));
                }
                else {
                    const oldCssClasses = buttonKnot.getData('cssClasses');
                    buttonKnot.removeClass(oldCssClasses);
                    buttonKnot.removeEventListeners('click');
                }
                const cssClasses = [
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                    'mdl-button--icon',
                ].concat(opt_cssClasses);
                buttonKnot.setData('cssClasses', cssClasses);
                buttonKnot.addClass(cssClasses);
                if (opt_callback) {
                    buttonKnot.addEventListener('click', () => {
                        opt_callback(buttonKnot.getId(), buttonKnot);
                    });
                }
                this._setTooltip(buttonKnot, opt_description);
            }
            else {
                buttonKnot.remove();
            }
        }
    }
    _createIconKnot(iconName, parentKnot) {
        const iconKnot = new Knot('em');
        iconKnot.addClass('material-icons');
        iconKnot.setHtml(iconName);
        parentKnot.appendChild(iconKnot);
    }
    _setTooltip(knot, opt_description = '') {
        if (opt_description) {
            knot.setAttribute('title', opt_description);
        }
        const tooltip = new Tooltip(knot);
        tooltip.render(opt_description);
        mdl(knot);
    }
    setGravatar(imageKnot, defaultImageUrl, email, opt_size = 500, opt_rating = 'g') {
        const src = format('https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404', [md5(email), opt_size, opt_rating]);
        imageKnot.setAttribute('src', src);
        imageKnot.setAttribute('onError', format("this.onerror=null;this.src='{0}';", [defaultImageUrl]));
    }
}

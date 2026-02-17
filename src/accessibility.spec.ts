import { Knot, Query } from './core';
import { Tooltip } from './component/tooltip';
import { Popup } from './component/popup';
import { Flash } from './module/flash';

describe('Accessibility (a11y)', () => {
    describe('Dialog DOM structure', () => {
        it('should have dialog element', () => {
            const dialog = document.getElementById('dialog');
            expect(dialog).not.toBeNull();
        });

        it('should have dialog window', () => {
            const dialogWindow = document.getElementById('dialog-window');
            expect(dialogWindow).not.toBeNull();
        });
    });

    describe('Confirm DOM structure', () => {
        it('should have confirm element', () => {
            const confirm = document.getElementById('confirm');
            expect(confirm).not.toBeNull();
        });

        it('should have confirm window', () => {
            const confirmWindow = document.getElementById('confirm-window');
            expect(confirmWindow).not.toBeNull();
        });
    });

    describe('Form field labels', () => {
        it('should have labels associated with inputs via for attribute', () => {
            const labels = document.querySelectorAll(
                '.template-view label[for]',
            );
            expect(labels.length).toBeGreaterThan(0);
        });

        it('should have each label pointing to an existing input', () => {
            const labels = document.querySelectorAll(
                '.template-view label[for]',
            );
            labels.forEach((label) => {
                const forId = label.getAttribute('for');
                if (forId) {
                    const input = document.getElementById(forId);
                    expect(input).not.toBeNull();
                }
            });
        });

        it('should have input fields with name attributes', () => {
            const inputs = document.querySelectorAll(
                '.template-view input[name]',
            );
            expect(inputs.length).toBeGreaterThan(0);
        });
    });

    describe('Tooltip accessibility', () => {
        it('should create tooltip span with for attribute', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Accessible tooltip');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'TOP');
            expect(tooltip.tooltip).toBeDefined();
            const forAttr = tooltip.tooltip.getAttribute('for');
            expect(forAttr).toBeTruthy();

            document.body.removeChild(element.getNode());
        });

        it('should assign ID to element without one', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Tooltip');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'TOP');
            expect(element.getId()).toBeTruthy();

            document.body.removeChild(element.getNode());
        });

        it('should create tooltip as span element', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Tip');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'TOP');
            expect(tooltip.tooltip.isEmpty()).toBe(false);
            expect(tooltip.tooltip.getNode().tagName.toLowerCase()).toBe(
                'span',
            );

            document.body.removeChild(element.getNode());
        });

        it('should add mdl-tooltip CSS class', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Tip');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'TOP');
            expect(tooltip.tooltip.hasClass('mdl-tooltip')).toBe(true);

            document.body.removeChild(element.getNode());
        });
    });

    describe('Flash message accessibility', () => {
        let flash: Flash;
        let container: Knot;

        beforeEach(() => {
            flash = new Flash();
            container = new Query('#flashes').getKnot();
        });

        afterEach(() => {
            container.getNode().innerHTML = '';
        });

        it('should render flash with appropriate CSS class for type', () => {
            const flashKnot = flash.addError('Error message');
            expect(flashKnot.hasClass('error')).toBe(true);
            expect(flashKnot.hasClass('flash')).toBe(true);
        });

        it('should render success flash with success class', () => {
            const flashKnot = flash.addSuccess('Success');
            expect(flashKnot.hasClass('success')).toBe(true);
        });

        it('should render warning flash with warning class', () => {
            const flashKnot = flash.addWarning('Warning');
            expect(flashKnot.hasClass('warning')).toBe(true);
        });

        it('should render info flash with info class', () => {
            const flashKnot = flash.addInfo('Info');
            expect(flashKnot.hasClass('info')).toBe(true);
        });

        it('should include close button for error type with default duration', () => {
            const flashKnot = flash.addError('Error with close');
            const closeButton = flashKnot.getNode().querySelector('button');
            expect(closeButton).not.toBeNull();
        });

        it('should have identifiable data-id attribute when specified', () => {
            const flashKnot = flash.addSuccess('Test', 0, null, 'a11y-test');
            expect(flashKnot.getAttribute('data-id')).toBe('a11y-test');
        });
    });

    describe('Popup accessibility', () => {
        it('should have hidden class when closed', () => {
            const parent = new Knot('div');
            const content = new Knot('div');
            content.setHtml('Content');
            document.body.appendChild(parent.getNode());

            const popup = new Popup(content, parent);
            const popupDiv = parent.getNode().querySelector('.popup');
            expect(popupDiv.classList.contains('hidden')).toBe(true);

            document.body.removeChild(parent.getNode());
        });

        it('should remove hidden class when opened', () => {
            const parent = new Knot('div');
            const content = new Knot('div');
            content.setHtml('Content');
            document.body.appendChild(parent.getNode());

            const popup = new Popup(content, parent);
            popup.open();
            const popupDiv = parent.getNode().querySelector('.popup');
            expect(popupDiv.classList.contains('hidden')).toBe(false);

            popup.close();
            document.body.removeChild(parent.getNode());
            delete window['popup_collection'];
        });

        it('should add popup-parent class to container', () => {
            const parent = new Knot('div');
            const content = new Knot('div');
            document.body.appendChild(parent.getNode());

            const popup = new Popup(content, parent);
            expect(parent.hasClass('popup-parent')).toBe(true);

            document.body.removeChild(parent.getNode());
        });
    });

    describe('Structural landmarks', () => {
        it('should have header element', () => {
            expect(document.getElementById('header')).not.toBeNull();
        });

        it('should have footer element', () => {
            expect(document.getElementById('footer')).not.toBeNull();
        });

        it('should have main content area', () => {
            expect(document.querySelector('.template-view')).not.toBeNull();
        });

        it('should have navigation area', () => {
            expect(document.getElementById('nav-bar')).not.toBeNull();
        });

        it('should have left menu', () => {
            expect(document.getElementById('left-menu')).not.toBeNull();
        });

        it('should have loader element', () => {
            expect(document.getElementById('loader')).not.toBeNull();
        });

        it('should have flashes container', () => {
            expect(document.getElementById('flashes')).not.toBeNull();
        });

        it('should have viewer element', () => {
            expect(document.getElementById('viewer')).not.toBeNull();
        });
    });
});

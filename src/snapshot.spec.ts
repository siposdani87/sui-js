import { Knot, Query } from './core';
import { Tooltip } from './component/tooltip';
import { Popup } from './component/popup';
import { Flash } from './module/flash';
import { BaseModal } from './module/baseModal';
import * as coder from './utils/coder';

jest.spyOn(coder, 'generateId').mockImplementation(
    (name: string) => `${name}-test-id`,
);

describe('UI Component Snapshots', () => {
    describe('Tooltip', () => {
        it('should match snapshot for top position', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Tooltip text');
            element.setAttribute('desc', 'Sub description');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'TOP');
            expect(tooltip.tooltip.getNode().outerHTML).toMatchSnapshot();

            document.body.removeChild(element.getNode());
        });

        it('should match snapshot for bottom position', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Bottom tip');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'BOTTOM');
            expect(tooltip.tooltip.getNode().outerHTML).toMatchSnapshot();

            document.body.removeChild(element.getNode());
        });

        it('should match snapshot for left position', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Left tip');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'LEFT');
            expect(tooltip.tooltip.getNode().outerHTML).toMatchSnapshot();

            document.body.removeChild(element.getNode());
        });

        it('should match snapshot for right position', () => {
            const element = new Knot('span');
            element.setAttribute('title', 'Right tip');
            document.body.appendChild(element.getNode());

            const tooltip = new Tooltip(element, 'RIGHT');
            expect(tooltip.tooltip.getNode().outerHTML).toMatchSnapshot();

            document.body.removeChild(element.getNode());
        });
    });

    describe('Popup', () => {
        it('should match snapshot in closed state', () => {
            const parentKnot = new Knot('div');
            const contentKnot = new Knot('div');
            contentKnot.setHtml('Popup content here');
            document.body.appendChild(parentKnot.getNode());

            const popup = new Popup(contentKnot, parentKnot);
            expect(parentKnot.getNode().outerHTML).toMatchSnapshot();

            document.body.removeChild(parentKnot.getNode());
        });

        it('should match snapshot in open state', () => {
            const parentKnot = new Knot('div');
            const contentKnot = new Knot('div');
            contentKnot.setHtml('Popup content here');
            document.body.appendChild(parentKnot.getNode());

            const popup = new Popup(contentKnot, parentKnot);
            popup.open();
            expect(parentKnot.getNode().outerHTML).toMatchSnapshot();

            popup.close();
            document.body.removeChild(parentKnot.getNode());
            delete window['popup_collection'];
        });

        it('should match snapshot with close button', () => {
            const parentKnot = new Knot('div');
            const contentKnot = new Knot('div');
            contentKnot.setHtml('Closable popup');
            document.body.appendChild(parentKnot.getNode());

            const popup = new Popup(contentKnot, parentKnot, true);
            expect(parentKnot.getNode().outerHTML).toMatchSnapshot();

            document.body.removeChild(parentKnot.getNode());
        });
    });

    describe('Dialog modal', () => {
        it('should match snapshot of dialog DOM structure', () => {
            const dialogNode = document.getElementById('dialog') as HTMLElement;
            expect(dialogNode).toBeDefined();
            expect(dialogNode.outerHTML).toMatchSnapshot();
        });

        it('should match snapshot of confirm DOM structure', () => {
            const confirmNode = document.getElementById(
                'confirm',
            ) as HTMLElement;
            expect(confirmNode).toBeDefined();
            expect(confirmNode.outerHTML).toMatchSnapshot();
        });
    });

    describe('Flash messages', () => {
        let flash: Flash;
        let container: Knot;

        beforeEach(() => {
            flash = new Flash();
            container = new Query('#flashes').getKnot();
        });

        afterEach(() => {
            container.getNode().innerHTML = '';
        });

        it('should match snapshot for success message', () => {
            flash.addSuccess(
                'Operation completed',
                Infinity,
                null,
                'snap-success',
            );
            expect(container.getNode().outerHTML).toMatchSnapshot();
        });

        it('should match snapshot for error message with close button', () => {
            flash.addError(
                'Something went wrong',
                Infinity,
                null,
                'snap-error',
            );
            expect(container.getNode().outerHTML).toMatchSnapshot();
        });

        it('should match snapshot for warning message', () => {
            flash.addWarning(
                'Please check input',
                Infinity,
                null,
                'snap-warning',
            );
            expect(container.getNode().outerHTML).toMatchSnapshot();
        });

        it('should match snapshot for info message', () => {
            flash.addInfo('For your information', Infinity, null, 'snap-info');
            expect(container.getNode().outerHTML).toMatchSnapshot();
        });

        it('should match snapshot with multiple messages', () => {
            flash.addSuccess('Good', Infinity, null, 'snap-multi-1');
            flash.addError('Bad', Infinity, null, 'snap-multi-2');
            flash.addWarning('Ugly', Infinity, null, 'snap-multi-3');
            expect(container.getNode().outerHTML).toMatchSnapshot();
        });
    });

    describe('Form structure', () => {
        it('should match snapshot of form from template-view', () => {
            const formNode = document.querySelector('.template-view form');
            if (formNode) {
                expect(formNode.outerHTML).toMatchSnapshot();
            }
        });
    });
});

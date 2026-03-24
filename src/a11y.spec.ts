import { axe, toHaveNoViolations } from 'jest-axe';
import { Confirm } from './module/confirm';
import { Dialog } from './module/dialog';
import { Dropdown } from './component/dropdown';
import { TabPanel } from './component/tabPanel';
import { Flash } from './module/flash';
import { Loader } from './module/loader';
import { Viewer } from './module/viewer';
import { Navigation } from './component/navigation';
import { BaseField } from './field/baseField';
import { Table } from './component/table';
import { Knot } from './core/knot';
import { Objekt } from './core/objekt';
import { Query } from './core/query';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
    describe('Dialog', () => {
        let dialog: Dialog;

        beforeEach(() => {
            const http = { get: jest.fn() };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dialog = new Dialog(http as any);
        });

        afterEach(() => {
            if (dialog.isOpened()) {
                dialog.close();
            }
        });

        it('should have role="dialog" on modal element', () => {
            const modal = new Query('#dialog').getKnot();
            expect(modal.getNode().getAttribute('role')).toBe('dialog');
        });

        it('should have aria-labelledby pointing to dialog title', () => {
            const modal = new Query('#dialog').getKnot();
            expect(modal.getNode().getAttribute('aria-labelledby')).toBe(
                'dialog-title',
            );
        });

        it('should have aria-modal="true" when open', () => {
            dialog.open();
            const modal = new Query('#dialog').getKnot();
            expect(modal.getNode().getAttribute('aria-modal')).toBe('true');
        });

        it('should have aria-modal="false" when closed', () => {
            dialog.open();
            dialog.close();
            const modal = new Query('#dialog').getKnot();
            expect(modal.getNode().getAttribute('aria-modal')).toBe('false');
        });

        it('should have a title element with id="dialog-title"', () => {
            const titleEl = document.getElementById('dialog-title');
            expect(titleEl).not.toBeNull();
        });
    });

    describe('Confirm', () => {
        let confirm: Confirm;

        beforeEach(() => {
            confirm = new Confirm();
        });

        afterEach(() => {
            if (confirm.isOpened()) {
                confirm.close();
            }
        });

        it('should have role="alertdialog" on modal element', () => {
            const modal = new Query('#confirm').getKnot();
            expect(modal.getNode().getAttribute('role')).toBe('alertdialog');
        });

        it('should have aria-labelledby pointing to confirm title', () => {
            const modal = new Query('#confirm').getKnot();
            expect(modal.getNode().getAttribute('aria-labelledby')).toBe(
                'confirm-title',
            );
        });

        it('should have aria-modal="true" when open', () => {
            confirm.load('Test?', 'OK', 'Cancel', 'Title');
            confirm.open();
            const modal = new Query('#confirm').getKnot();
            expect(modal.getNode().getAttribute('aria-modal')).toBe('true');
        });

        it('should have aria-modal="false" when closed', () => {
            confirm.load('Test?', 'OK', 'Cancel', 'Title');
            confirm.open();
            confirm.close();
            const modal = new Query('#confirm').getKnot();
            expect(modal.getNode().getAttribute('aria-modal')).toBe('false');
        });

        it('should have a title element with id="confirm-title"', () => {
            const titleEl = document.getElementById('confirm-title');
            expect(titleEl).not.toBeNull();
        });
    });

    describe('Dropdown', () => {
        let container: HTMLDivElement;
        let dropdown: Dropdown;

        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
            dropdown = new Dropdown(new Knot(container));
        });

        afterEach(() => {
            container.remove();
        });

        it('should have aria-haspopup="menu" on button', () => {
            expect(
                dropdown.buttonKnot.getNode().getAttribute('aria-haspopup'),
            ).toBe('menu');
        });

        it('should have aria-expanded="false" initially', () => {
            expect(
                dropdown.buttonKnot.getNode().getAttribute('aria-expanded'),
            ).toBe('false');
        });

        it('should have role="menu" on menu list', () => {
            expect(dropdown.menuKnot.getNode().getAttribute('role')).toBe(
                'menu',
            );
        });

        it('should set aria-expanded="true" when menu is opened', () => {
            const item = new Objekt({ id: '1' });
            dropdown.setActions(
                [
                    {
                        style: () => ['edit', 'Edit', false, false],
                        click: jest.fn(),
                    },
                ],
                item,
            );
            dropdown.buttonKnot.getNode().click();
            expect(
                dropdown.buttonKnot.getNode().getAttribute('aria-expanded'),
            ).toBe('true');
        });

        it('should set role="menuitem" on menu items', () => {
            const item = new Objekt({ id: '1' });
            dropdown.setActions(
                [
                    {
                        style: () => ['edit', 'Edit', false, false],
                        click: jest.fn(),
                    },
                ],
                item,
            );
            const menuItems = dropdown.menuKnot
                .getNode()
                .querySelectorAll('[role="menuitem"]');
            expect(menuItems).toHaveLength(1);
        });

        it('should set aria-expanded="false" when clicking outside', () => {
            const item = new Objekt({ id: '1' });
            dropdown.setActions(
                [
                    {
                        style: () => ['edit', 'Edit', false, false],
                        click: jest.fn(),
                    },
                ],
                item,
            );
            dropdown.buttonKnot.getNode().click();
            expect(
                dropdown.buttonKnot.getNode().getAttribute('aria-expanded'),
            ).toBe('true');

            document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(
                dropdown.buttonKnot.getNode().getAttribute('aria-expanded'),
            ).toBe('false');
        });
    });

    describe('TabPanel', () => {
        let wrapper: HTMLDivElement;

        beforeEach(() => {
            wrapper = document.createElement('div');
            wrapper.innerHTML = [
                '<div class="tab-panel">',
                '  <div class="tabs">',
                '    <a href="#tp-1">Tab1</a>',
                '    <a href="#tp-2">Tab2</a>',
                '  </div>',
                '  <div id="tp-1" class="panel"></div>',
                '  <div id="tp-2" class="panel"></div>',
                '</div>',
            ].join('');
            document.body.appendChild(wrapper);
        });

        afterEach(() => {
            wrapper.remove();
        });

        it('should have role="tablist" on tabs container', () => {
            new TabPanel(new Knot(wrapper));
            const tabsContainer = wrapper.querySelector('.tabs');
            expect(tabsContainer?.getAttribute('role')).toBe('tablist');
        });

        it('should have role="tab" on tab elements', () => {
            new TabPanel(new Knot(wrapper));
            const tabs = wrapper.querySelectorAll('.tabs a');
            tabs.forEach((tab) => {
                expect(tab.getAttribute('role')).toBe('tab');
            });
        });

        it('should have role="tabpanel" on panel elements', () => {
            new TabPanel(new Knot(wrapper));
            const panels = wrapper.querySelectorAll('.panel');
            panels.forEach((panel) => {
                expect(panel.getAttribute('role')).toBe('tabpanel');
            });
        });

        it('should set aria-selected="true" on active tab', () => {
            new TabPanel(new Knot(wrapper), '.tab-panel', 'tp-1');
            const tabs = wrapper.querySelectorAll('.tabs a');
            const activeTab = Array.from(tabs).find((t) =>
                t.classList.contains('active'),
            );
            expect(activeTab).toBeDefined();
            expect(activeTab?.getAttribute('aria-selected')).toBe('true');
        });

        it('should set aria-selected="false" on inactive tabs', () => {
            new TabPanel(new Knot(wrapper), '.tab-panel', 'tp-1');
            const tabs = wrapper.querySelectorAll('.tabs a');
            const inactiveTab = Array.from(tabs).find(
                (t) => !t.classList.contains('active'),
            );
            expect(inactiveTab?.getAttribute('aria-selected')).toBe('false');
        });

        it('should update aria-selected when switching tabs', () => {
            const tabPanel = new TabPanel(
                new Knot(wrapper),
                '.tab-panel',
                'tp-1',
            );
            tabPanel.setActive('tp-2');
            const tabs = wrapper.querySelectorAll('.tabs a');
            const tab1 = Array.from(tabs).find((t) =>
                t.textContent?.includes('Tab1'),
            );
            const tab2 = Array.from(tabs).find((t) =>
                t.textContent?.includes('Tab2'),
            );
            expect(tab1?.getAttribute('aria-selected')).toBe('false');
            expect(tab2?.getAttribute('aria-selected')).toBe('true');
        });
    });

    describe('Flash', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            const flashes = document.querySelectorAll('#flashes .flash');
            flashes.forEach((f) => f.remove());
            jest.useRealTimers();
        });

        it('should have role="alert" on success flash messages', () => {
            const flash = new Flash();
            flash.addSuccess('Success message', Infinity, null, 'succ-1');
            const flashEl = document.querySelector('#flashes .flash.success');
            expect(flashEl?.getAttribute('role')).toBe('alert');
            flash.removeById('succ-1');
        });

        it('should have role="alert" on error flash messages', () => {
            const flash = new Flash();
            flash.addError('Error message', Infinity, null, 'err-1');
            const flashEl = document.querySelector('#flashes .flash.error');
            expect(flashEl?.getAttribute('role')).toBe('alert');
            flash.removeById('err-1');
        });

        it('should have role="alert" on warning flash messages', () => {
            const flash = new Flash();
            flash.addWarning('Warning message', Infinity, null, 'warn-1');
            const flashEl = document.querySelector('#flashes .flash.warning');
            expect(flashEl?.getAttribute('role')).toBe('alert');
            flash.removeById('warn-1');
        });

        it('should have role="alert" on info flash messages', () => {
            const flash = new Flash();
            flash.addInfo('Info message', Infinity, null, 'info-1');
            const flashEl = document.querySelector('#flashes .flash.info');
            expect(flashEl?.getAttribute('role')).toBe('alert');
            flash.removeById('info-1');
        });
    });

    describe('Navigation', () => {
        let container: HTMLDivElement;

        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(() => {
            container.remove();
        });

        it('should set role="navigation" on container when binding', () => {
            const nav = new Navigation();
            nav.add(
                new Objekt({
                    id: 'home',
                    title: 'Home',
                    action: jest.fn(),
                }),
            );
            nav.bindToContainer(new Knot(container));
            expect(container.getAttribute('role')).toBe('navigation');
        });
    });

    describe('Form fields', () => {
        let inputBlock: HTMLDivElement;

        afterEach(() => {
            if (inputBlock?.parentNode) {
                inputBlock.remove();
            }
        });

        it('should have aria-describedby on form inputs with error elements', () => {
            inputBlock = document.createElement('div');
            inputBlock.classList.add('input-block');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'test-field';
            const label = document.createElement('label');
            label.textContent = 'Test';
            const error = document.createElement('div');
            error.classList.add('error');
            inputBlock.appendChild(label);
            inputBlock.appendChild(input);
            inputBlock.appendChild(error);
            document.body.appendChild(inputBlock);

            new BaseField(
                new Knot(input),
                new Knot(label),
                new Knot(error),
                new Knot(inputBlock),
            );

            expect(input.getAttribute('aria-describedby')).toBe(
                'test-field-error',
            );
            expect(error.id).toBe('test-field-error');
        });

        it('should use fallback id when input has no name', () => {
            inputBlock = document.createElement('div');
            inputBlock.classList.add('input-block');
            const input = document.createElement('input');
            input.type = 'text';
            const label = document.createElement('label');
            label.textContent = 'Test';
            const error = document.createElement('div');
            error.classList.add('error');
            inputBlock.appendChild(label);
            inputBlock.appendChild(input);
            inputBlock.appendChild(error);
            document.body.appendChild(inputBlock);

            new BaseField(
                new Knot(input),
                new Knot(label),
                new Knot(error),
                new Knot(inputBlock),
            );

            expect(input.getAttribute('aria-describedby')).toBe('field-error');
            expect(error.id).toBe('field-error');
        });
    });

    describe('jest-axe integration', () => {
        it('should detect no violations on a simple accessible structure', async () => {
            const container = document.createElement('div');
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = 'Click me';
            container.appendChild(button);
            document.body.appendChild(container);

            const results = await axe(container);
            expect(results).toHaveNoViolations();

            container.remove();
        });

        it('should detect violations on inaccessible content', async () => {
            const container = document.createElement('div');
            const img = document.createElement('img');
            img.src = 'test.png';
            container.appendChild(img);
            document.body.appendChild(container);

            const results = await axe(container);
            expect(results.violations.length).toBeGreaterThan(0);

            container.remove();
        });

        it('should pass axe check on dropdown button', async () => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            new Dropdown(new Knot(container));

            const results = await axe(container);
            expect(results).toHaveNoViolations();

            container.remove();
        });

        it('should pass axe check on navigation with role', async () => {
            const navContainer = document.createElement('nav');
            document.body.appendChild(navContainer);
            const nav = new Navigation();
            nav.add(
                new Objekt({
                    id: 'home',
                    title: 'Home',
                    action: jest.fn(),
                }),
            );
            nav.bindToContainer(new Knot(navContainer));

            const results = await axe(navContainer);
            expect(results).toHaveNoViolations();

            navContainer.remove();
        });

        it('should pass axe check on loader element', async () => {
            const loader = new Loader();
            const loaderEl = new Query('#loader').getKnot().getNode();

            const results = await axe(loaderEl);
            expect(results).toHaveNoViolations();

            loader.hide();
        });

        it('should pass axe check on flash container', async () => {
            const flash = new Flash();
            flash.addInfo('Accessible info', Infinity, null, 'axe-info');
            const flashContainer = new Query('#flashes').getKnot().getNode();

            const results = await axe(flashContainer);
            expect(results).toHaveNoViolations();

            flash.removeById('axe-info');
        });

        it('should pass axe check on tab panel', async () => {
            const wrapper = document.createElement('div');
            const tabPanel = document.createElement('div');
            tabPanel.className = 'tab-panel';
            const tabs = document.createElement('div');
            tabs.className = 'tabs';
            const tab1Link = document.createElement('a');
            tab1Link.href = '#axe-tp-1';
            tab1Link.textContent = 'Tab1';
            const tab2Link = document.createElement('a');
            tab2Link.href = '#axe-tp-2';
            tab2Link.textContent = 'Tab2';
            tabs.appendChild(tab1Link);
            tabs.appendChild(tab2Link);
            const panel1 = document.createElement('div');
            panel1.id = 'axe-tp-1';
            panel1.className = 'panel';
            panel1.textContent = 'Content 1';
            const panel2 = document.createElement('div');
            panel2.id = 'axe-tp-2';
            panel2.className = 'panel';
            panel2.textContent = 'Content 2';
            tabPanel.appendChild(tabs);
            tabPanel.appendChild(panel1);
            tabPanel.appendChild(panel2);
            wrapper.appendChild(tabPanel);
            document.body.appendChild(wrapper);
            new TabPanel(new Knot(wrapper), '.tab-panel', 'axe-tp-1');

            const results = await axe(wrapper);
            expect(results).toHaveNoViolations();

            wrapper.remove();
        });

        it('should pass axe check on table with sorted headers', async () => {
            const wrapper = document.createElement('div');
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'Name';
            const th2 = document.createElement('th');
            th2.textContent = 'Email';
            tr.appendChild(th1);
            tr.appendChild(th2);
            thead.appendChild(tr);
            table.appendChild(thead);
            wrapper.appendChild(table);
            document.body.appendChild(wrapper);

            new Table(new Knot(wrapper), 'table', {
                columns: ['name', 'email'],
                sorted: ['name'],
                no_content: { text: 'No data' },
            });

            const results = await axe(wrapper);
            expect(results).toHaveNoViolations();

            wrapper.remove();
        });

        it('should pass axe check on dialog structure', async () => {
            const http = { get: jest.fn() };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dialog = new Dialog(http as any);
            const dialogEl = new Query('#dialog').getKnot().getNode();
            const titleEl = document.getElementById('dialog-title');
            if (titleEl) titleEl.textContent = 'Dialog Title';

            const results = await axe(dialogEl);
            expect(results).toHaveNoViolations();

            if (dialog.isOpened()) {
                dialog.close();
            }
        });

        it('should pass axe check on confirm structure', async () => {
            const confirm = new Confirm();
            const confirmEl = new Query('#confirm').getKnot().getNode();
            const titleEl = document.getElementById('confirm-title');
            if (titleEl) titleEl.textContent = 'Confirm Title';

            const results = await axe(confirmEl);
            expect(results).toHaveNoViolations();

            if (confirm.isOpened()) {
                confirm.close();
            }
        });
    });

    describe('Loader', () => {
        it('should have role="status" on loader element', () => {
            new Loader();
            const loaderEl = new Query('#loader').getKnot();
            expect(loaderEl.getNode().getAttribute('role')).toBe('status');
        });

        it('should have aria-live="polite" on loader element', () => {
            new Loader();
            const loaderEl = new Query('#loader').getKnot();
            expect(loaderEl.getNode().getAttribute('aria-live')).toBe('polite');
        });

        it('should have aria-label="Loading" on loader element', () => {
            new Loader();
            const loaderEl = new Query('#loader').getKnot();
            expect(loaderEl.getNode().getAttribute('aria-label')).toBe(
                'Loading',
            );
        });
    });

    describe('Viewer', () => {
        let viewer: Viewer;

        beforeEach(() => {
            viewer = new Viewer();
        });

        afterEach(() => {
            if (viewer.isOpened()) {
                viewer.close();
            }
        });

        it('should have role="dialog" on viewer modal', () => {
            const modal = new Query('#viewer').getKnot();
            expect(modal.getNode().getAttribute('role')).toBe('dialog');
        });

        it('should have aria-labelledby="viewer-title"', () => {
            const modal = new Query('#viewer').getKnot();
            expect(modal.getNode().getAttribute('aria-labelledby')).toBe(
                'viewer-title',
            );
        });
    });

    describe('Table', () => {
        let wrapper: HTMLDivElement;

        beforeEach(() => {
            wrapper = document.createElement('div');
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'Name';
            const th2 = document.createElement('th');
            th2.textContent = 'Email';
            tr.appendChild(th1);
            tr.appendChild(th2);
            thead.appendChild(tr);
            table.appendChild(thead);
            wrapper.appendChild(table);
            document.body.appendChild(wrapper);
        });

        afterEach(() => {
            wrapper.remove();
        });

        it('should set aria-label on table element', () => {
            new Table(new Knot(wrapper), 'table', {
                columns: ['name', 'email'],
                sorted: ['name'],
                no_content: { text: 'No data' },
            });
            const table = wrapper.querySelector('table');
            expect(table?.getAttribute('aria-label')).toBe('No data');
        });

        it('should set aria-sort on sorted column header', () => {
            const table = new Table(new Knot(wrapper), 'table', {
                columns: ['name', 'email'],
                sorted: ['name'],
            });
            table.render();
            const headers = wrapper.querySelectorAll('thead th');
            expect(headers[0]?.getAttribute('aria-sort')).toBe('descending');
            expect(headers[1]?.getAttribute('aria-sort')).toBeNull();
        });
    });

    describe('Dropdown aria-controls', () => {
        let container: HTMLDivElement;

        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(() => {
            container.remove();
        });

        it('should have aria-controls linking button to menu', () => {
            const dropdown = new Dropdown(new Knot(container));
            const buttonEl = dropdown.buttonKnot.getNode();
            const menuEl = dropdown.menuKnot.getNode();
            expect(buttonEl.getAttribute('aria-controls')).toBe(menuEl.id);
        });

        it('should have aria-label on button', () => {
            const dropdown = new Dropdown(new Knot(container));
            expect(
                dropdown.buttonKnot.getNode().getAttribute('aria-label'),
            ).toBe('Actions');
        });
    });
});

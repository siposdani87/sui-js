import { LeftMenu } from './leftMenu';

describe('LeftMenu', () => {
    let leftMenu: LeftMenu;

    beforeEach(() => {
        leftMenu = new LeftMenu();
    });

    it('should be instance of LeftMenu', () => {
        expect(leftMenu).toBeInstanceOf(LeftMenu);
    });

    describe('DOM references', () => {
        it('should query body', () => {
            expect(leftMenu.body).toBeDefined();
            expect(leftMenu.body.getNode().tagName).toBe('BODY');
        });

        it('should query mainContainerKnot', () => {
            expect(leftMenu.mainContainerKnot).toBeDefined();
        });

        it('should query leftMenu', () => {
            expect(leftMenu.leftMenu).toBeDefined();
            expect(leftMenu.leftMenu.getId()).toBe('left-menu');
        });

        it('should query mainMenu and subMenu', () => {
            expect(leftMenu.mainMenu).toBeDefined();
            expect(leftMenu.subMenu).toBeDefined();
        });

        it('should query mainMenuContainer and subMenuContainer', () => {
            expect(leftMenu.mainMenuContainer).toBeDefined();
            expect(leftMenu.subMenuContainer).toBeDefined();
        });

        it('should query mainMenuTitle and subMenuTitle', () => {
            expect(leftMenu.mainMenuTitle).toBeDefined();
            expect(leftMenu.subMenuTitle).toBeDefined();
        });

        it('should hide subMenu by default', () => {
            expect(leftMenu.subMenu.hasClass('hidden')).toBe(true);
        });
    });

    describe('open / close', () => {
        it('should add overflow-hidden to body on open', () => {
            leftMenu.open();
            expect(leftMenu.body.hasClass('overflow-hidden')).toBe(true);
        });

        it('should add blur to main container on open', () => {
            leftMenu.open();
            expect(leftMenu.mainContainerKnot.hasClass('blur')).toBe(true);
        });

        it('should add visible-block to leftMenu on open', () => {
            leftMenu.open();
            expect(leftMenu.leftMenu.hasClass('visible-block')).toBe(true);
        });

        it('should set main menu title on open', () => {
            leftMenu.open('Navigation');
            expect(leftMenu.mainMenuTitle.getNode().innerHTML).toBe(
                'Navigation',
            );
        });

        it('should use empty title by default', () => {
            leftMenu.open();
            expect(leftMenu.mainMenuTitle.getNode().innerHTML).toBe('');
        });

        it('should remove overflow-hidden from body on close', () => {
            leftMenu.open();
            leftMenu.close();
            expect(leftMenu.body.hasClass('overflow-hidden')).toBe(false);
        });

        it('should remove blur from main container on close', () => {
            leftMenu.open();
            leftMenu.close();
            expect(leftMenu.mainContainerKnot.hasClass('blur')).toBe(false);
        });

        it('should remove visible-block from leftMenu on close', () => {
            leftMenu.open();
            leftMenu.close();
            expect(leftMenu.leftMenu.hasClass('visible-block')).toBe(false);
        });
    });

    describe('openSubMenu / closeSubMenu', () => {
        it('should hide main menu on openSubMenu', () => {
            leftMenu.openSubMenu();
            expect(leftMenu.mainMenu.hasClass('hidden')).toBe(true);
        });

        it('should show sub menu on openSubMenu', () => {
            leftMenu.openSubMenu();
            expect(leftMenu.subMenu.hasClass('hidden')).toBe(false);
        });

        it('should set sub menu title', () => {
            leftMenu.openSubMenu('Settings');
            expect(leftMenu.subMenuTitle.getNode().innerHTML).toBe('Settings');
        });

        it('should show main menu on closeSubMenu', () => {
            leftMenu.openSubMenu();
            leftMenu.closeSubMenu();
            expect(leftMenu.mainMenu.hasClass('hidden')).toBe(false);
        });

        it('should hide sub menu on closeSubMenu', () => {
            leftMenu.openSubMenu();
            leftMenu.closeSubMenu();
            expect(leftMenu.subMenu.hasClass('hidden')).toBe(true);
        });
    });

    describe('getMainContainer / getSubContainer', () => {
        it('should return main menu container', () => {
            expect(leftMenu.getMainContainer()).toBe(
                leftMenu.mainMenuContainer,
            );
        });

        it('should return sub menu container', () => {
            expect(leftMenu.getSubContainer()).toBe(
                leftMenu.subMenuContainer,
            );
        });
    });

    describe('click events', () => {
        it('should close on leftMenu click', () => {
            leftMenu.open();
            leftMenu.leftMenu.getNode().click();
            expect(leftMenu.leftMenu.hasClass('visible-block')).toBe(false);
        });

        it('should open on open-left-menu click', () => {
            const openBtn = document.querySelector(
                '#open-left-menu',
            ) as HTMLElement;
            openBtn.click();
            expect(leftMenu.leftMenu.hasClass('visible-block')).toBe(true);
        });

        it('should close on close-left-menu click', () => {
            leftMenu.open();
            const closeBtn = leftMenu.mainMenu
                .getNode()
                .querySelector('#close-left-menu') as HTMLElement;
            closeBtn.click();
            expect(leftMenu.leftMenu.hasClass('visible-block')).toBe(false);
        });

        it('should close sub menu on close-sub-menu click', () => {
            leftMenu.openSubMenu('Test');
            const closeSubBtn = leftMenu.subMenu
                .getNode()
                .querySelector('#close-sub-menu') as HTMLElement;
            closeSubBtn.click();
            expect(leftMenu.subMenu.hasClass('hidden')).toBe(true);
        });
    });
});

import { mdl } from './render';

describe('render', () => {
    it('should render mdl components', () => {
        const upgradeDomSpy = jest.spyOn(
            window['componentHandler'],
            'upgradeDom',
        );
        const element = document.getElementsByClassName(
            '.template-view',
        )[0] as HTMLElement;

        mdl(element);

        expect(upgradeDomSpy).toBeCalled();
        upgradeDomSpy.mockRestore();
    });
});

import { mdl } from './render';
describe('render', () => {
    it('should render mdl components', () => {
        const upgradeDomSpy = jest.spyOn(window['componentHandler'], 'upgradeDom');
        mdl();
        expect(upgradeDomSpy).toBeCalled();
        upgradeDomSpy.mockRestore();
    });
});

import { PopupContainer } from './popupContainer';

describe('popupContainer', () => {
    it('should be instance of PopupContainer', () => {
        const popupContainer = new PopupContainer();

        expect(popupContainer).toBeInstanceOf(PopupContainer);
    });
});

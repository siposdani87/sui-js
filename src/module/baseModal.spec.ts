import { BaseModal } from './baseModal';

describe('baseModal', () => {
    it('should be instance of BaseModal', () => {
        const baseModal = new BaseModal();

        expect(baseModal).toBeInstanceOf(BaseModal);
    });
});

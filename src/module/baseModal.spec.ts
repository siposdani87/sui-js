import { BaseModal } from './baseModal';

describe('BaseModal', () => {
    it('should be instance of BaseModal', () => {
        const baseModal = new BaseModal();

        expect(baseModal).toBeInstanceOf(BaseModal);
    });
});

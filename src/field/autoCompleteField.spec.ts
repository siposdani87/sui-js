import { AutoCompleteField } from './autoCompleteField';

describe('autoCompleteField', () => {
    it('should be instance of AutoCompleteField', () => {
        const autoCompleteField = new AutoCompleteField();
        
        expect(autoCompleteField).toBeInstanceOf(AutoCompleteField);
    });
});

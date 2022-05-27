import { SelectField } from './selectField';

describe('selectField', () => {
    it('should be instance of SelectField', () => {
        const selectField = new SelectField();
        
        expect(selectField).toBeInstanceOf(SelectField);
    });
});

import { Query } from '../core';
import { HiddenField } from './hiddenField';

describe('hiddenField', () => {
    it('should be instance of HiddenField', () => {
        const hiddenInput = new Query<HTMLInputElement>('#field-hidden').getItem();
        const hiddenField = new HiddenField(hiddenInput);
        
        expect(hiddenField).toBeInstanceOf(HiddenField);
    });
});

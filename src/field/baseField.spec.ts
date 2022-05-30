import { Query } from '../core';
import { BaseField } from './baseField';

describe('baseField', () => {
    it('should be instance of BaseField', () => {
        const hiddenInput = new Query<HTMLInputElement>(
            '#field-hidden',
        ).getItem();
        const baseField = new BaseField(hiddenInput);

        expect(baseField).toBeInstanceOf(BaseField);
    });
});

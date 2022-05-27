import { DateTimeField } from './dateTimeField';

describe('dateTimeField', () => {
    it('should be instance of DateTimeField', () => {
        const dateTimeField = new DateTimeField();
        
        expect(dateTimeField).toBeInstanceOf(DateTimeField);
    });
});

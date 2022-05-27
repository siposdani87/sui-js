import { LocationField } from './locationField';

describe('locationField', () => {
    it('should be instance of LocationField', () => {
        const locationField = new LocationField();
        
        expect(locationField).toBeInstanceOf(LocationField);
    });
});

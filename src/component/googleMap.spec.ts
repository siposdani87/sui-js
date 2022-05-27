import { Query } from '../core';
import { GoogleMap } from './googleMap';
import { initialize, mockInstances } from "@googlemaps/jest-mocks";

beforeAll(() => {
    initialize();
});

// Clear all mocks
beforeEach(() => {
    mockInstances.clearAll();
});

describe('googleMap', () => {
    it('should be instance of GoogleMap', () => {
        const node = new Query('.template-view').getItem();
        const googleMap = new GoogleMap(node);

        expect(googleMap).toBeInstanceOf(GoogleMap);
    });
});

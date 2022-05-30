import { Canvas } from './canvas';

describe('canvas', () => {
    it('should be instance of Canvas', () => {
        const canvas = new Canvas();

        expect(canvas).toBeInstanceOf(Canvas);
    });
});

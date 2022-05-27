import { Viewer } from './viewer';

describe('viewer', () => {
    it('should be instance of Viewer', () => {
        const viewer = new Viewer();
        
        expect(viewer).toBeInstanceOf(Viewer);
    });
});

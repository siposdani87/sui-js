import { TestRunner } from './testRunner';

describe('testRunner', () => {
    it('should be instance of TestRunner', () => {
        const testRunner = new TestRunner();
        
        expect(testRunner).toBeInstanceOf(TestRunner);
    });
});

import { Module } from './module';

describe('module', () => {
    it('should be instance of Module', () => {
        const module = new Module();
        
        expect(module).toBeInstanceOf(Module);
    });
});

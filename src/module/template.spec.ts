import { Http } from './http';
import { Template } from './template';

describe('template', () => {
    it('should be instance of Template', () => {
        const http = new Http();
        const template = new Template(http);
        
        expect(template).toBeInstanceOf(Template);
    });
});

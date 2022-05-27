import { Confirm } from './confirm';
import { Dialog } from './dialog';
import { Http } from './http';
import { ProgressBar } from './progressBar';

describe('progressBar', () => {
    it('should be instance of ProgressBar', () => {
        const http = new Http();
        const dialog = new Dialog(http);
        const confirm = new Confirm();
        const progressBar = new ProgressBar(dialog, confirm);
        
        expect(progressBar).toBeInstanceOf(ProgressBar);
    });
});

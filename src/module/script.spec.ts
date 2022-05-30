import { Confirm } from './confirm';
import { Dialog } from './dialog';
import { Http } from './http';
import { ProgressBar } from './progressBar';
import { Script } from './script';

describe('script', () => {
    it('should be instance of Script', () => {
        const http = new Http();
        const dialog = new Dialog(http);
        const confirm = new Confirm();
        const progressBar = new ProgressBar(dialog, confirm);
        const script = new Script(progressBar);

        expect(script).toBeInstanceOf(Script);
    });
});

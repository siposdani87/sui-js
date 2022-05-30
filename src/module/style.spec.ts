import { Confirm } from './confirm';
import { Dialog } from './dialog';
import { Http } from './http';
import { ProgressBar } from './progressBar';
import { Style } from './style';

describe('style', () => {
    it('should be instance of Style', () => {
        const http = new Http();
        const dialog = new Dialog(http);
        const confirm = new Confirm();
        const progressBar = new ProgressBar(dialog, confirm);
        const style = new Style(progressBar);

        expect(style).toBeInstanceOf(Style);
    });
});

import { Viewer } from './viewer';

describe('viewer', () => {
    let viewer: Viewer;

    beforeEach(() => {
        viewer = new Viewer();
    });

    afterEach(() => {
        viewer.close();
        viewer.modalBody.removeChildren();
    });

    it('should be instance of Viewer', () => {
        expect(viewer).toBeInstanceOf(Viewer);
    });

    it('should accept undefined options', () => {
        const v = new Viewer(undefined);
        expect(v).toBeInstanceOf(Viewer);
        v.close();
    });

    it('should accept custom options', () => {
        const v = new Viewer({ id: '#viewer' });
        expect(v).toBeInstanceOf(Viewer);
        v.close();
    });

    it('should load and display an image with title', () => {
        viewer.loadImage('/test/image.jpg', 'Test Image');

        const img = viewer.modalBody
            .getNode()
            .querySelector('img') as HTMLImageElement;
        expect(img).not.toBeNull();
        expect(img.getAttribute('src')).toBe('/test/image.jpg');
        expect(viewer.modalTitle.getNode().textContent).toBe('Test Image');
    });

    it('should load image without title', () => {
        viewer.loadImage('/test/photo.png');

        const img = viewer.modalBody
            .getNode()
            .querySelector('img') as HTMLImageElement;
        expect(img).not.toBeNull();
        expect(img.getAttribute('src')).toBe('/test/photo.png');
    });

    it('should open the modal when loadImage is called', () => {
        viewer.loadImage('/test/image.jpg');

        expect(viewer.modal.getNode().classList.contains('visible-flex')).toBe(
            true,
        );
    });

    it('should set alt attribute from title', () => {
        viewer.loadImage('/test/image.jpg', 'Alt Text');
        const img = viewer.modalBody
            .getNode()
            .querySelector('img') as HTMLImageElement;
        expect(img.getAttribute('alt')).toBe('Alt Text');
    });

    it('should set empty alt when no title', () => {
        viewer.loadImage('/test/image.jpg');
        const img = viewer.modalBody
            .getNode()
            .querySelector('img') as HTMLImageElement;
        expect(img.getAttribute('alt')).toBe('');
    });

    it('should set empty alt when title is undefined', () => {
        viewer.loadImage('/test/image.jpg', undefined);
        const img = viewer.modalBody
            .getNode()
            .querySelector('img') as HTMLImageElement;
        expect(img.getAttribute('alt')).toBe('');
    });

    it('should hide header when no title', () => {
        viewer.loadImage('/test/image.jpg');
        expect(viewer.modalHeader.hasClass('hidden')).toBe(true);
    });

    it('should show header when title provided', () => {
        viewer.loadImage('/test/image.jpg', 'Photo');
        expect(viewer.modalHeader.hasClass('hidden')).toBe(false);
    });

    it('should reset callbacks on each loadImage', () => {
        const okSpy = jest.fn();
        viewer.on('ok', okSpy);
        viewer.loadImage('/test/a.jpg');
        // After loadImage, ok handler should be reset
        viewer.emit('ok');
        expect(okSpy).not.toHaveBeenCalled();
    });

    it('should use default options when _setOptions called without argument', () => {
        (viewer as any)['_setOptions']();
        expect(viewer.options.get('id')).toBe('#viewer');
    });

    it('should use default title when _setImage called without opt_title', () => {
        (viewer as any)['_setImage']('/test/fallback.jpg');
        const img = viewer.modalBody
            .getNode()
            .querySelector('img:last-child') as HTMLImageElement;
        expect(img).not.toBeNull();
        expect(img.getAttribute('alt')).toBe('');
        expect(img.getAttribute('src')).toBe('/test/fallback.jpg');
    });
});

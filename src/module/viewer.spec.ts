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
});

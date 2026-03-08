import { Query } from '../core';
import { ContentHandler } from './contentHandler';

describe('contentHandler', () => {
    it('should be instance of ContentHandler', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        expect(contentHandler).toBeInstanceOf(ContentHandler);
    });

    it('should create contentKnot with visible-flex class on init', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        expect(contentHandler.contentKnot.hasClass('content-handler')).toBe(
            true,
        );
        expect(contentHandler.contentKnot.hasClass('visible-flex')).toBe(true);
    });

    it('should hide containerKnot on init by adding hidden class', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        expect(knot.hasClass('hidden')).toBe(true);

        contentHandler.hide();
        expect(knot.hasClass('hidden')).toBe(false);
    });

    it('should handle undefined options', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot, undefined);

        expect(contentHandler).toBeInstanceOf(ContentHandler);
    });

    it('should create image element when image_url is provided', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot, {
            image_url: '/empty.svg',
        });

        const imgNode = contentHandler.contentKnot.getNode();
        const img = imgNode.querySelector('img');
        expect(img).not.toBeNull();
        expect(img?.getAttribute('src')).toBe('/empty.svg');
    });

    it('should not create image element when image_url is not provided', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        const imgNode = contentHandler.contentKnot.getNode();
        const img = imgNode.querySelector('img');
        expect(img).toBeNull();
    });

    it('should create text element when text is provided', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot, {
            text: 'No items found',
        });

        const node = contentHandler.contentKnot.getNode();
        const p = node.querySelector('p');
        expect(p).not.toBeNull();
        expect(p?.innerHTML).toBe('No items found');
    });

    it('should not create text element when text is empty', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        const node = contentHandler.contentKnot.getNode();
        const p = node.querySelector('p');
        expect(p).toBeNull();
    });

    it('should create both image and text when both options are provided', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot, {
            image_url: '/empty.svg',
            text: 'Nothing here',
        });

        const node = contentHandler.contentKnot.getNode();
        const img = node.querySelector('img');
        const p = node.querySelector('p');
        expect(img).not.toBeNull();
        expect(p).not.toBeNull();
        expect(img?.getAttribute('src')).toBe('/empty.svg');
        expect(p?.innerHTML).toBe('Nothing here');
    });

    it('should show placeholder and hide container on show()', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        contentHandler.hide();
        expect(contentHandler.contentKnot.hasClass('visible-flex')).toBe(false);
        expect(knot.hasClass('hidden')).toBe(false);

        contentHandler.show();
        expect(contentHandler.contentKnot.hasClass('visible-flex')).toBe(true);
        expect(knot.hasClass('hidden')).toBe(true);
    });

    it('should hide placeholder and show container on hide()', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        contentHandler.hide();
        expect(contentHandler.contentKnot.hasClass('visible-flex')).toBe(false);
        expect(knot.hasClass('hidden')).toBe(false);
    });
});

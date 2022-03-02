import { consoleInfo, each, isString, isUndefined, typeCast } from "../base";
import { Item } from "../core/item";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {Canvas}
 * @param {!Item|string=} opt_selector
 */
export const Canvas = function(opt_selector?) {
  this._init(opt_selector);
  this._initEvents();
};

/**
 * @private
 * @param {!Item|string=} opt_selector
 * @return {undefined}
 */
Canvas.prototype._init = function(opt_selector) {
  this.canvasNode = /** @type {!Item} */ (opt_selector);
  if (isString(opt_selector)) {
    this.canvasNode = new Query(/** @type {string} */(opt_selector)).getItem();
  } else if (isUndefined(opt_selector)) {
    this.canvasNode = new Item('canvas');
  }
  this.canvasRaw = this.canvasNode.getNode();
  this.context = this.canvasRaw.getContext('2d');
};

/**
 * @private
 * @return {undefined}
 */
Canvas.prototype._initEvents = function() {
  this.canvasNode.addEventListener('mousemove', (canvasNode, event) => {
    const rect = canvasNode.getNode().getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.eventMouseMove(x, y);
  });
};

/**
 * @param {number} width
 * @return {undefined}
 */
Canvas.prototype.setWidth = function(width) {
  this.canvasRaw.width = width;
};

/**
 * @return {number}
 */
Canvas.prototype.getWidth = function() {
  return this.canvasRaw.width;
};

/**
 * @param {number} height
 * @return {undefined}
 */
Canvas.prototype.setHeight = function(height) {
  this.canvasRaw.height = height;
};

/**
 * @return {number}
 */
Canvas.prototype.getHeight = function() {
  return this.canvasRaw.height;
};

/**
 * @param {number} width
 * @param {number} height
 * @return {undefined}
 */
Canvas.prototype.setSize = function(width, height) {
  this.setWidth(width);
  this.setHeight(height);
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} sides
 * @param {number} rotateAngle
 * @param {!Object} options
 * @return {undefined}
 */
Canvas.prototype.drawPolygon = function(x, y, radius, sides, rotateAngle, options) {
  if (sides < 3) {
    return;
  }
  const a = (Math.PI * 2) / sides;
  this.context.save();
  this.context.translate(x, y);
  this.context.beginPath();
  this.context.rotate(rotateAngle);
  this.context.moveTo(radius, 0);
  for (let i = 1; i < sides; i++) {
    this.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
  }
  this.context.closePath();
  each(options, (value, key) => {
    this.context[key] = value;
  });
  this.context.fill();
  this.context.stroke();
  this.context.restore();
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} rotateAngle
 * @param {!Object} options
 * @return {undefined}
 */
Canvas.prototype.drawRectangle = function(x, y, width, height, rotateAngle, options) {
  this.context.save();
  this.context.translate(x, y);
  this.context.beginPath();
  this.context.rotate(rotateAngle);
  this.context.rect(0, 0, width, height);
  each(options, (value, key) => {
    this.context[key] = value;
  });
  if (options['fillStyle']) {
    this.context.fill();
  }
  if (options['strokeStyle']) {
    this.context.stroke();
  }
  this.context.restore();
};

/**
 * @param {!Item} image
 * @param {number=} opt_width
 * @param {number=} opt_height
 */
Canvas.prototype.drawImage = function(image, opt_width, opt_height) {
  const width = opt_width || typeCast(image.getAttribute('width'));
  const height = opt_height || typeCast(image.getAttribute('height'));
  this.context.save();
  this.context.drawImage(image.getNode(), 0, 0, width, height);
  this.context.restore();
};

/**
 * @param {number} x
 * @param {number} y
 * @return {!CanvasPixelArray}
 */
Canvas.prototype.getImageDataXY = function(x, y) {
  return this.context.getImageData(x, y, 1, 1).data;
};

/**
 * @param {number} x
 * @param {number} y
 * @return {undefined}
 */
Canvas.prototype.eventMouseMove = function(x, y) {
  consoleInfo('Canvas.eventMouseMove()', x, y);
};

/**
 * @return {undefined}
 */
Canvas.prototype.clear = function() {
  this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
};

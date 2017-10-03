goog.provide('SUI.Canvas');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Canvas}
 * @param {!SUI.Node|string=} opt_selector
 */
SUI.Canvas = function(opt_selector) {
  this._init(opt_selector);
  this._initEvents();
};

/**
 * @private
 * @param {!SUI.Node|string=} opt_selector
 * @returns {undefined}
 */
SUI.Canvas.prototype._init = function(opt_selector) {
  this.canvasNode = /** @type {!SUI.Node} */ (opt_selector);
  if (SUI.isString(opt_selector)) {
    this.canvasNode = new SUI.Query(/** @type {string} */ (opt_selector)).getItem();
  }
  else if (SUI.isUndefined(opt_selector)){
    this.canvasNode = new SUI.Node('canvas');
  }
  this.canvasRaw = this.canvasNode.getNode();
  this.context = this.canvasRaw.getContext('2d');
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Canvas.prototype._initEvents = function() {
  this.canvasNode.addEventListener('mousemove', (canvasNode, event) => {
    var rect = canvasNode.getNode().getBoundingClientRect();
    var x= event.clientX - rect.left;
    var y= event.clientY - rect.top;
    this.eventMouseMove(x, y);
  });
};

/**
 * @param {number} width
 * @returns {undefined}
 */
SUI.Canvas.prototype.setWidth = function(width) {
  this.canvasRaw.width = width;
};

/**
 * @returns {number}
 */
SUI.Canvas.prototype.getWidth = function() {
  return this.canvasRaw.width;
};

/**
 * @param {number} height
 * @returns {undefined}
 */
SUI.Canvas.prototype.setHeight = function(height) {
  this.canvasRaw.height = height;
};

/**
 * @returns {number}
 */
SUI.Canvas.prototype.getHeight = function() {
  return this.canvasRaw.height;
};

/**
 * @param {number} width
 * @param {number} height
 * @returns {undefined}
 */
SUI.Canvas.prototype.setSize = function(width, height) {
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
 * @returns {undefined}
 */
SUI.Canvas.prototype.drawPolygon = function(x, y, radius, sides, rotateAngle, options) {
  if (sides < 3) {
    return;
  }
  var a = (Math.PI * 2) / sides;
  this.context.save();
  this.context.translate(x, y);
  this.context.beginPath();
  this.context.rotate(rotateAngle);
  this.context.moveTo(radius, 0);
  for (var i = 1; i < sides; i++) {
    this.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
  }
  this.context.closePath();
  SUI.each(options, function(value, key) {
    this.context[key] = value;
  }.bind(this));
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
 * @returns {undefined}
 */
SUI.Canvas.prototype.drawRectangle = function(x, y, width, height, rotateAngle, options) {
  this.context.save();
  this.context.translate(x, y);
  this.context.beginPath();
  this.context.rotate(rotateAngle);
  this.context.rect(0, 0, width, height);
  SUI.each(options, function(value, key) {
    this.context[key] = value;
  }.bind(this));
  if (options['fillStyle']) {
    this.context.fill();
  }
  if (options['strokeStyle']) {
    this.context.stroke();
  }
  this.context.restore();
};

/**
 * @param {!SUI.Node} image
 * @param {number=} opt_width
 * @param {number=} opt_height
 */
SUI.Canvas.prototype.drawImage = function(image, opt_width, opt_height){
  var width = opt_width || SUI.typeCast(image.getAttribute('width'));
  var height = opt_height || SUI.typeCast(image.getAttribute('height'));
  this.context.save();
  this.context.drawImage(image.getNode(), 0, 0, width, height);
  this.context.restore();
};

/**
 * @param {number} x
 * @param {number} y
 * @returns {!CanvasPixelArray}
 */
SUI.Canvas.prototype.getImageDataXY = function(x, y){
  return this.context.getImageData(x, y, 1, 1).data;
};

/**
 * @param {number} x
 * @param {number} y
 * @returns {undefined}
 */
SUI.Canvas.prototype.eventMouseMove = function(x, y){

};

/**
 * @returns {undefined}
 */
SUI.Canvas.prototype.clear = function(){
  this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
};
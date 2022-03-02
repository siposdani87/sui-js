import { consoleWarn } from "../base";
import { Item } from "../core/item";

/**
 * @constructor
 * @this {Time}
 * @param {!Item} node
 * @param {!Object} options
 */
export const Time = function(node, options) {
  this.timeNode = node;
  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
Time.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
Time.prototype._init = function() {
  this._initCircleNode();
  this._initPointerNode();
};

/**
 * @private
 * @return {undefined}
 */
Time.prototype._initCircleNode = function() {
  const circleNode = new Item('div');
  circleNode.addClass('circle');
  this.timeNode.appendChild(circleNode);
  const circleNodeStyle = window.getComputedStyle(circleNode.getNode());
  const width = parseInt(circleNodeStyle.width.slice(0, -2), 10);
  const height = parseInt(circleNodeStyle.height.slice(0, -2), 10);
  this.timeNode.removeChild(circleNode);
  this._initSize(width, height);
};

/**
 * @private
 * @param {number} width
 * @param {number} height
 * @return {undefined}
 */
Time.prototype._initSize = function(width, height) {
  const timeNodeStyle = window.getComputedStyle(this.timeNode.getNode());
  this.options.width = parseInt(timeNodeStyle.width.slice(0, -2), 10) - width;
  this.options.height = parseInt(timeNodeStyle.height.slice(0, -2), 10) - height;

  this.options.radius_x = this.options.width / 2;
  this.options.radius_y = this.options.height / 2;
};

/**
 * @private
 * @return {undefined}
 */
Time.prototype._initPointerNode = function() {
  const centerPointNode = new Item('div');
  centerPointNode.addClass('center-point');
  this.timeNode.appendChild(centerPointNode);

  this.pointerNode = new Item('div');
  this.pointerNode.addClass('pointer');
  this.timeNode.appendChild(this.pointerNode);
};

/**
 * @param {number} start
 * @param {number} n
 * @param {number=} opt_j
 * @param {boolean=} opt_isClockWise
 * @return {undefined}
 */
Time.prototype.draw = function(start, n, opt_j = 1, opt_isClockWise = true) {
  this._drawCircles(start, n, opt_j, opt_isClockWise);
};

/**
 * @private
 * @param {number} start
 * @param {number} n
 * @param {number=} opt_j
 * @param {boolean=} opt_isClockWise
 * @return {undefined}
 */
Time.prototype._drawCircles = function(start, n, opt_j = 1, opt_isClockWise = true) {
  let k = 0;
  for (let i = start; i <= n; i++) {
    const circle = new Item('div');
    this.timeNode.appendChild(circle);

    if (i % opt_j === 0) {
      const text = this.options.captions && this.options.captions[k] ? this.options.captions[k] : i;
      circle.setHtml(text);
      k++;
    }
    this._setCircleStyle(circle, start, n, i, opt_j, opt_isClockWise);
    this._setCircleEvent(circle, i);
  }
};

/**
 * @private
 * @param {!Item} circle
 * @param {number} i
 * @return {undefined}
 */
Time.prototype._setCircleEvent = function(circle, i) {
  circle.setData('index', i);
  circle.addEventListener('click', (circle) => {
    const index = /** @type {number} */ (circle.getData('index'));
    this.eventClick(index);
  });
};

/**
 * @private
 * @param {!Item} circle
 * @param {number} start
 * @param {number} n
 * @param {number} i
 * @param {number=} opt_j
 * @param {boolean=} opt_isClockWise
 * @return {undefined}
 */
Time.prototype._setCircleStyle = function(circle, start, n, i, opt_j = 1, opt_isClockWise = true) {
  const index = ((opt_j / 2) > (i % opt_j) ? i % opt_j : opt_j - (i % opt_j));
  const selected = this.options.selected === i ? 'selected' : null;
  const top = this.options.radius_y + this.options.radius_y * Math.cos((360 / (n + 1 - start) / 180) * i * Math.PI) * -1;
  const left = this.options.radius_x + this.options.radius_x * Math.sin((360 / (n + 1 - start) / 180) * i * Math.PI) * (opt_isClockWise ? 1 : -1);

  circle.addClass(['circle', 'highlight' + index, selected]);
  circle.setStyle({
    'position': 'absolute',
    'z-index': 100 - index,
    'top': top + 'px',
    'left': left + 'px',
  });
  if (selected) {
    const radian = (360 / (n + 1 - start) / 180) * i * Math.PI;
    const degrees = radian * (180 / Math.PI) - 90;

    this.pointerNode.setStyle({
      'transform': 'rotate(' + degrees + 'deg)',
    });
  }
};

/**
 * @param {number} index
 */
Time.prototype.eventClick = function(index) {
  consoleWarn('Time.eventClick()', index);
};

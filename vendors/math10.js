/**
 * Decimal adjustment of a number.
 *
 * @param {string} type The type of adjustment.
 * @param {number} value The number.
 * @param {number} exp The exponent (the 10 logarithm of the adjustment base).
 * @returns {number} The adjusted value.
 */
 function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  var parts = value.toString().split('e');
  value = Math[type](+(parts[0] + 'e' + (parts[1] ? (+parts[1] - exp) : -exp)));
  // Shift back
  parts = value.toString().split('e');
  return +(parts[0] + 'e' + (parts[1] ? (+parts[1] + exp) : exp));
}

var Math10 = {};

/**
 * Decimal round
 *
 * @param {number} value
 * @param {number} exp
 * @returns {number}
 */
Math10.round = function(value, exp) {
  return decimalAdjust('round', value, exp);
};

/**
 * Decimal floor
 *
 * @param {number} value
 * @param {number} exp
 * @returns {number}
 */
Math10.floor = function(value, exp) {
  return decimalAdjust('floor', value, exp);
};

/**
 * Decimal ceil
 *
 * @param {number} value
 * @param {number} exp
 * @returns {number}
 */
Math10.ceil = function(value, exp) {
  return decimalAdjust('ceil', value, exp);
};

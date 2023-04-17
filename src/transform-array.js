const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  let result = [];
  let prev = -1;

  if (!Array.isArray(arr)) throw new Error('\'arr\' parameter must be an instance of the Array!');

  let i =0;
  while (i < arr.length) {
    switch (arr[i]) {
      case '--discard-next': {
        i ++;
        prev = -1;
        break;
      }
      case '--discard-prev': {
        if ((result.length > 0) && (prev >= 0)) {
          result.pop();
          prev = -1;
        }
        break;
      }
      case '--double-next': {
        if (i < arr.length - 1) result.push(arr[i + 1]);
        break;
      }
      case '--double-prev': {
        if ((i > 0) && (prev >= 0)) result.push(arr[i - 1]);
        prev = -1;
        break;
      }
      default: {
        result.push(arr[i]);
        prev = i;
      }
    }

    i++;
  }

  return result;
}

module.exports = {
  transform
};

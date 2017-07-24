/*
 * Add some documentation here
 */
function whiteList(obj, schema) {
  return Object.keys(schema)
    .reduce((whiteObj, key) => {
      if (obj.hasOwnProperty(key)) {
        if (obj[key].constructor === Array && obj[key].length !== 0) {
          whiteObj[key] = obj[key].map(v => whiteList(v, schema[key][0]));
        } else if (typeof obj[key] === 'object') {
          whiteObj[key] = whiteList(obj[key], schema[key]);
        } else {
          whiteObj[key] = obj[key];
        }
      }

      return whiteObj;
    }, {});
}

module.exports = { whiteList };
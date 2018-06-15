exports.sanitizeURLPath = function (input) {
  return input.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
};

const expect = require('chai').expect;
const StringUtils = require('../../lib/utils/string-utils');

describe('StringUtils.sanitizeURLPath', () => {
  it('sanitize text',  () => {
    expect(StringUtils.sanitizeURLPath('This is example')).to.equal('this-is-example');
  });
});

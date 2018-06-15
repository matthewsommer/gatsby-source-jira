const expect = require('chai').expect;
const sinon = require('sinon');

const IssuesDAO = require('../../lib/dao/issues-dao');

describe('IssuesDAO.fetchIssues', () => {
  const sandbox = sinon.createSandbox();
  const issuesDAO = new IssuesDAO('jira.mattsommer.io');
  
  afterEach(() => sandbox.restore());
  
  it('fetch all pages with issues', (done) => {
    sandbox.stub(issuesDAO, 'fetchIssuesPage').resolves({ data: { total: 201, issues: [1, 2] }});
    issuesDAO.fetchIssues().then((issues) => {
      sinon.assert.calledThrice(issuesDAO.fetchIssuesPage);
      
      sinon.assert.calledWith(issuesDAO.fetchIssuesPage, undefined);
      sinon.assert.calledWith(issuesDAO.fetchIssuesPage, undefined, 100);
      sinon.assert.calledWith(issuesDAO.fetchIssuesPage, undefined, 200);
      
      expect(issues).to.deep.equal([1, 2, 1, 2, 1, 2]);
      done();
    });
  });
});

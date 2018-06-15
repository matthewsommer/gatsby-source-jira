const axios = require('axios');

const PAGE_SIZE = 100;

class IssuesDAO {
  constructor (host) {
    this.axiosInstance = axios.create({ baseURL: `https://${host}/rest/api/2` });
  }
  
  fetchIssuesPage (jql, startAt = 0, maxResults = PAGE_SIZE) {
    return this.axiosInstance.get('/search', { params: { jql, startAt, maxResults }})
      .catch(console.error);
  }
  
  fetchIssues (jql) {
    return this.fetchIssuesPage(jql)
      .then(response => {
        const promises = [];
        for (let startAt = PAGE_SIZE; startAt < response.data.total; startAt += PAGE_SIZE) {
          promises.push(this.fetchIssuesPage(jql, startAt));
        }
        
        return Promise.all(promises).then(responses => {
          const issues = [...response.data.issues];
          responses.forEach(r => issues.push(...r.data.issues));
          return issues;
        })
      })
      .catch(console.error);
  }
}

module.exports = IssuesDAO;

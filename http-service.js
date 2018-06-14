const axios = require('axios');

module.exports = class HttpService {

    constructor(host) {
        this.httpService = axios.create({
            baseURL: 'https://' + host + '/rest/api/2/search?jql=',
        });
    }

    get(path, callback) {
        return this.httpService.get(path).then(
            (response) => callback(response.status, response.data)
        ).catch(console.log);
    }

    static sanitizeURLPath(input) {
        return input.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
    }

    jiraQuery(jql, startAt) {
        return this.httpService.get('', {
            params: {
                jql: jql,
                startAt: startAt,
                maxResults: "100"
            }
        }).catch(console.log);
    }

    queryArray(host, total) {
        const queries = [];
        for (let i = 0; i < Math.floor(total / 100); i++) {
            queries[i] = this.jiraQuery('', (i + 1) * 100);
        }
        return queries;
    }

}

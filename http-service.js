const axios = require('axios');

module.exports = class HttpService {

    constructor(host) {
        const httpService = axios.create({
            baseURL: 'https://' + host + '/rest/api/2/search?jql=',
        });
        this.httpService = httpService;
    }

    get(path, callback) {
        return this.httpService.get(path).then(
            (response) => callback(response.status, response.data)
        ).catch(function (error) {
            console.log(error);
        });
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
        }).catch(function (error) {
            console.log(error);
        });
    }

    queryArray(host, total) {
        var queries = [];
        for (var i = 0; i < Math.floor(total / 100); i++) {
            queries[i] = this.jiraQuery('', (i + 1) * 100);
        }
        return queries;
    }

}
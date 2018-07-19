/**
 * Gatsby's Node API Interface to Jira Data Source
 * Matt Sommer
 */

const IssuesDAO = require('./lib/dao/issues-dao');
const DigestUtils = require('./lib/utils/digest-utils');
const StringUtils = require('./lib/utils/string-utils');
const Logger = require('./lib/utils/log-utils');

exports.sourceNodes = async ({ boundActionCreators }, configOptions) => {
  Logger.log(`host: ${configOptions.host}`);
  Logger.log(`epic field id: ${configOptions.epic_field_id}`);
  
  const issues = await new IssuesDAO(configOptions.host).fetchIssues();
  
  Logger.log(`returned issues: ${issues.length}`);
  issues.forEach((issue) => {
    issue = JSON.parse(
      JSON.stringify(issue)
        .replace(/16x16/g, 'size16x16') // GraphQL node names cannot start with a number ...
        .replace(/24x24/g, 'size24x24') // https://github.com/graphql/graphql-js/blob/master/src/utilities/assertValidName.js#L14
        .replace(/32x32/g, 'size32x32')
        .replace(/48x48/g, 'size48x48')
        .replace(/fields/g, 'jiraFields') // Gatsby already uses the fields attribute
        .replace(/\/secure\/attachment\//g, 'https://' + configOptions.host + '/secure/attachment/')
    );
    
    const node = {
      parent: '__SOURCE__',
      internal: {
        type: 'JiraIssue', // name of the graphQL query --> allTask {}
      },
      children: [],
      id: issue.id,
      key: issue.key,
      type: issue.jiraFields.issuetype.name,
      summary: issue.jiraFields.summary,
      status: issue.jiraFields.status.name,
      labels: issue.jiraFields.labels,
      components: issue.jiraFields.components,
      project: issue.jiraFields.project.name,
      epic: issue.jiraFields[configOptions.epic_field_id],
      jiraIssue: issue,
      slug: StringUtils.sanitizeURLPath(issue.jiraFields.project.name) + '/' + StringUtils.sanitizeURLPath(issue.jiraFields.summary),
    };

    node.internal.contentDigest = DigestUtils.createDigest(node);
    boundActionCreators.createNode(node);
  });
};

# Gatsby Source Plugin - Jira
This is the code repository for a Gatsby Jira data source.

[![Build Status](https://travis-ci.org/matthewsommer/gatsby-source-jira.svg?branch=master)](https://travis-ci.org/matthewsommer/gatsby-source-jira)

# Example Usage in Gatsby Config File
In your gatsby-config.js file add the plugin and set the host. Change the host to your Jira host.

```javascript
module.exports = {
  siteMetadata: {
    title: 'Jira REST Client',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    {
      resolve: "gatsby-source-jira",
      options: {
        host: "jira.mattsommer.io",
        epic_field_id: "customfield_10009",
      },
    }]
}
```
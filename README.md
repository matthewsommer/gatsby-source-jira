# Gatsby Source Plugin - Jira
This is the code repository for a Gatsby Jira data source.

# Example Usage in Gatsby Config File
In your gatsby-config.js file add the plugin and set the host.

```javascript
module.exports = {
  siteMetadata: {
    title: 'Gatsby Site with Jira Data Source',
  },
  plugins: [
    {
      resolve: "gatsby-source-jira",
      options: {
        host: "jira.atlassian.net",
      },
    }]
}
```
const GitHubClient = require('./GitHubClient.js').GitHubClient;

const githubUrl = localStorage.getItem("github_url");
const githubToken = localStorage.getItem("github_token");

export const githubCliEnterprise = new GitHubClient({
  baseUri: `${githubUrl}/api/v3`,
  token: githubToken
});

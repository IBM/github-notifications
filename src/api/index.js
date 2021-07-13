import { githubToken } from '../utils/authentication';

const GitHubClient = require('../libs/GitHubClient.js').GitHubClient;

export const githubCliEnterprise = new GitHubClient({
  baseUri:"***REMOVED***/api/v3",
  token: githubToken
});

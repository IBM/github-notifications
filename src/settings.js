module.exports = {
  github: {
    baseUrl: process.env.GITHUB_URL,
    owner: process.env.GITHUB_OWNER,
    token: process.env.GITHUB_TOKEN,
    repo: process.env.PROJECT_NAME,
    org: process.env.GITHUB_ORG,
  },
  conversion: {
    useLowerCaseLabels: true,
  },
  debug: false
};

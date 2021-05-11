import { githubCliEnterprise } from './index';

export async function getCommits(url = '') {
  try {
    const pr = getPrUrl(url);
    const { repo, number } = pr;
    const results = await githubCliEnterprise.getData({path:`/repos/${repo}/pulls/${number}/commits`});
    const commits = findJiraTickets(results);
    console.log('commits: ', commits);
    return { commits, pr: number };
  } catch (error) {
    console.log(error);
    return error;
  }
}

function findJiraTickets(commits) {
  let processedCommits = [];
  const commitsArray = commits.data;
  let index = 0;
  for ( const commit of commitsArray) {
    index++;
    console.log('commit: ', commit);
    const { commit: { message, author, committer: { name, date } } } = commit;
    const jira = findByRegex(message);
    const newCommit = {
      index,
      message,
      author: author.name,
      name,
      date,
      jira
    }
    processedCommits.push(newCommit);
  }
  return processedCommits;
}

function findByRegex(message) {
  let jira = [];
  const xpsRegex = 'XPS-\\d{3,6}';
  const horizonRegex = 'HORIZON-\\d{3,6}';
  const xps = message.match(xpsRegex);
  const horizon = message.match(horizonRegex);
  if (xps) { jira.push(xps); }
  if (horizon) { jira.push(horizon); }
  return jira;
}

function getPrUrl(url) {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const path = pathname.split('/');
  const repo = `${path[1]}/${path[2]}`;
  const number = path[4];
  console.log(repo);
  return { repo, number };
}

import { uniq } from 'lodash';
import { githubCliEnterprise } from './index';

export async function getCommits(url = '') {
  try {
    const pr = getPrUrl(url);
    const { repo, number } = pr;
    const results = await githubCliEnterprise.getData({path:`/repos/${repo}/pulls/${number}/commits`});
    const { commits, jira } = findJiraTickets(results);
    return { commits, pr: number, jira };
  } catch (error) {
    console.log(error);
    return error;
  }
}

function findJiraTickets(input) {
  let commits = [];
  let tickets = [];
  const commitsArray = input.data;
  let index = 0;
  for ( const commit of commitsArray) {
    index++;
    const { commit: { message, author, committer: { name, date } } } = commit;
    const ticket = findByRegex(message);
    tickets.push(ticket);
    const newCommit = {
      index,
      message,
      author: author.name,
      name,
      date
    }
    commits.push(newCommit);
  }
  const cleanedJira = [].concat.apply([], tickets);
  const jira = uniq(cleanedJira.flat());
  return { commits, jira };
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
  return { repo, number };
}

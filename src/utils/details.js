import { uniq } from "lodash";

export function getPrUrl(url) {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const path = pathname.split('/');
  const repo = `${path[1]}/${path[2]}`;
  const number = path[4];
  return { repo, number };
}

export function findJiraTickets(input) {
  let commits = [];
  let tickets = [];
  const commitsArray = input.data;
  let index = 0;
  for ( const commit of commitsArray) {
    index++;
    const { commit: { url, message, author, committer: { name, date } } } = commit;
    const ticket = findByRegex(message);
    tickets.push(ticket);
    const newUrl = getNewUrl(url);
    const newCommit = {
      index,
      message,
      author: author.name,
      name,
      date,
      url: newUrl
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

function getNewUrl(url) {
  const parseUrl = new URL(url);
  const { hostname, pathname, protocol } = parseUrl;
  const path = pathname.split('/');
  console.log(`${protocol}//${hostname}/${path[4]}/${path[5]}/commit/${path[8]}`);
  return `${protocol}//${hostname}/${path[4]}/${path[5]}/commit/${path[8]}`;
}

import {uniq} from "lodash";

export function getPrUrl(url) {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const path = pathname.split('/');
  const repo = `${path[1]}/${path[2]}`;
  const number = path[4];
  return { repo, number };
}

export function formatCommits(input) {
  let commits = [];
  const commitsArray = input.data;
  let index = 0;
  for ( const commit of commitsArray) {
    index++;
    const { commit: { url, message, author, committer: { name, date } } } = commit;
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
  return commits;
}

export function findJiraTicketForCommits(input) {
  let tickets = [];
  const newArray = input.data;
  let index = 0;
  for ( const item of newArray) {
    index++;
    const ticket = findByRegex(item.commit.message);
    tickets.push(ticket);
  }
  const cleanedJira = [].concat.apply([], tickets);
  return uniq(cleanedJira.flat());
}

export function findJiraTicketForNotifications(item) {
  const ticket = findByRegex(item.subject.title);
  const cleanedJira = [].concat.apply([], ticket);
  return uniq(cleanedJira.flat());
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

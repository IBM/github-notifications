const GitHubClient = require('../libs/GitHubClient.js').GitHubClient;

const githubCliEnterprise = new GitHubClient({
  baseUri:"***REMOVED***/api/v3",
  token:"***REMOVED***"
});

export async function getNotifications() {
  try {
    const notifications = await githubCliEnterprise.getData({path:'/notifications'});
    return readNotifications(notifications);
  } catch (error) {
    console.log(error);
  }
}

function readNotifications(notifications) {
  return processNotifications(notifications);
}

function sortNotifications(notifications) { return notifications.slice().sort((a, b) => b.updated_at - a.updated_at) }

async function processNotifications(notifications) {
  let processedNotification = [];
  const notificationArray = notifications.data;
  let index = 0;
  for ( const notification of notificationArray) {
    const { reason, updated_at, subject: { title = '', url = '', type = '' } = {}, repository: { full_name = '' } = {}} = notification;
    const processedUrl = await getUrlBasedOnType(type, url, full_name);
    index++;
    const newNotification = {
      index,
      reason,
      updated_at,
      title,
      type,
      url: processedUrl
    };
    processedNotification.push(newNotification);
    console.log('newNotification: ', newNotification);
  }
  console.log('processedNotification: ', processedNotification);
  return sortNotifications(processedNotification);
}

async function getUrlBasedOnType(type = '', url = '', full_name = '') {
  let newUrl;
  if (type === 'PullRequest') {
    const urlPath = getUrlPath(url, 7);
    newUrl = await getPrUrl(full_name, urlPath);
  }
  return newUrl;
}

function getUrlPath(url, number) {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const path = pathname.split('/');
  console.log(path);
  return path[number];
}

async function getPrUrl(full_name = '', url = '') {
  const pr = await githubCliEnterprise.getData({path:`/repos/${full_name}/pulls/${url}`});
  return pr.data['html_url'];
}

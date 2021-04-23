import { githubCliEnterprise } from './index';

export async function getNotifications() {
  try {
    const notifications = await githubCliEnterprise.getData({path:'/notifications'});
    return readNotifications(notifications);
  } catch (error) {
    console.log(error);
    return error;
  }
}

function readNotifications(notifications) {
  return processNotifications(notifications);
}

function sortNotifications(notifications) { return notifications.slice().sort((a, b) => b.updated_at - a.updated_at) }

async function getPrDataBasedOnType(type = '', url = '', full_name = '') {
  let prData = {};
  let comments = [];
  if (type === 'PullRequest') {
    const urlPath = getUrlPath(url, 7);
    prData = await getPrData(full_name, urlPath);
    comments = await getPrCommentsData(full_name, urlPath);
  }
  return { prData, comments };
}

function getUrlPath(url, number) {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const path = pathname.split('/');
  console.log(path);
  return path[number];
}

async function getPrData(full_name = '', url = '') {
  const pr = await githubCliEnterprise.getData({path:`/repos/${full_name}/pulls/${url}`});
  const { data: { html_url = '', user: { avatar_url } = {} } = {} } = pr;
  const selectedData = { html_url, avatar_url }
  return selectedData;
}

async function getPrCommentsData(full_name = '', url = '') {
  const comments = await githubCliEnterprise.getData({path:`/repos/${full_name}/pulls/${url}/comments`});
  if (comments.length) {
    let processedComments = [];
    const commentsArray = comments.data;
    let index = 0;
    for ( const comment of commentsArray) {
      index++;
      const { user: { login, avatar_url } = {}, body } = comment;
      const newComment = {
        index,
        login,
        avatar_url,
        body
      };
      processedComments.push(newComment);
    }
    return processedComments;
  }
  return [];
}

async function processNotifications(notifications) {
  let processedNotification = [];
  const notificationArray = notifications.data;
  let index = 0;
  for ( const notification of notificationArray) {
    index++;
    const { reason, updated_at, subject: { title = '', url = '', type = '' } = {}, repository: { full_name = '' } = {}} = notification;
    const selectedPrData = await getPrDataBasedOnType(type, url, full_name);
    const { prData: { html_url, avatar_url }, comments } = selectedPrData;
    const newNotification = {
      index,
      reason,
      updated_at,
      title,
      type,
      html_url,
      full_name,
      avatar_url,
      comments
    };
    processedNotification.push(newNotification);
    console.log('newNotification: ', newNotification);
  }
  console.log('processedNotification: ', processedNotification);
  return sortNotifications(processedNotification);
}

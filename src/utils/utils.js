import {githubCliEnterprise} from "../api/index";

export async function processNotifications(notifications) {
  let processedNotification = [];
  const notificationArray = notifications.data;
  let index = 0;
  for ( const notification of notificationArray) {
    index++;
    const { reason, updated_at, subject: { title = '', url = '', type = '' } = {}, repository: { full_name = '' } = {}} = notification;
    const selectedPrData = await getPrDataBasedOnType(type, url, full_name);
    const { prData: { html_url, avatar_url } } = selectedPrData;
    const newNotification = {
      index,
      reason,
      updated_at,
      title,
      type,
      html_url,
      full_name,
      avatar_url
    };
    processedNotification.push(newNotification);
  }
  console.log('processedNotification: ', processedNotification);
  return sortNotifications(processedNotification);
}

async function getPrDataBasedOnType(type = '', url = '', full_name = '') {
  let prData = {};
  if (type === 'PullRequest') {
    const number = getPrNumber(url, 7);
    prData = await getPrData(full_name, number);
  }
  return { prData };
}

function getPrNumber(url, number) {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const path = pathname.split('/');
  return path[number];
}

async function getPrData(full_name = '', url = '') {
  const pr = await githubCliEnterprise.getData({path:`/repos/${full_name}/pulls/${url}`});
  const { data: { html_url = '', user: { avatar_url } = {} } = {} } = pr;
  return { html_url, avatar_url };
}

function sortNotifications(notifications) { return notifications.slice().sort((a, b) => b.updated_at - a.updated_at) }

export async function processNotifications(notifications) {
  let processedNotification = [];
  const notificationArray = notifications.data;
  let index = 0;
  for ( const notification of notificationArray) {
    index++;
    const { reason, updated_at, subject: { title = '', url = '', type = '' } = {}, repository: { full_name = '' } = {}} = notification;
    const html_url = await getPrNumber(url);
    const newNotification = {
      index,
      reason,
      updated_at,
      title,
      type,
      html_url,
      full_name
    };
    processedNotification.push(newNotification);
  }
  console.log('processedNotification: ', processedNotification);
  return sortNotifications(processedNotification);
}

function getPrNumber(url) {
  const parseUrl = new URL(url);
  const { hostname, pathname, protocol } = parseUrl;
  const path = pathname.split('/');
  return `${protocol}//${hostname}/${path[4]}/${path[5]}/pull/${path[7]}`;
}

function sortNotifications(notifications) { return notifications.slice().sort((a, b) => b.updated_at - a.updated_at) }

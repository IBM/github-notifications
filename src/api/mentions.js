import {githubCliEnterprise} from "./index";
import { processNotifications } from '../utils/utils';

export async function getMentionedNotifications(notifications) {
  try {
    let mentions = [];
    notifications.forEach((note) => {
      if (note.reason === 'mention') { mentions.push(note) }
    });
    return mentions;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMentionedNotificationsByDate(since) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    const processedNotifications = await processNotifications(notifications);
    console.log('getMentionedNotificationsByDate processedNotifications: ', processedNotifications);
    let mentions = [];
    processedNotifications.forEach((note) => {
      if (note.reason === 'mention') { mentions.push(note) }
    });
    console.log('getMentionedNotificationsByDate mentions: ', mentions);
    return mentions;
  } catch (error) {
    console.log(error);
    return error;
  }
}

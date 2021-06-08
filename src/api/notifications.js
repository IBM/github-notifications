import {githubCliEnterprise} from './index';
import { processNotifications } from '../utils/utils';

export async function getNotifications() {
  try {
    const notifications = await githubCliEnterprise.getData({path:'/notifications'});
    return processNotifications(notifications);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getNotificationsByDate(since) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    return processNotifications(notifications);
  } catch (error) {
    console.log(error);
    return error;
  }
}

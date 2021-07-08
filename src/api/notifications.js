import {githubCliEnterprise} from './index';
import { processNotifications } from '../utils/utils';

export async function getNotifications(since) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    console.log(notifications);
    return processNotifications(notifications);
  } catch (error) {
    console.log(error);
    return error;
  }
}

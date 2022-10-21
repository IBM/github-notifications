import {githubCliEnterprise} from "./index";
import {processNotifications} from "../utils/common";

export async function getNotifications(since) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    return processNotifications(notifications);
  } catch (error) {
    return error;
  }
}

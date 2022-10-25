import { githubCliEnterprise } from "./index";
import { processNotifications } from "../utils/common";

export async function getNotifications(since) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    return processNotifications(notifications.data);
  } catch (error) {
    return error;
  }
}

export async function setThreadSubscription(id, data) {
  try {
    return await githubCliEnterprise.putData({ path: `/notifications/threads/${id}/subscription`, data });
  } catch (error) {
    return error;
  }
}

export async function getThreadSubscription(id) {
  try {
    return await githubCliEnterprise.getData({ path: `/notifications/threads/${id}/subscription` });
  } catch (error) {
    return error;
  }
}

import { githubCliEnterprise } from "./index";

export async function getNotifications(since) {
  try {
    return await githubCliEnterprise.getData({path:`/notifications?since=${since}&all=true`});
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

export async function setThreadSubscription(id, data) {
  try {
    return await githubCliEnterprise.putData({ path: `/notifications/threads/${id}/subscription`, data });
  } catch (error) {
    return error;
  }
}

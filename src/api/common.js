import { githubCliEnterprise } from "./index";
import { processNotifications } from "../utils/common";

export async function getNotificationsByDate(since, type = null) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    const processedNotifications = processNotifications(notifications);
    if (type) {
      let specifiedNotificationsByType = [];
      processedNotifications.forEach((note) => {
        if (note.reason === type) { specifiedNotificationsByType.push(note) }
      });
      return specifiedNotificationsByType;
    }
    return processedNotifications;
  } catch (error) {
    return error;
  }
}

export async function getNotificationsByType(notifications, type) {
  let result = []
  notifications.forEach((note) => {
    if (note.reason === type) { result.push(note) }
  });
  return result;
}

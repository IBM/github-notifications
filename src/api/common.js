import { githubCliEnterprise } from "./index";
import { processNotifications } from "../utils/utils";

export async function getNotificationsByDate(since, type) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    const processedNotifications = await processNotifications(notifications);
    let specifiedNotificationsByType = [];
    processedNotifications.forEach((note) => {
      if (note.reason === type) { specifiedNotificationsByType.push(note) }
    });
    return specifiedNotificationsByType;
  } catch (error) {
    console.log(error);
    return error;
  }
}

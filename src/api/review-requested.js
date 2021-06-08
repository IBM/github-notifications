import { githubCliEnterprise } from "./index";
import { processNotifications } from "../utils/utils";

export async function getReviewRequestedNotifications(notifications) {
  try {
    let reviewRequested = []
    notifications.forEach((note) => {
      if (note.reason === 'review_requested') { reviewRequested.push(note) }
    });
    return reviewRequested;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getReviewRequestedNotificationsByDate(since) {
  try {
    const notifications = await githubCliEnterprise.getData({path:`/notifications?since=${since}`});
    const processedNotifications = await processNotifications(notifications);
    let reviewRequested = [];
    processedNotifications.forEach((note) => {
      if (note.reason === 'review_requested') { reviewRequested.push(note) }
    });
    return reviewRequested;
  } catch (error) {
    console.log(error);
    return error;
  }
}

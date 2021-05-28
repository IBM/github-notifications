import { find } from 'lodash';

export async function getMentionedNotifications(notifications) {
  try {
    let mentions = []
    const foundMentions = find(notifications, o => o.reason === 'mention');
    if (foundMentions) { mentions.push(foundMentions) }
    return mentions;
  } catch (error) {
    console.log(error);
    return error;
  }
}

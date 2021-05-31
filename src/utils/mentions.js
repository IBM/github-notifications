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

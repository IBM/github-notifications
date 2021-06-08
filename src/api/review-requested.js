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

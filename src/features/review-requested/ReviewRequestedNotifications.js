import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListSkeleton, Link
} from 'carbon-components-react';
import NotificationsSideNav from '../common/NotificationsSideNav';
import { fetchNotifications } from "../../actions/notifications";
import { fetchReviewRequestedNotifications, fetchReviewRequestedNotificationsByDate } from "../../actions/review-requested";
import moment from "moment";

function ReviewRequestedNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const reviewRequested = useSelector((state) => state.reviewRequested.reviewRequested);
  const areReviewRequestedNotificationsLoading = useSelector((state) => state.reviewRequested.areReviewRequestedNotificationsLoading);

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications(moment().subtract(4, 'week').toISOString()));
    }
    dispatch(fetchReviewRequestedNotifications(notifications, 'review_requested'));
  }, [dispatch, notifications]);

  const filterByDate  = (event, date) => {
    event.preventDefault();
    dispatch(fetchReviewRequestedNotificationsByDate(date, 'review_requested'));
  }

  return (
    <div className="review-requested__main">
      <div className="review-requested__main__content">
        <div className="review-requested__main__list">
          {notifications.length && !areReviewRequestedNotificationsLoading ? (
            <StructuredListWrapper selection>
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head>Title</StructuredListCell>
                  <StructuredListCell head>Last updated</StructuredListCell>
                  <StructuredListCell head>Type</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                { reviewRequested.length ? reviewRequested.map(note => (
                  <StructuredListRow key={note.index}>
                    <StructuredListCell>
                      <h6>{note.full_name}</h6>
                      <Link href={note.html_url} target='_blank' key={note.index}>
                        <h4>{note.title}</h4>
                      </Link>
                    </StructuredListCell>
                    <StructuredListCell>
                      <h6>{moment(note.updated_at).fromNow()}</h6>
                      ({note.updated_at})
                    </StructuredListCell>
                    <StructuredListCell>{ note.type }</StructuredListCell>
                  </StructuredListRow>
                ))
                  : <StructuredListRow><StructuredListCell>No notifications</StructuredListCell></StructuredListRow>
                }
              </StructuredListBody>
            </StructuredListWrapper>
          )
          : <StructuredListSkeleton />}
        </div>
      </div>
      <NotificationsSideNav activeLink="review-requested" onClick={(e, date) => filterByDate(e, date)} />
    </div>
  );
}

export default ReviewRequestedNotifications;

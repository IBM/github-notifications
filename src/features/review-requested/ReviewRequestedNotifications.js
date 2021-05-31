import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Loading,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell
} from 'carbon-components-react';
import NotificationsSideNav from '../common/NotificationsSideNav';
import { fetchNotifications } from "../../actions/notifications";
import { fetchReviewRequestedNotifications } from "../../actions/review-requested";

function ReviewRequestedNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const reviewRequested = useSelector((state) => state.reviewRequested.reviewRequested);
  const areReviewRequestedNotificationsLoading = useSelector((state) => state.reviewRequested.areReviewRequestedNotificationsLoading);

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications());
    }
    dispatch(fetchReviewRequestedNotifications(notifications));
  }, [dispatch, notifications])

  return (
    <div className="review-requested__main">
      <div className="review-requested__main__content">
        <div className="review-requested__main__list">
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Title</StructuredListCell>
                <StructuredListCell head>Last updated</StructuredListCell>
                <StructuredListCell head>Type</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {notifications.length && reviewRequested.length && !areReviewRequestedNotificationsLoading ? reviewRequested.map(mention => (
                  <StructuredListRow key={mention.index}>
                    <StructuredListCell>{ mention.title }</StructuredListCell>
                    <StructuredListCell>{ mention.updated_at }</StructuredListCell>
                    <StructuredListCell>{ mention.type }</StructuredListCell>
                  </StructuredListRow>
                ))
                : <Loading description="Active loading indicator" withOverlay />}
            </StructuredListBody>
          </StructuredListWrapper>
        </div>
      </div>
      <NotificationsSideNav activeLink="review-requested" />
    </div>
  );
}

export default ReviewRequestedNotifications;

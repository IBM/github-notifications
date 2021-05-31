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
import { fetchMentionedNotifications } from "../../actions/mentions";

function ReviewRequestedNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const mentions = useSelector((state) => state.mentions.mentions);
  const areMentionedNotificationsLoading = useSelector((state) => state.mentions.areMentionedNotificationsLoading);

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications());
    }
    dispatch(fetchMentionedNotifications(notifications));
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
              {notifications.length && mentions.length && !areMentionedNotificationsLoading ? mentions.map(mention => (
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

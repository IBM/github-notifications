import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListSkeleton
} from 'carbon-components-react';
import NotificationsSideNav from '../common/NotificationsSideNav';
import { fetchNotifications } from "../../actions/notifications";
import { fetchMentionedNotifications, fetchMentionedNotificationsByDate } from "../../actions/mentions";
import moment from "moment";

function MentionedNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const mentions = useSelector((state) => state.mentions.mentions);
  const areMentionedNotificationsLoading = useSelector((state) => state.mentions.areMentionedNotificationsLoading);

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications(moment().subtract(4, 'week').toISOString()));
    }
    dispatch(fetchMentionedNotifications(notifications, 'mention'));
  }, [dispatch, notifications]);

  const filterByDate  = (event, date) => {
    event.preventDefault();
    dispatch(fetchMentionedNotificationsByDate(date, 'mention'));
  }

  return (
    <div className="mentions__main">
      <div className="mentions__main__content">
        <div className="mentions__main__list">
          {notifications.length && !areMentionedNotificationsLoading ? (
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Title</StructuredListCell>
                <StructuredListCell head>Last updated</StructuredListCell>
                <StructuredListCell head>Type</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              { mentions.length ? mentions.map(mention => (
                <StructuredListRow key={mention.index}>
                  <StructuredListCell>{ mention.title }</StructuredListCell>
                  <StructuredListCell>
                    <h6>{moment(mention.updated_at).fromNow()}</h6>
                    ({mention.updated_at})
                  </StructuredListCell>
                  <StructuredListCell>{ mention.type }</StructuredListCell>
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
      <NotificationsSideNav activeLink="mentions" onClick={(e, date) => filterByDate(e, date)} />
    </div>
  );
}

export default MentionedNotifications;

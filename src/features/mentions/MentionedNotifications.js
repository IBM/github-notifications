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
import moment from "moment";
import NotificationsHeaderContainer from "../common/NotificationsHeaderContainer";
import { fetchNotifications } from "../../actions/notifications";
import { fetchMentionedNotifications, fetchMentionedNotificationsByDate } from "../../actions/mentions";
import { defaultFetchTime } from '../common/Common';

function MentionedNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const mentions = useSelector((state) => state.mentions.mentions);
  const areMentionedNotificationsLoading = useSelector((state) => state.mentions.areMentionedNotificationsLoading);

  useEffect(() => {
    if (!notifications.length && !areMentionedNotificationsLoading) {
      dispatch(fetchNotifications(defaultFetchTime));
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
          <StructuredListWrapper selection className="mentions__main__list__wrapper">
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
                  <StructuredListCell>
                    <h6>{mention.full_name}</h6>
                    <Link href={mention.html_url} target='_blank' key={mention.index}>
                      <h4>{mention.title}</h4>
                    </Link>
                  </StructuredListCell>
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
      <NotificationsHeaderContainer
        activeLink="mentions"
        dateFilter={(e, date) => filterByDate(e, date)}
      />
    </div>
  );
}

export default MentionedNotifications;

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
import { fetchMentionedNotifications } from "../../actions/mentions";

function MentionedNotifications() {
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
    <div className="mentions__main">
      <div className="mentions__main__content">
        <div className="mentions__main__list">
          {notifications.length && mentions.length && !areMentionedNotificationsLoading ? (
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Title</StructuredListCell>
                <StructuredListCell head>Last updated</StructuredListCell>
                <StructuredListCell head>Type</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              { mentions.map(mention => (
                <StructuredListRow key={mention.index}>
                  <StructuredListCell>{ mention.title }</StructuredListCell>
                  <StructuredListCell>{ mention.updated_at }</StructuredListCell>
                  <StructuredListCell>{ mention.type }</StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
            )
            : <StructuredListSkeleton />}
        </div>
      </div>
      <NotificationsSideNav activeLink="mentions" />
    </div>
  );
}

export default MentionedNotifications;

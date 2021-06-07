import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Button,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Link,
  Loading,
  Tag
} from 'carbon-components-react';
import { useHistory } from "react-router-dom";
import NotificationsSideNav from '../common/NotificationsSideNav';
import { ExpandAll32 } from '@carbon/icons-react';
import { fetchNotifications, selectNotification } from '../../actions/notifications';

function Notifications() {
  const dispatch = useDispatch();
  const history = useHistory()
  const notifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications());
    }
  }, [notifications, dispatch])

  const selectNotifications = (notification) => {
    dispatch(selectNotification(notification));
    history.push('/details');
  }

  const tagReason = (reason) => {
    switch (reason) {
      case 'review_requested':
        return <Tag type="red" title={reason}>{reason}</Tag>;
      case 'mention':
        return <Tag type="green" title={reason}>{reason}</Tag>;
      default:
        return <Tag type="gray" title={reason}>{reason}</Tag>;
    }
  }

  return (
    <div className="notifications__main">
      <div className="notifications__main__content">
        <Button onClick={() => fetchNotifications()} className="notifications__main__button">Update</Button>
        <div className="notifications__main__list">
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Title</StructuredListCell>
                <StructuredListCell head>Last updated</StructuredListCell>
                <StructuredListCell head>Reason</StructuredListCell>
                <StructuredListCell head>{' '}</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {notifications.map((notification) => (
                <StructuredListRow key={notification.index}>
                  <StructuredListCell>
                    <Link href={notification.html_url} target='_blank' key={notification.index}>
                      <h6>{notification.full_name}</h6>
                      <h4>{notification.title}</h4>
                    </Link>
                  </StructuredListCell>
                  <StructuredListCell>
                    <time>{moment(notification.updated_at).fromNow()}</time>
                  </StructuredListCell>
                  <StructuredListCell>
                    {tagReason(notification.reason)}
                  </StructuredListCell>
                  <StructuredListCell>
                    <Button
                      kind="tertiary"
                      renderIcon={ExpandAll32}
                      iconDescription="Details"
                      hasIconOnly
                      onClick={() => {selectNotifications(notification)}}
                    />
                  </StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
        </div>
        {areNotificationsLoading ? <Loading description="Active loading indicator" withOverlay /> : null}
        {haveNotificationsError ? <p>Sorry! There was an error loading the items</p> : null}
      </div>
      <NotificationsSideNav activeLink="notifications" />
    </div>
  );
}

export default Notifications;

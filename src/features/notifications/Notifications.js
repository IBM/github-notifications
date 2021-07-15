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
  StructuredListSkeleton,
  Tag
} from 'carbon-components-react';
import { useHistory } from "react-router-dom";
import NotificationsSideNav from '../common/NotificationsSideNav';
import { ZoomIn32, Ticket32 } from '@carbon/icons-react';
import { fetchNotifications, selectNotification } from '../../actions/notifications';

function Notifications() {
  const dispatch = useDispatch();
  const history = useHistory()
  const notifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const error = useSelector((state) => state.notifications.error);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  console.log(useSelector((state) => state));

  useEffect(() => {
    if (!notifications.length && !haveNotificationsError) {
      dispatch(fetchNotifications(moment().subtract(4, 'week').toISOString()));
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

  const filterByDate  = (event, date) => {
    event.preventDefault();
    dispatch(fetchNotifications(date));
  }

  return (
    <div className="notifications__main">
      <div className="notifications__main__content">
        <Button onClick={() => fetchNotifications()} className="notifications__main__button">Update</Button>
        <div className="notifications__main__list">
          <StructuredListWrapper selection className="notifications__main__list__wrapper">
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Title</StructuredListCell>
                <StructuredListCell head>Last updated</StructuredListCell>
                <StructuredListCell head>Reason</StructuredListCell>
                <StructuredListCell head>{' '}</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {notifications && !haveNotificationsError && notifications.map((notification) => (
                <StructuredListRow key={notification.index}>
                  <StructuredListCell>
                    <h6>{notification.full_name}</h6>
                    <Link href={notification.html_url} target='_blank' key={notification.index}>
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
                    <div className="notifications__main__toolbar">
                      <Button
                        kind="tertiary"
                        renderIcon={ZoomIn32}
                        iconDescription="Details"
                        hasIconOnly
                        onClick={() => {selectNotifications(notification)}}
                      />
                      {notification.jira && (
                        <Link href={`https://jira.sec.***REMOVED***/browse/${notification.jira}`} target='_blank'>
                          <Button
                            kind="tertiary"
                            renderIcon={Ticket32}
                            iconDescription="Jira"
                            hasIconOnly
                          />
                        </Link>
                      )
                      }
                    </div>
                  </StructuredListCell>
                </StructuredListRow>
              ))}
              {haveNotificationsError ? <StructuredListRow><StructuredListCell>{ error }</StructuredListCell></StructuredListRow> : null}
            </StructuredListBody>
          </StructuredListWrapper>
        </div>
        {areNotificationsLoading ? <StructuredListSkeleton /> : null}
      </div>
      <NotificationsSideNav activeLink="notifications" onClick={(e, date) => filterByDate(e, date)} />
    </div>
  );
}

export default Notifications;

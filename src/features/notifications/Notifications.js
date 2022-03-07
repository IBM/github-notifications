import React, {useEffect} from 'react';
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
import { ZoomIn32, Ticket32 } from '@carbon/icons-react';
import { useHistory } from "react-router-dom";
import cx from 'classnames';
import NotificationsHeaderContainer from '../common/NotificationsHeaderContainer';
import { fetchNotifications, selectNotification, moveNewNotifications } from '../../actions/notifications';
import { fetchNewNotifications, clearNewNotifications } from '../../actions/newNotifications';
import { setSince } from '../../actions/since';
import { defaultFetchTime, automaticFetchInterval } from '../common/Common';

function Notifications({ useResponsiveOffset = true }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const notifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const error = useSelector((state) => state.notifications.error);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  const since = useSelector((state) => state.since.since);
  const newNotifications = useSelector((state) => state.newNotifications.newNotifications);
  const newNotificationsLoading = useSelector((state) => state.newNotifications.areNewNotificationsLoading);

  useEffect(() => {
    if (!notifications.length && !areNotificationsLoading) {
      dispatch(fetchNotifications(defaultFetchTime));
      dispatch(setSince(moment().toISOString()));
    } else {
      const interval = setInterval(() => {
        console.log(since);
        dispatch(fetchNewNotifications(since));
        dispatch(setSince(moment().toISOString()));
      }, automaticFetchInterval);
      return () => clearInterval(interval);
    }

  }, [notifications, dispatch, haveNotificationsError, since]);

  const tagReason = (reason) => {
    switch (reason) {
      case 'review_requested':
        return <Tag type="red" title={reason}>{reason}</Tag>;
      case 'mention':
        return <Tag type="green" title={reason}>{reason}</Tag>;
      case 'author':
        return <Tag type="blue" title={reason}>{reason}</Tag>;
      default:
        return <Tag type="gray" title={reason}>{reason}</Tag>;
    }
  }

  const selectNotifications = (notification) => {
    dispatch(selectNotification(notification));
    history.push('/details');
  }

  const fetchMoreNotifications = (e) => {
    e.preventDefault();
    dispatch(setSince(moment().toISOString()));
    dispatch(fetchNewNotifications(since));
  }

  const collectNewNotifications = (e) => {
    e.preventDefault();
    dispatch(moveNewNotifications(newNotifications));
    dispatch(clearNewNotifications());
  }

  const filterByDate  = (e, date) => {
    e.preventDefault();
    dispatch(fetchNotifications(date));
  }

  const classNameFirstColumn = cx({ 'bx--offset-xlg-2': useResponsiveOffset });

  return (
    <div className="notifications__main bx--grid--full-width">
      <div className={`notifications__main__content ${classNameFirstColumn}`}>
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
                <StructuredListRow key={notification.index} className={notification.new ? 'notifications__main__list__row--color': ''}>
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
        { areNotificationsLoading ? <StructuredListSkeleton /> : null }
      </div>
      <NotificationsHeaderContainer
        activeLink="notifications"
        dateFilter={(e, date) => filterByDate(e, date)}
        autoRefreshView={(e) => fetchMoreNotifications(e)}
        getItems={(e) => collectNewNotifications(e)}
        notificationItems={newNotifications}
        notificationsloading={newNotificationsLoading}
      />
    </div>
  );
}

export default Notifications;

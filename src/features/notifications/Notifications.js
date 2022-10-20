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
import { ZoomIn32, Ticket32 } from '@carbon/icons-react';
import { useHistory } from "react-router-dom";
import { sortBy } from "lodash";
import GlobalHeaderContainer from '../common/GlobalHeaderContainer';
import { fetchNotifications, selectNotification } from '../../actions/notifications';
import { setSince } from '../../actions/since';
import { defaultFetchTime, automaticFetchInterval } from '../common/constants';
import { collectNewNotifications, fetchMoreNotifications, filterByDate } from "../common/actions";

const Notifications = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const notifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const error = useSelector((state) => state.notifications.error);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  const since = useSelector((state) => state.since.since);
  const newNotifications = useSelector((state) => state.notifications.newNotifications);

  const newNotificationsSorted = sortBy(newNotifications, ['updated_at']);

  useEffect(() => {
    if (!notifications.length && !areNotificationsLoading) {
      dispatch(fetchNotifications(defaultFetchTime, null));
      dispatch(setSince(moment().toISOString()));
    } else {
      const interval = setInterval(() => {
        dispatch(fetchNotifications(since, null, true));
        dispatch(setSince(moment().toISOString()));
      }, automaticFetchInterval);
      return () => clearInterval(interval);
    }

  }, [notifications, areNotificationsLoading, dispatch, haveNotificationsError, since]);

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

  return (
    <GlobalHeaderContainer
      activeLink="notifications"
      dateFilter={(date) => filterByDate(date, null, dispatch)}
      autoRefreshView={() => fetchMoreNotifications(since, null, dispatch)}
      getItems={() => collectNewNotifications(newNotificationsSorted, dispatch)}
      newItemsNumber={newNotificationsSorted.length}
      itemsLoading={areNotificationsLoading}
    >
      <div className="notifications__main__content">
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
    </GlobalHeaderContainer>
  );
}

export default Notifications;

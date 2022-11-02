import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { sortBy } from "lodash";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableSelectAll,
  TableSelectRow,
  DataTableSkeleton
} from 'carbon-components-react';
import classNames from 'classnames';
import DataTableToolbar from './DataTableToolbar';
import GlobalHeaderContainer from '../common/GlobalHeaderContainer';
import GlobalInlineNotifications from '../common/GlobalInlineNotifications';
import {
  clearNewNotifications,
  fetchNotifications,
  moveNewNotifications
} from '../../actions/notifications';
import { setSince } from '../../actions/since';
import { defaultFetchTime, automaticFetchInterval } from '../common/constants';
import { dataTableHeaders, dataTableRows } from './DataTableData';
import { getThreadSubscription } from "../../actions/subscriptions";
import {
  findMatchingElementById,
  insertObjectIntoArray,
  removeObjectFromArrayById,
  findElementIndexById,
  processNotifications
} from "../../utils/common";

const Notifications = () => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);

  const allNotifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);

  const since = useSelector((state) => state.since.since);

  const allNewNotifications = useSelector((state) => state.notifications.newNotifications);
  const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
  const erroredSubscriptions = useSelector((state) => state.subscriptions.erroredSubscriptions);
  const getThreadSubscriptionHasError = useSelector((state) => state.subscriptions.getThreadSubscriptionHasError);
  const isGetThreadSubscriptionLoading = useSelector((state) => state.subscriptions.isGetThreadSubscriptionLoading);

  const setSubscription = useSelector((state) => state.subscriptions.setSubscription);
  const isSettingSubscriptionLoading = useSelector((state) => state.subscriptions.isSettingSubscriptionLoading);
  const hasSettingSubscriptionError = useSelector((state) => state.subscriptions.hasSettingSubscriptionError);

  useEffect(() => {
    if (!allNotifications.length && !areNotificationsLoading) {
      dispatch(fetchNotifications(defaultFetchTime));
      dispatch(setSince(moment().toISOString()));
    } else {
      const interval = setInterval(() => {
        dispatch(fetchNotifications(since, true));
        dispatch(setSince(moment().toISOString()));
      }, automaticFetchInterval);
      return () => clearInterval(interval);
    }
  }, [allNotifications, areNotificationsLoading]);

  useEffect(() => {
    if (allNotifications.length && !areNotificationsLoading && !haveNotificationsError && !notifications.length) {
      allNotifications.forEach(({ id }) => {
        dispatch(getThreadSubscription(id));
      });
    }
  }, [allNotifications, areNotificationsLoading, haveNotificationsError, notifications]);

  useEffect(() => {
    if (
      subscriptions.length + erroredSubscriptions.length === allNotifications.length &&
      !isGetThreadSubscriptionLoading
    ) {
      const processedNotifications = processNotifications(allNotifications, subscriptions);
      setNotifications(processedNotifications);
    }
  }, [subscriptions, erroredSubscriptions, isGetThreadSubscriptionLoading]);

  useEffect(() => {
    if (allNewNotifications.length && !areNotificationsLoading && !haveNotificationsError) {
      allNewNotifications.forEach(({ id }) => {
        dispatch(getThreadSubscription(id));
      });
      const processedNotifications = processNotifications(allNewNotifications, subscriptions);
      const newNotificationsSorted = sortBy(processedNotifications, ['updated_at']);
      setNewNotifications(newNotificationsSorted);
    }
  }, [allNewNotifications, areNotificationsLoading, haveNotificationsError]);

  useEffect(() => {
    if (setSubscription && !isSettingSubscriptionLoading && !hasSettingSubscriptionError) {
      const { thread_id, ignored } = setSubscription;
      const findObjectToReplace = findMatchingElementById(notifications, thread_id);
      findObjectToReplace.ignored = ignored;
      const notificationIndex = findElementIndexById(notifications, thread_id);
      const newArrayWithoutOldObject = removeObjectFromArrayById(notifications, notificationIndex);
      const updatedNotifications = insertObjectIntoArray(newArrayWithoutOldObject, findObjectToReplace, notificationIndex);
      setNotifications(updatedNotifications);
    }
  }, [setSubscription, isSettingSubscriptionLoading, hasSettingSubscriptionError]);

  useEffect(() => {}, [allNotifications])

  const fetchMoreNotifications = () => {
    dispatch(setSince(moment().toISOString()));
    dispatch(fetchNotifications(since, true));
  }

  const collectNewNotifications = (items) => {
    dispatch(moveNewNotifications(items));
    dispatch(clearNewNotifications());
  }

  const countNotifications = (type) => {
    let notificationsByType = [];
    if (type !== 'all') {
      allNotifications.forEach((notification) => {
        if (notification.reason === type) notificationsByType.push(notification);
      });
    } else {
      notificationsByType = allNotifications;
    }
    return notificationsByType;
  }

  const filterByType = (event, type) => {
    event.preventDefault();
    const notificationsByType = countNotifications(type);
    if (!notificationsByType.length) {
      setNotifications(notifications);
    } else {
      const processedNotifications = processNotifications(notificationsByType, subscriptions);
      setNotifications(processedNotifications);
    }
  }

  return (
    <GlobalHeaderContainer
      activeLink="notifications"
      autoRefreshView={() => fetchMoreNotifications()}
      getItems={() => collectNewNotifications(newNotifications)}
      newItemsNumber={newNotifications.length}
      itemsLoading={areNotificationsLoading}
    >
      <div className="notifications">
        <GlobalInlineNotifications
          erroredSubscriptions={erroredSubscriptions}
          isGetThreadSubscriptionLoading={isGetThreadSubscriptionLoading}
          getThreadSubscriptionHasError={getThreadSubscriptionHasError}
          isSettingSubscriptionLoading={isSettingSubscriptionLoading}
          hasSettingSubscriptionError={hasSettingSubscriptionError}
          setSubscription={setSubscription}
        />
        { !notifications.length
          ? <DataTableSkeleton
            showHeader={false}
            showToolbar={false}
            headers={dataTableHeaders}
            rowCount={5}
            columnCount={7}
            className="notifications__table"
          />
          : (
            <DataTable
              isSortable
              rows={dataTableRows(notifications)}
              headers={dataTableHeaders}
              render={({
                rows,
                headers,
                getHeaderProps,
                getSelectionProps,
                getBatchActionProps,
                getRowProps,
                getTableProps,
                onInputChange,
                selectedRows
             }) => (
              <TableContainer className="notifications__table">
                <DataTableToolbar
                  onInputChange={onInputChange}
                  filter={(e, type) => filterByType(e, type)}
                  countNotifications={(type) => countNotifications(type)}
                  getBatchActionProps={getBatchActionProps}
                  selectedRows={selectedRows}
                />
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({header})}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody className="notifications__table__body">
                    {rows.map((row) => (
                      <TableRow
                        {...getRowProps({row})}
                        className={classNames({
                          'notifications__table__body__row--unread':
                            row.cells[0].info.header === 'unread' && row.cells[0].value
                        })}
                      >
                        <TableSelectRow {...getSelectionProps({row})} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              )}
            />
          )
        }
      </div>
    </GlobalHeaderContainer>
  );
}

export default Notifications;

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
import GlobalToast from '../common/GlobalToast';
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
import { notify } from "../../utils/electronNotifications";

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
  const settingSubscriptionError = useSelector((state) => state.subscriptions.settingSubscriptionError);

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
    if (allNotifications.length && !areNotificationsLoading && !haveNotificationsError) {
      allNotifications.forEach(({ id }) => {
        dispatch(getThreadSubscription(id));
      });
    }
  }, [allNotifications, areNotificationsLoading, haveNotificationsError]);

  useEffect(() => {
    if (
      subscriptions.length + erroredSubscriptions.length === allNotifications.length &&
      !getThreadSubscriptionHasError &&
      !isGetThreadSubscriptionLoading
    ) {
      const processedNotifications = processNotifications(allNotifications, subscriptions);
      setNotifications(processedNotifications);
    }
  }, [subscriptions, erroredSubscriptions, getThreadSubscriptionHasError, isGetThreadSubscriptionLoading]);

  useEffect(() => {
    if (allNewNotifications.length && !areNotificationsLoading && !haveNotificationsError) {
      const processedNotifications = processNotifications(allNewNotifications, subscriptions);
      notify(processedNotifications);
      const newNotificationsSorted = sortBy(processedNotifications, ['updated_at']);
      setNewNotifications(newNotificationsSorted);
    }
  }, [allNewNotifications, areNotificationsLoading, haveNotificationsError])

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
  }, [setSubscription, isSettingSubscriptionLoading, hasSettingSubscriptionError])

  const fetchMoreNotifications = () => {
    dispatch(setSince(moment().toISOString()));
    dispatch(fetchNotifications(since, true));
  }

  const collectNewNotifications = (items) => {
    dispatch(moveNewNotifications(items));
    dispatch(clearNewNotifications());
  }

  const filterByType = (event, type) => {
    event.preventDefault();
    let notificationsByType = [];
    if (type !== 'all') {
      allNotifications.forEach((note) => {
        if (note.reason === type) notificationsByType.push(note);
      });
      const processedNotifications = processNotifications(notificationsByType, subscriptions);
      setNotifications(processedNotifications);
    } else {
      const processedNotifications = processNotifications(allNotifications, subscriptions);
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
      className="notifications"
    >
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
          <>
            <GlobalToast
              selectedRows={selectedRows}
              erroredSubscriptions={erroredSubscriptions}
              isGetThreadSubscriptionLoading={isGetThreadSubscriptionLoading}
              getThreadSubscriptionHasError={getThreadSubscriptionHasError}
              settingSubscriptionError={settingSubscriptionError}
              isSettingSubscriptionLoading={isSettingSubscriptionLoading}
              hasSettingSubscriptionError={hasSettingSubscriptionError}
              setSubscription={setSubscription}
            />
            <TableContainer className="notifications__table">
              <DataTableToolbar
                onInputChange={onInputChange}
                filter={(e, type) => filterByType(e, type)}
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
          </>
        )}
      />
        )}
    </GlobalHeaderContainer>
  );
}

export default Notifications;

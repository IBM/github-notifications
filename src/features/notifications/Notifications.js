import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';
import { useHistory } from "react-router-dom";
import { sortBy } from "lodash";
import GlobalHeaderContainer from '../common/GlobalHeaderContainer';
import { fetchNotifications, selectNotification } from '../../actions/notifications';
import { setSince } from '../../actions/since';
import { defaultFetchTime, automaticFetchInterval } from '../common/constants';
import { collectNewNotifications, fetchMoreNotifications, filterByDate } from "../common/actions";
import { dataTableRowMapping } from './dataToComponentMapping';

const Notifications = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const notifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
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

  const selectNotifications = (notification) => {
    dispatch(selectNotification(notification));
    history.push('/details');
  }

  const notificationsHeaders = [
    {
      key: 'title',
      header: 'Title',
    },
    {
      key: 'updated_at',
      header: 'Last updated',
    },
    {
      key: 'reason',
      header: 'Reason',
    },
    {
      key: 'actions',
      header: 'Actions',
    }
  ];

  const rows = dataTableRowMapping(selectNotifications, notifications);

  return (
    <GlobalHeaderContainer
      activeLink="notifications"
      dateFilter={(date) => filterByDate(date, null, dispatch)}
      autoRefreshView={() => fetchMoreNotifications(since, null, dispatch)}
      getItems={() => collectNewNotifications(newNotificationsSorted, dispatch)}
      newItemsNumber={newNotificationsSorted.length}
      itemsLoading={areNotificationsLoading}
    >
      <DataTable rows={rows} headers={notificationsHeaders}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()} className="notifications__table">
            <TableHead className="notifications__table__header">
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="notifications__table__body">
              {notifications && !haveNotificationsError && rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </GlobalHeaderContainer>
  );
}

export default Notifications;

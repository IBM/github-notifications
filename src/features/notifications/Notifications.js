import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { sortBy } from "lodash";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer
} from 'carbon-components-react';
import DataTableToolbar from './DataTableToolbar';
import GlobalHeaderContainer from '../common/GlobalHeaderContainer';
import {
  clearNewNotifications,
  fetchNotifications,
  moveNewNotifications,
  selectNotification
} from '../../actions/notifications';
import { setSince } from '../../actions/since';
import { defaultFetchTime, automaticFetchInterval } from '../common/constants';
import { dataTableRowMapping } from './dataToComponentMapping';

const Notifications = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [notifications, setNotifications] = useState([]);

  const stateNotifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  const since = useSelector((state) => state.since.since);
  const newNotifications = useSelector((state) => state.notifications.newNotifications);

  const newNotificationsSorted = sortBy(newNotifications, ['updated_at']);

  useEffect(() => {
    if (!stateNotifications.length && !areNotificationsLoading) {
      dispatch(fetchNotifications(defaultFetchTime));
      dispatch(setSince(moment().toISOString()));
    } else {
      const interval = setInterval(() => {
        dispatch(fetchNotifications(since, true));
        dispatch(setSince(moment().toISOString()));
      }, automaticFetchInterval);
      return () => clearInterval(interval);
    }

  }, [stateNotifications, areNotificationsLoading, dispatch, haveNotificationsError, since]);

  useEffect(() => { setNotifications(stateNotifications); }, [stateNotifications]);

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

  const initialRows = dataTableRowMapping(selectNotifications, notifications);

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
      stateNotifications.forEach((note) => {
        if (note.reason === type) notificationsByType.push(note);
      });
      setNotifications(notificationsByType);
    } else {
      setNotifications(stateNotifications);
    }
  }

  return (
    <GlobalHeaderContainer
      activeLink="notifications"
      autoRefreshView={() => fetchMoreNotifications()}
      getItems={() => collectNewNotifications(newNotificationsSorted)}
      newItemsNumber={newNotificationsSorted.length}
      itemsLoading={areNotificationsLoading}
    >
      <DataTable
        rows={initialRows}
        headers={notificationsHeaders}
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          onInputChange
         }) => (
          <TableContainer className="notifications__table">
            <DataTableToolbar
              onInputChange={onInputChange}
              filter={(e, type) => filterByType(e, type)}
              dateFilter={(e, date) => filterByDate(e, date)}
            />
            <Table {...getTableProps()}>
              <TableHead className="notifications__table__header">
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({header})}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="notifications__table__body">
                {rows.map((row) => (
                  <TableRow {...getRowProps({row})}>
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
    </GlobalHeaderContainer>
  );
}

export default Notifications;

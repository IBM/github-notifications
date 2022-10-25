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
  TableSelectRow
} from 'carbon-components-react';
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

const Notifications = () => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);

  const allNotifications = useSelector((state) => state.notifications.notifications);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  const since = useSelector((state) => state.since.since);
  const newNotifications = useSelector((state) => state.notifications.newNotifications);

  const newNotificationsSorted = sortBy(newNotifications, ['updated_at']);

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
  }, [allNotifications, areNotificationsLoading, dispatch, haveNotificationsError, since]);

  useEffect(() => {
    setNotifications(allNotifications)
  }, [allNotifications])

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
      setNotifications(notificationsByType);
    } else {
      setNotifications(allNotifications);
    }
  }

  return (
    <>
      <GlobalHeaderContainer
        activeLink="notifications"
        autoRefreshView={() => fetchMoreNotifications()}
        getItems={() => collectNewNotifications(newNotificationsSorted)}
        newItemsNumber={newNotificationsSorted.length}
        itemsLoading={areNotificationsLoading}
        className="notifications"
      >
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
                getBatchActionProps={getBatchActionProps}
                selectedRows={selectedRows}
                notifications={notifications}
              />
              <Table {...getTableProps()}>
                <TableHead className="notifications__table__header">
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
                    <TableRow {...getRowProps({row})}>
                      <TableSelectRow {...getSelectionProps({ row })} />
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
      <GlobalToast />
    </>
  );
}

export default Notifications;

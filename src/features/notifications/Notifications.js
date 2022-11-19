import React, { useState }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
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
import UseEffects from "./useEffects";
import DataTableToolbar from './DataTableToolbar';
import GlobalHeaderContainer from '../common/GlobalHeaderContainer';
import GlobalInlineNotifications from '../common/GlobalInlineNotifications';
import {
  fetchNotifications,
  moveNewNotifications
} from '../../actions/notifications';
import { setSince } from '../../actions/since';
import { dataTableHeaders, dataTableRows } from './DataTableData';
import {
  processNotifications
} from "../../utils/common";

const Notifications = () => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);

  const allNotifications = useSelector((state) => state.notifications.notifications);
  const allNewNotifications = useSelector((state) => state.notifications.newNotifications);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  const erroredSubscriptions = useSelector((state) => state.subscriptions.erroredSubscriptions);
  const isSettingSubscriptionLoading = useSelector((state) => state.subscriptions.isSettingSubscriptionLoading);
  const hasSettingSubscriptionError = useSelector((state) => state.subscriptions.hasSettingSubscriptionError);
  const isGetThreadSubscriptionLoading = useSelector((state) => state.subscriptions.isGetThreadSubscriptionLoading);
  const getThreadSubscriptionHasError = useSelector((state) => state.subscriptions.getThreadSubscriptionHasError);
  const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
  const setSubscription = useSelector((state) => state.subscriptions.setSubscription);
  const since = useSelector((state) => state.since.since);

  const fetchMoreNotifications = () => {
    dispatch(setSince(moment().toISOString()));
    dispatch(fetchNotifications(since, true));
  }

  const collectNewNotifications = () => {
    console.log('collectNewNotifications');
    dispatch(moveNewNotifications());
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
    <UseEffects
      setNotifications={setNotifications}
      allNotifications={allNotifications}
      notifications={notifications}
      allNewNotifications={allNewNotifications}
      areNotificationsLoading={areNotificationsLoading}
      erroredSubscriptions={erroredSubscriptions}
      isSettingSubscriptionLoading={isSettingSubscriptionLoading}
      hasSettingSubscriptionError={hasSettingSubscriptionError}
      setSubscription={setSubscription}
      subscriptions={subscriptions}
      dispatch={dispatch}
      since={since}
    >
      <GlobalHeaderContainer
        activeLink="notifications"
        autoRefreshView={() => fetchMoreNotifications()}
        getItems={() => collectNewNotifications()}
        newItemsNumber={allNewNotifications.length}
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
    </UseEffects>
  );
}

export default Notifications;

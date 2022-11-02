import React from "react";
import { useDispatch } from "react-redux";
import {
  Button, TableBatchAction,
  TableBatchActions,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch
} from "carbon-components-react";
import { CheckmarkOutline, Notification, NotificationOff, Rss, Sight, VoiceActivate, Recommend, List } from "@carbon/icons-react";
import { setSubscription } from "../../actions/subscriptions";

const buttons = [
  {
    id: 'subscribed',
    type: 'subscribed',
    description: 'Subscribed',
    icon: Rss,
    kind: 'secondary'
  },
  {
    id: 'review_requested',
    type: 'review_requested',
    description: 'Review requested',
    icon: Sight,
    kind: 'danger'
  },
  {
    id: 'mention',
    type: 'mention',
    description: 'Mentioned',
    icon: VoiceActivate,
    kind: 'primary'
  },
  {
    id: 'author',
    type: 'author',
    description: 'Authored',
    icon: Recommend,
    kind: 'primary'
  },
  {
    id: 'all',
    type: 'all',
    description: 'All',
    icon: List,
    kind: 'primary'
  }
];

const DataTableToolbar = ({ onInputChange, filter, countNotifications, getBatchActionProps, selectedRows }) => {
  const dispatch = useDispatch();

  const buttonComponent = ({ id, type, description, icon, kind }) => (
    <Button
      key={id}
      kind={kind}
      hasIconOnly
      renderIcon={icon}
      iconDescription={description}
      tooltipPosition="left"
      onClick={(e) => filter(e, type)}
      className={`notifications__table__toolbar__button--${type}`}
    >{countNotifications(type).length}
    </Button>
  );

  const setSubscriptions = (subscriptions, ignored) => {
    subscriptions.forEach(({ id }) => {
      dispatch(setSubscription(id, { thread_id: id, ignored }));
    })
  }

  return (
    <TableToolbar aria-label="data table toolbar" className="notifications__table__toolbar">
      <TableBatchActions {...getBatchActionProps()}>
        <TableBatchAction
          key="mute"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={NotificationOff}
          onClick={() => setSubscriptions(selectedRows, true)}
        >
          Mute
        </TableBatchAction>
        <TableBatchAction
          key="unmute"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={Notification}
          onClick={() => setSubscriptions(selectedRows, false)}
        >
          Unmute
        </TableBatchAction>
        <TableBatchAction
          key="read"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={CheckmarkOutline}
          onClick={() => {}}
        >
          Mark as read
        </TableBatchAction>
      </TableBatchActions>
      <TableToolbarContent>
        <TableToolbarSearch onChange={onInputChange} persistent />
        { buttons.map((button) => buttonComponent(button)) }
      </TableToolbarContent>
    </TableToolbar>
  );
}

export default DataTableToolbar;
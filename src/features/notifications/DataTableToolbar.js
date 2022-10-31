import React from "react";
import { useDispatch } from "react-redux";
import {
  Button, TableBatchAction,
  TableBatchActions,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch
} from "carbon-components-react";
import { CheckmarkOutline16, Notification16, NotificationOff16, Rss16, Sight16, VoiceActivate16, Recommend16, List16 } from "@carbon/icons-react";
import { muteNotification } from "../../actions/notifications";

const buttons = [
  {
    id: 'subscribed',
    type: 'subscribed',
    description: 'Subscribed',
    icon: Rss16,
    kind: 'secondary'
  },
  {
    id: 'review_requested',
    type: 'review_requested',
    description: 'Review requested',
    icon: Sight16,
    kind: 'danger'
  },
  {
    id: 'mention',
    type: 'mention',
    description: 'Mentioned',
    icon: VoiceActivate16,
    kind: 'primary'
  },
  {
    id: 'author',
    type: 'author',
    description: 'Authored',
    icon: Recommend16,
    kind: 'primary'
  },
  {
    id: 'all',
    type: 'all',
    description: 'All',
    icon: List16,
    kind: 'primary'
  }
];

const DataTableToolbar = ({ onInputChange, filter, getBatchActionProps, selectedRows, notifications }) => {
  const dispatch = useDispatch();

  const buttonComponent = ({ id, type, description, icon, kind }) => (
    <Button
      key={id}
      kind={kind}
      hasIconOnly
      renderIcon={icon}
      iconDescription={description}
      tooltipPosition="bottom"
      onClick={(e) => filter(e, type)}
      className={`notifications__table__toolbar__button--${type}`}
    />
  );

  const muteSelectedNotifications = (notificationsToBeMuted, ignored) => {
    dispatch(muteNotification(notificationsToBeMuted, ignored));
  }

  return (
    <TableToolbar aria-label="data table toolbar" className="notifications__table__toolbar">
      <TableBatchActions {...getBatchActionProps()}>
        <TableBatchAction
          key="mute"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={NotificationOff16}
          onClick={() => muteSelectedNotifications(selectedRows, true)}
        >
          Mute
        </TableBatchAction>
        <TableBatchAction
          key="unmute"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={Notification16}
          onClick={() => muteSelectedNotifications(selectedRows, false)}
        >
          Unmute
        </TableBatchAction>
        <TableBatchAction
          key="read"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={CheckmarkOutline16}
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
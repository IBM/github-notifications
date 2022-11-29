import React from "react";
import {
  Button, TableBatchAction,
  TableBatchActions,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch
} from "carbon-components-react";
import {
  CheckmarkOutline,
  Notification,
  NotificationOff,
  Rss,
  Sight,
  VoiceActivate,
  Recommend,
  List
} from "@carbon/icons-react";

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

const batchActions = [
  {
    id: 'mute',
    text: 'Mute',
    icon: NotificationOff,
    bool: true
  },
  {
    id: 'unmute',
    text: 'Unmute',
    icon: Notification,
    bool: false
  },
  {
    id: 'read',
    text: 'Mark as read',
    icon: CheckmarkOutline,
    bool: false
  }
]

const DataTableToolbar = (
  {
    onInputChange,
    filter,
    countNotifications,
    getBatchActionProps,
    selectedRows,
    setSubscriptions
  }) => {
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
    >
      {countNotifications(type).length}
    </Button>
  );

  const batchActionsComponent = ({ id, icon, bool, text }) => (
    <TableBatchAction
      key={id}
      tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
      renderIcon={icon}
      onClick={() => setSubscriptions(selectedRows, bool)}
    >
      {text}
    </TableBatchAction>
  );

  return (
    <TableToolbar aria-label="data table toolbar" className="notifications__table__toolbar">
      <TableBatchActions {...getBatchActionProps()}>
        {batchActions.map((button) => batchActionsComponent(button))}
      </TableBatchActions>
      <TableToolbarContent>
        <TableToolbarSearch onChange={onInputChange} persistent />
        { buttons.map((button) => buttonComponent(button)) }
      </TableToolbarContent>
    </TableToolbar>
  );
}

export default DataTableToolbar;
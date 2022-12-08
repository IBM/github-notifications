import React from "react";
import {
  TableBatchAction,
  TableBatchActions,
  TableToolbar,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
  Checkbox
} from "carbon-components-react";
import { CheckmarkOutline } from "@carbon/icons-react";
import toolbarMenuItems from './toolbarMenuItems';
import batchActions from './batchActions';

const DataTableToolbar = (
  {
    onInputChange,
    filtersChecked,
    setFilter,
    getBatchActionProps,
    selectedRows,
    setSubscriptions,
    setNotificationsAsRead
  }) => {
  const checkboxComponent = ({ id, label }) => (
    <Checkbox
      key={id}
      id={id}
      labelText={label}
      checked={filtersChecked.find(el => el.id === id).checked}
      disabled={filtersChecked.find(el => el.id === id).disabled}
      onClick={(e) => setFilter(e, id)}
      className="notifications__table__toolbar__checkbox"
    />
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
        <TableBatchAction
          key="read"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={CheckmarkOutline}
          onClick={() => setNotificationsAsRead(selectedRows)}
        >
          Mark as read
        </TableBatchAction>
      </TableBatchActions>
      <TableToolbarContent>
        <TableToolbarSearch onChange={onInputChange} persistent />
        <TableToolbarMenu>
          { toolbarMenuItems.map((item) => checkboxComponent(item)) }
        </TableToolbarMenu>
      </TableToolbarContent>
    </TableToolbar>
  );
}

export default DataTableToolbar;
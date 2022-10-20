import React from "react";
import { TableToolbar, TableToolbarContent, TableToolbarSearch } from "carbon-components-react";

const DataTableToolbar = ({ onInputChange }) => {
  return (
    <TableToolbar aria-label="data table toolbar">
      <TableToolbarContent>
        <TableToolbarSearch onChange={onInputChange} />
      </TableToolbarContent>
    </TableToolbar>
  );
}

export default DataTableToolbar;
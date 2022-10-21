import React from "react";
import { Button, TableToolbar, TableToolbarContent, TableToolbarSearch } from "carbon-components-react";
import { Rss16, Sight16, VoiceActivate16, Recommend16, List16 } from "@carbon/icons-react";

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

const DataTableToolbar = ({ onInputChange, filter }) => {
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

  return (
    <TableToolbar aria-label="data table toolbar" className="notifications__table__toolbar">
      <TableToolbarContent>
        <TableToolbarSearch onChange={onInputChange} />
        { buttons.map((button) => buttonComponent(button)) }
      </TableToolbarContent>
    </TableToolbar>
  );
}

export default DataTableToolbar;
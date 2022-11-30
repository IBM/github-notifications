import React from 'react';
import { useHistory } from "react-router-dom";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Button,
  Toggle
} from "carbon-components-react";
import {
  SidePanelCloseFilled,
  SidePanelOpenFilled,
  Renew,
  UserAvatarFilledAlt
} from '@carbon/icons-react';

const GlobalHeader = (
  {
    toggleShowAll,
    showAllRead,
    autoRefreshView,
    getItems,
    newItemsNumber,
    itemsLoading,
    toggle,
    isToggled
  }) => {
  const history = useHistory()

  return (
  <Header aria-label="Github Notifications" className="global-header">
    <Button
      aria-label="Open side menu"
      onClick={toggle}
      kind="primary"
      renderIcon={isToggled ? SidePanelCloseFilled : SidePanelOpenFilled}
      iconDescription="Side menu"
      hasIconOnly
      className="side-nav-toggle bx--header__action"
    />
    <HeaderName prefix="Github">
      Notifications
    </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="FETCH ALSO MARKED AS READ" className="global-header__toggle-show-all">
          <Toggle
            defaultToggled
            labelA=""
            labelB=""
            size="sm"
            id="toggle-show-all-read"
            onClick={toggleShowAll}
            toggled={showAllRead}
          />
        </HeaderGlobalAction>
        <HeaderGlobalAction onClick={autoRefreshView} aria-label="CHECK FOR NEW">
          <Renew className={itemsLoading ? 'global-header__refresh-icon--spin' : ''} />
        </HeaderGlobalAction>
        <HeaderGlobalAction onClick={getItems} aria-label="NEW">
          <div className="global-header__new-notifications-icon">{ newItemsNumber }</div>
        </HeaderGlobalAction>
        <HeaderGlobalAction onClick={() => history.push('/')} aria-label="LOG OUT">
          <UserAvatarFilledAlt />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
  </Header>
  )}

export default GlobalHeader;

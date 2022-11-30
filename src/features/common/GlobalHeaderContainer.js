import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import GlobalHeader from './GlobalHeader';
import GlobalSideNav from "./GlobalSideNav";

const GlobalHeaderContainer = (
  {
    children,
    toggleShowAll,
    showAllRead,
    activeLink,
    autoRefreshView,
    getItems,
    newItemsNumber,
    itemsLoading
  }) => {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = useCallback(
    () => setIsToggled(!isToggled),
    [isToggled, setIsToggled],
  );

  return (
    <>
      <GlobalHeader
        showAllRead={showAllRead}
        toggleShowAll={toggleShowAll}
        autoRefreshView={autoRefreshView}
        getItems={getItems}
        newItemsNumber={newItemsNumber}
        itemsLoading={itemsLoading}
        className="bx--grid--full-width"
        toggle={toggle}
        isToggled={isToggled}
      />
      <GlobalSideNav activeLink={activeLink} isSideNavExpanded={isToggled} />
      <div className={cx({ 'main-content--offset': isToggled })}>{children}</div>
    </>
  );
}

export default GlobalHeaderContainer;

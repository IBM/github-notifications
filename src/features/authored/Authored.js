import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListSkeleton, Link
} from 'carbon-components-react';
import moment from "moment";
import GlobalHeaderContainer from "../common/GlobalHeaderContainer";
import { fetchNotifications } from "../../actions/notifications";
import {automaticFetchInterval, defaultFetchTime} from '../common/constants';
import { fetchMoreNotifications, collectNewNotifications, filterByDate } from '../common/actions';
import {sortBy} from "lodash";
import {setSince} from "../../actions/since";

function AuthoredNotifications() {
  const dispatch = useDispatch();
  const authored = useSelector((state) => state.notifications.authored);
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  const since = useSelector((state) => state.since.since);

  const newNotificationsSorted = sortBy(authored, ['updated_at']);

  useEffect(() => {
    if (!authored.length && !areNotificationsLoading) {
      dispatch(fetchNotifications(defaultFetchTime, 'author'));
      dispatch(setSince(moment().toISOString()));
    } else {
      const interval = setInterval(() => {
        dispatch(fetchNotifications(since, null, true));
        dispatch(setSince(moment().toISOString()));
      }, automaticFetchInterval);
      return () => clearInterval(interval);
    }
  }, [notifications, areNotificationsLoading, dispatch, haveNotificationsError, since]);

  return (
    <GlobalHeaderContainer
      activeLink="notifications"
      dateFilter={(date) => filterByDate(date, null, dispatch)}
      autoRefreshView={() => fetchMoreNotifications(since, null, dispatch)}
      getItems={() => collectNewNotifications(newNotificationsSorted, dispatch)}
      newItemsNumber={newNotificationsSorted.length}
      itemsLoading={areNotificationsLoading}
    >
      <div className="authored__main">
      <div className="authored__main__content">
        <div className="authored__main__list">
          {notifications.length && !areAuthoredNotificationsLoading ? (
              <StructuredListWrapper selection className="authored__main__list__wrapper">
                <StructuredListHead>
                  <StructuredListRow head>
                    <StructuredListCell head>Title</StructuredListCell>
                    <StructuredListCell head>Last updated</StructuredListCell>
                    <StructuredListCell head>Type</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  { authored.length ? authored.map(author => (
                      <StructuredListRow key={author.index}>
                        <StructuredListCell>
                          <h6>{author.full_name}</h6>
                          <Link href={author.html_url} target='_blank' key={author.index}>
                            <h4>{author.title}</h4>
                          </Link>
                        </StructuredListCell>
                        <StructuredListCell>
                          <h6>{moment(author.updated_at).fromNow()}</h6>
                          ({author.updated_at})
                        </StructuredListCell>
                        <StructuredListCell>{ author.type }</StructuredListCell>
                      </StructuredListRow>
                    ))
                    : <StructuredListRow><StructuredListCell>No notifications</StructuredListCell></StructuredListRow>
                  }
                </StructuredListBody>
              </StructuredListWrapper>
            )
            : <StructuredListSkeleton />}
        </div>
      </div>
      <GlobalHeaderContainer
        activeLink="authored"
        dateFilter={(e, date) => filterByDate(e, date)}
      />
    </div>
    </GlobalHeaderContainer>
  );
}

export default AuthoredNotifications;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircleFillGlyph } from '@carbon/icons-react';
import { commitsFetch } from '../../actions/commits';
import { fetchNotificationDetails } from "../../actions/details";
import {
  Button,
  Link,
  StructuredListBody,
  StructuredListCell,
  StructuredListRow,
  StructuredListWrapper,
  Tag,
  StructuredListSkeleton,
  Tabs,
  Tab,
  StructuredListHead
} from "carbon-components-react";
import { ArrowLeft32 } from '@carbon/icons-react';
import { useHistory } from "react-router-dom";
import moment from "moment";

function Details() {
  const dispatch = useDispatch();
  const history = useHistory()
  const notificationSelected = useSelector((state) => state.notifications.selected);
  const notificationCommits = useSelector((state) => state.commits.commits);
  const jira = useSelector((state) => state.commits.jira);
  const notificationCommitsLoading = useSelector((state) => state.commits.areCommitsLoading);
  const details = useSelector((state) => state.details);
  const { index, html_url, full_name, title, updated_at, reason } = notificationSelected;

  useEffect(() => {
    dispatch(fetchNotificationDetails(html_url));
    dispatch(commitsFetch(html_url));
  }, [dispatch, html_url])

  const tagReason = (reason) => {
    switch (reason) {
      case 'review_requested':
        return <Tag type="red" title={reason}>{reason}</Tag>;
      case 'mention':
        return <Tag type="green" title={reason}>{reason}</Tag>;
      default:
        return <Tag type="gray" title={reason}>{reason}</Tag>;
    }
  }

  const stateColor = (state) => {
    switch (state) {
      case 'closed':
        return <CircleFillGlyph className="details__main__list__status--red" title={state} />;
      case 'open':
        return <CircleFillGlyph className="details__main__list__status--green" title={state} />;
      case 'merged':
        return <CircleFillGlyph className="details__main__list__status--purple" title={state} />;
      default:
        return <CircleFillGlyph title={state} />;
    }
  }

  return (
    <div className="details__main">
      <div className="details__main__list">
        <StructuredListWrapper selection>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>{' '}</StructuredListCell>
              <StructuredListCell head>State</StructuredListCell>
              <StructuredListCell head>Title</StructuredListCell>
              <StructuredListCell head>Last updated</StructuredListCell>
              <StructuredListCell head>Reason</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow key={index}>
              <StructuredListCell>
                <Button
                  kind="primary"
                  renderIcon={ArrowLeft32}
                  iconDescription="Back"
                  hasIconOnly
                  onClick={() => history.goBack()}
                />
              </StructuredListCell>
              <StructuredListCell>
                {stateColor(details.details)}
              </StructuredListCell>
              <StructuredListCell>
                <h6>{full_name}</h6>
                <Link href={html_url} target='_blank' key={index}>
                  <h4>{title}</h4>
                </Link>
              </StructuredListCell>
              <StructuredListCell>
                <time>{moment(updated_at).fromNow()}</time>
              </StructuredListCell>
              <StructuredListCell>
                {tagReason(reason)}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
        <Tabs type="container">
          <Tab id="commits" label="Commits">
          {!notificationCommitsLoading && notificationCommits ?
            (
              <StructuredListWrapper selection>
              <StructuredListBody>
                {notificationCommits.map(com => (
                    <StructuredListRow key={com.index}>
                      <StructuredListCell>
                        <Link href={com.url} target='_blank' key={com.index}>
                        { com.message }
                        </Link>
                      </StructuredListCell>
                      <StructuredListCell>{ com.name }</StructuredListCell>
                      <StructuredListCell>
                        <h6>{moment(com.date).fromNow()}</h6>
                        ({com.date})
                      </StructuredListCell>
                    </StructuredListRow>
                  ))}
              </StructuredListBody>
              </StructuredListWrapper>
            )
            :
            <StructuredListSkeleton />}
          </Tab>
          <Tab id="jira" label="Jira tickets">
          {!notificationCommitsLoading && jira ?
            (
              <div className="details__main__jira">
                { jira.map(ticket => (
                  <Link href={`https://jira.sec.***REMOVED***/browse/${ticket}`} target='_blank' className="details__main__jira__link">
                    { ticket }
                  </Link>
                )) }
              </div>
            )
            : <StructuredListSkeleton />}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Details;

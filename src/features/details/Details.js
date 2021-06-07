import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commitsFetch } from '../../actions/commits';
import {
  Button,
  Link,
  StructuredListBody,
  StructuredListCell,
  StructuredListRow,
  StructuredListWrapper,
  Tag,
  Loading,
  Tabs,
  Tab
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
  const { index, html_url, full_name, title, updated_at, reason} = notificationSelected;

  useEffect(() => {
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

  return (
    <div className="details__main">
      <div className="details__main__list">
        <StructuredListWrapper selection>
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
                <Link href={html_url} target='_blank' key={index}>
                  <h6>{full_name}</h6>
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
          {!notificationCommitsLoading && notificationCommits && jira ?
            (
          <Tabs type="container">
            <Tab id="commits" label="Commits">
              <StructuredListWrapper selection>
              <StructuredListBody>
                {notificationCommits.map(com => (
                    <StructuredListRow key={com.index}>
                      <StructuredListCell>{ com.message }</StructuredListCell>
                      <StructuredListCell>{ com.name }</StructuredListCell>
                      <StructuredListCell>{ com.date }</StructuredListCell>
                    </StructuredListRow>
                  ))}
              </StructuredListBody>
              </StructuredListWrapper>
            </Tab>
            <Tab id="jira" label="Jira tickets">
              <div className="details__main__jira">
                { jira.map(ticket => (
                  <Link href={`https://jira.sec.***REMOVED***/browse/${ticket}`} target='_blank' className="details__main__jira__link">
                    { ticket }
                  </Link>
                )) }
              </div>
            </Tab>
          </Tabs>
            )
            : <Loading description="Active loading indicator" withOverlay={false} />}
      </div>
    </div>
  );
}

export default Details;

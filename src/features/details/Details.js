import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commitsFetch } from '../../actions/commits';
import {
  Link, StructuredListBody,
  StructuredListCell,
  StructuredListRow,
  StructuredListWrapper, Tag,
  Loading
} from "carbon-components-react";
import moment from "moment";

function Details() {
  const dispatch = useDispatch();
  const notificationSelected = useSelector((state) => state.notifications.selected);
  const notificationCommits = useSelector((state) => state.commits.commits);
  const notificationCommitsLoading = useSelector((state) => state.commits.areCommitsLoading);
  console.log('notificationCommits: ', notificationCommits);
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
          <StructuredListBody>
            {!notificationCommitsLoading ? notificationCommits.map(com => (
                <StructuredListRow key={com.index}>
                  <StructuredListCell>{ com.message }</StructuredListCell>
                  <StructuredListCell>{ com.name }</StructuredListCell>
                  <StructuredListCell>{ com.date }</StructuredListCell>
                  <StructuredListCell>{ com.jira.map(ticket => `${ticket} `) }</StructuredListCell>
                </StructuredListRow>
              ))
              : <Loading description="Active loading indicator" withOverlay={false} />}
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
}

export default Details;

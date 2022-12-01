import React from "react";
import moment from "moment";
import { Button, Tag } from "carbon-components-react";
import { Launch, Ticket, NotificationOffFilled, FlagFilled } from "@carbon/icons-react";
import { setNotificationAsRead } from "../../actions/notifications";

const tagReason = (reason) => {
  switch (reason) {
    case 'review_requested':
      return <Tag type="red" title={reason} className="notifications__tag--red">{reason}</Tag>;
    case 'mention':
      return <Tag type="green" title={reason} className="notifications__tag--green">{reason}</Tag>;
    case 'author':
      return <Tag type="blue" title={reason} className="notifications__tag--blue">{reason}</Tag>;
    default:
      return <Tag type="gray" title={reason} className="notifications__tag--gray">{reason}</Tag>;
  }
}

const onClick = (dispatch, id, html_url) => {
  const processedId = id.split('-')[0];
  dispatch(setNotificationAsRead(processedId));
  window.open(html_url, '_blank');
}

const actions = (dispatch, id, html_url, jira) => (
  <div className="notifications__table__actions">
    <Button
      kind="secondary"
      renderIcon={Launch}
      iconDescription="Github"
      hasIconOnly
      size="sm"
      onClick={() => onClick(dispatch, id, html_url)}
    />
    {jira && (
      <Button
        kind="secondary"
        renderIcon={Ticket}
        iconDescription="Jira"
        hasIconOnly
        size="sm"
        onClick={() => window.open(`https://jira.sec.***REMOVED***/browse/${jira}`, '_blank')}
      />
    )
    }
  </div>
);

export const dataTableHeaders = [
  {
    key: 'unread',
    header: 'Unread',
  },
  {
    key: 'muted',
    header: 'Muted',
  },
  {
    key: 'repo',
    header: 'Repo',
  },
  {
    key: 'title',
    header: 'PR title',
  },
  {
    key: 'updated_at',
    header: 'Last updated',
  },
  {
    key: 'reason',
    header: 'Reason',
  },
  {
    key: 'actions',
    header: 'Actions',
  }
];

export const dataTableRows = (dispatch, notifications) => {
  let mappedNotifications = [];
  notifications.forEach((notification) => {
    const { id, reason, updated_at, title, html_url, full_name, ignored, unread, jira } = notification;
    mappedNotifications.push({
      id,
      repo: full_name,
      title,
      reason: tagReason(reason),
      updated_at: moment(moment.utc(updated_at).toDate()).local().format('YYYY-MM-DD HH:mm:ss'),
      actions: actions(dispatch, id, html_url, jira),
      muted: ignored ? <NotificationOffFilled /> : null,
      unread: unread ? <FlagFilled /> : null
    })
  });
  return mappedNotifications;
}
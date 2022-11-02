import React from "react";
import moment from "moment";
import { Button, Link, Tag } from "carbon-components-react";
import { Launch, Ticket, NotificationOffFilled, FlagFilled } from "@carbon/icons-react";

const tagReason = (reason) => {
  switch (reason) {
    case 'review_requested':
      return <Tag type="red" title={reason}>{reason}</Tag>;
    case 'mention':
      return <Tag type="green" title={reason}>{reason}</Tag>;
    case 'author':
      return <Tag type="blue" title={reason}>{reason}</Tag>;
    default:
      return <Tag type="gray" title={reason}>{reason}</Tag>;
  }
}

const actions = (html_url, notification) => (
  <div className="notifications__table__actions">
    <Link href={html_url} target='_blank'>
      <Button
        kind="secondary"
        renderIcon={Launch}
        iconDescription="Show"
        hasIconOnly
        size="sm"
      />
    </Link>
    {notification.jira && (
      <Link href={`https://jira.sec.***REMOVED***/browse/${notification.jira}`} target='_blank'>
        <Button
          kind="secondary"
          renderIcon={Ticket}
          iconDescription="Jira"
          hasIconOnly
          size="sm"
        />
      </Link>
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

export const dataTableRows = (notifications) => {
  let mappedNotifications = [];
  notifications.forEach((notification) => {
    const { id, reason, updated_at, title, html_url, full_name, ignored, unread } = notification;
    mappedNotifications.push({
      id: `${id}`,
      reason: tagReason(reason),
      repo: full_name,
      updated_at: moment(moment.utc(updated_at).toDate()).local().format('YYYY-MM-DD HH:mm:ss'),
      title,
      actions: actions(html_url, notification),
      muted: ignored ? <NotificationOffFilled /> : null,
      unread: unread ? <FlagFilled /> : null
    })
  });
  return mappedNotifications;
}
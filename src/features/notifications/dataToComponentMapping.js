import {Button, Link, Tag} from "carbon-components-react";
import React from "react";
import moment from "moment";
import { Ticket16, ZoomIn16 } from "@carbon/icons-react";

const linkComponent = (id, full_name, html_url, title) => (
  <>
    <h6>{full_name}</h6>
    <Link href={html_url} target='_blank' key={id}>
      <div>{title}</div>
    </Link>
  </>
);

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

const actions = (selectNotifications, notification) => (
  <div className="notifications__table__actions">
    <Button
      kind="tertiary"
      renderIcon={ZoomIn16}
      iconDescription="Details"
      hasIconOnly
      onClick={() => {selectNotifications(notification)}}
      size="sm"
    />
    {notification.jira && (
      <Link href={`https://jira.sec.***REMOVED***/browse/${notification.jira}`} target='_blank'>
        <Button
          kind="tertiary"
          renderIcon={Ticket16}
          iconDescription="Jira"
          hasIconOnly
          size="sm"
        />
      </Link>
    )
    }
  </div>
)

export const dataTableRowMapping = (selectNotifications, notifications) => {
  let mappedNotifications = [];
  notifications.forEach((notification) => {
    const { id, reason, updated_at, title, html_url, full_name } = notification;
    mappedNotifications.push({
      id: `${id}`,
      reason: tagReason(reason),
      updated_at: moment(updated_at).fromNow(),
      title: linkComponent(id, full_name, html_url, title),
      actions: actions(selectNotifications, notification)
    })
  });
  return mappedNotifications;
}
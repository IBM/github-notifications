import React from "react";
import { findJiraTicketForNotifications } from "./details";

export function processNotifications(notificationArray) {
  let processedNotification = [];
  for ( const notification of notificationArray) {
    const { id, reason, updated_at, subject: { title = '', url = '', type = '' } = {}, repository: { full_name = '' } = {}} = notification;
    // const matchingSubscriptions = subscriptions.find(sub => sub.id === id);
    const html_url = getPrNumber(url);
    const jira = findJiraTicketForNotifications(notification);
    const newNotification = {
      id: `${id}`,
      reason,
      updated_at,
      title,
      type,
      html_url,
      full_name,
      jira: jira[0] !== undefined ? jira[0] : '',
      // subscribed: matchingSubscriptions !== undefined ? matchingSubscriptions.data.subscribed : null,
      subscribed: null,
      // ignored: matchingSubscriptions !== undefined ? matchingSubscriptions.data.ignored : null
      ignored: null
    };
    processedNotification.push(newNotification);
  }
  return sortNotifications(processedNotification);
}

function getPrNumber(url) {
  const parseUrl = new URL(url);
  const { hostname, pathname, protocol } = parseUrl;
  const path = pathname.split('/');
  return `${protocol}//${hostname}/${path[4]}/${path[5]}/pull/${path[7]}`;
}

function sortNotifications(notifications) { return notifications.slice().sort((a, b) => b.updated_at - a.updated_at) }

import React from "react";
import { findJiraTicketForNotifications } from "./details";

export const processNotifications = (notificationArray, subscriptions) => {
  let processedNotification = [];
  for ( const notification of notificationArray) {
    const {
      id,
      reason,
      updated_at,
      subject: { title = '', url = '', type = '' } = {},
      repository: { full_name = '' } = {},
      unread
    } = notification;

    const matchingSubscriptions = subscriptions.find(sub => sub.id === id);
    const subscribed = matchingSubscriptions !== undefined ? matchingSubscriptions.data.subscribed : null;
    const ignored = matchingSubscriptions !== undefined ? matchingSubscriptions.data.ignored : null;
    const html_url = processPrUrl(url);

    const jiraTicket = findJiraTicketForNotifications(notification);
    const jira = jiraTicket[0] !== undefined ? jiraTicket[0] : '';

    const newNotification = {
      id: `${id}`,
      reason,
      updated_at,
      title,
      type,
      html_url,
      full_name,
      jira,
      subscribed,
      ignored,
      unread
    };
    processedNotification.push(newNotification);
  }
  return sortNotifications(processedNotification);
}

export const processPrUrl = (url) => {
  const parseUrl = new URL(url);
  const { hostname, pathname, protocol } = parseUrl;
  const path = pathname.split('/');
  return `${protocol}//${hostname}/${path[4]}/${path[5]}/pull/${path[7]}`;
}

const sortNotifications = (notifications) => notifications.slice().sort((a, b) => b.updated_at - a.updated_at);

export const findElementIndexById = (array, id) => array.findIndex((element) => element.id === id);

export const findMatchingElementById = (array, id) => array.find(element => element.id === id);

export const removeObjectFromArrayById = (array, id) => array.filter((object) => object.id !== id);

export const insertObjectIntoArray = (array, object, index) => {
  let newArray = array.slice();
  newArray.splice(index, 1, object);
  return newArray;
}
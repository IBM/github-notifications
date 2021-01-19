import React, { useState, useEffect } from 'react';
import './App.css';
const GitHubClient = require('./libs/GitHubClient.js').GitHubClient;

let githubCliEnterprise = new GitHubClient({
  baseUri:"***REMOVED***/api/v3",
  token:"***REMOVED***"
});

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(async () => {
    await getNotifications();
  });

  const getNotifications = async () => {
    try {
      const notifications = await githubCliEnterprise.getData({path:'/notifications'});
      readNotifications(notifications);
    } catch (error) {
      console.log(error);
    }
  }

  const readNotifications = (notifications) => {
    const newNotifications = processNotifications(notifications);
    setNotifications({ notifications: newNotifications });
  }

  const processNotifications = (notifications) => {
    let processedNotification = [];
    const notificationArray = notifications.data;
    notificationArray.forEach(async (notification, index) => {
      const { subject: { title = '', url = '', type = '' } = {}, repository: { full_name = '' } = {}} = notification;
      const processedUrl = await getUrlBasedOnType(type, url, full_name);
      const newNotification = {
        index,
        title,
        type,
        url: processedUrl
      };
      processedNotification.push(newNotification);
      console.log('newNotification: ', newNotification);
    })
    console.log('processedNotification: ', processedNotification);
    return processedNotification;
  }

  const getUrlBasedOnType = async (type = '', url = '', full_name = '') => {
    let newUrl;
    if (type === 'PullRequest') {
      const urlPath = getUrlPath(url, 7);
      newUrl = await getPrUrl(full_name, urlPath);
    }
    return newUrl;
  }

  const getUrlPath = (url, number) => {
    const parseUrl = new URL(url);
    const pathname = parseUrl.pathname;
    const path = pathname.split('/');
    console.log(path);
    return path[number];
  }

  const getPrUrl = async (full_name = '', url = '') => {
    const pr = await githubCliEnterprise.getData({path:`/repos/${full_name}/pulls/${url}`});
    return pr.data['html_url'];
  }

  return (
    <div className="App">
      <button onClick={() => getNotifications()}>
        Kliknij mnie
      </button>
      <ul>
        {notifications.map((notification) => (
          <a href={notification.url} target='_blank'><li key={notification.index}>{notification.title}</li></a>
        ))}
      </ul>
    </div>
  )
}

export default App;

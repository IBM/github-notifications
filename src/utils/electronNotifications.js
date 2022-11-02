import { processPrUrl } from './common';

export const notify = (notifications) => {
  for ( const notification of notifications) {
    const { repository: { full_name }, subject: { title, url } } = notification;
    const html_url = processPrUrl(url);
    new Notification(full_name, {body: title})
      .onclick = (event) => {
      event.preventDefault();
      window.open(html_url,"_blank");
    }
  }
}

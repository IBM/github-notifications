export const notify = (notifications) => {
  for ( const notification of notifications) {
    const { full_name, title, html_url } = notification;
    new Notification(full_name, {body: title})
      .onclick = (event) => {
      event.preventDefault();
      window.open(html_url,"_blank");
    }
  }
}

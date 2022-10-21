import moment from "moment";
import { setSince } from "../../actions/since";
import { fetchNotifications, moveNewNotifications, clearNewNotifications } from "../../actions/notifications";

export const fetchMoreNotifications = (since, dispatch) => {
  dispatch(setSince(moment().toISOString()));
  dispatch(fetchNotifications(since, true));
}

export const collectNewNotifications = (items, dispatch) => {
  dispatch(moveNewNotifications(items));
  dispatch(clearNewNotifications());
}

export const filterByDate = (since, dispatch) => {
  dispatch(fetchNotifications(since));
}